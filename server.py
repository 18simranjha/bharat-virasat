"""
BHARAT VIRASAT - Advanced Hardened Backend Server & AI Cultural Sage
Powered by the configured Gemini API model (Friendly Heritage Buddy & Drishti Vision)
Security Hardening: IP Rate Limiting, OWASP Security Headers, Multimodal Verification
"""
import os
import re
import json
import base64
import binascii
import time
from collections import defaultdict
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from google import genai
from google.genai import types
from dotenv import load_dotenv

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
env_path = os.path.join(BASE_DIR, '.env')
if os.path.exists(env_path):
    load_dotenv(env_path)
else:
    load_dotenv()

GOOGLE_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", os.getenv("ALLOWED_ORIGIN", "*")).split(",")
    if origin.strip()
]

app = Flask(__name__, static_folder=BASE_DIR)
app.config["MAX_CONTENT_LENGTH"] = 9 * 1024 * 1024

# Restrict CORS in production or allow local origin
CORS(app, resources={r"/api/*": {"origins": ALLOWED_ORIGINS}})

# -------------------------------------------------------------
# 🛡️ SECURITY LAYER: IN-MEMORY RATE LIMITER
# -------------------------------------------------------------
RATE_LIMIT_WINDOWS = defaultdict(list)

def is_rate_limited(ip: str, endpoint: str, max_requests: int = 20, window_seconds: int = 60) -> bool:
    """Sliding-window rate limiter per client IP and endpoint."""
    now = time.time()
    key = f"{ip}:{endpoint}"
    # Purge expired timestamps
    RATE_LIMIT_WINDOWS[key] = [t for t in RATE_LIMIT_WINDOWS[key] if now - t < window_seconds]
    if len(RATE_LIMIT_WINDOWS[key]) >= max_requests:
        return True
    RATE_LIMIT_WINDOWS[key].append(now)
    return False

def get_client_ip():
    """Extract real client IP considering forward headers."""
    if request.headers.get('X-Forwarded-For'):
        return request.headers.get('X-Forwarded-For').split(',')[0].strip()
    return request.remote_addr or '127.0.0.1'

# -------------------------------------------------------------
# 🛡️ SECURITY LAYER: OWASP SECURITY HEADERS
# -------------------------------------------------------------
@app.after_request
def apply_security_headers(response):
    # Prevent clickjacking
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    # Prevent MIME sniffing
    response.headers['X-Content-Type-Options'] = 'nosniff'
    # Referrer policy
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    # Permission policy for cameras & sensors
    response.headers['Permissions-Policy'] = 'camera=(self), microphone=(self), geolocation=(self)'
    # Content Security Policy (allows necessary CDNs for Leaflet, Swiper, Google Fonts, AdSense)
    response.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com https://translate.google.com https://translate.googleapis.com https://pagead2.googlesyndication.com; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://unpkg.com https://translate.googleapis.com; "
        "img-src 'self' data: blob: https:; "
        "font-src 'self' https://fonts.gstatic.com; "
        "connect-src 'self' https://*.google.com https://*.googleapis.com https://api.qrserver.com https://cdn.jsdelivr.net https://unpkg.com; "
        "media-src 'self' data: blob: https:;"
    )
    return response

# -------------------------------------------------------------
# 🤖 GEMINI CLIENT & SYSTEM PROMPTS
# -------------------------------------------------------------
FRIENDLY_SYSTEM_PROMPT = """
You are "Mitra", the warm, enthusiastic, and knowledgeable cultural companion of the Bharat Virasat project.

Personality & Tone:
- Talk like a well-traveled, friendly Indian explorer and buddy—never sound like a dry textbook or rigid corporate AI!
- Use a warm, welcoming tone with natural enthusiasm (e.g., "Namaste dost!", "Arre waah!", "Hey explorer!").
- Blend historical facts with captivating stories, untold legends, and practical travel hacks (best timings, photography spots, local street food recommendations).
- If the user writes in Hindi or Hinglish, reply naturally in the same friendly Hinglish/Hindi!
- Format responses cleanly with neat bullet points and expressive emojis for quick mobile reading.
"""

DRISHTI_VISION_PROMPT = """
You are "Drishti", the master visual heritage archaeologist of Bharat Virasat.
Examine this photograph carefully. It depicts an Indian monument, temple, fort, stepwell, cave sculpture, or historic heritage landmark.

Identify only what can reasonably be inferred from the photograph and your knowledge. Never claim this AI-generated result is verified by ASI, UNESCO, or another authority. Do not invent ticket prices, opening hours, official records, or citations; use "Check official source" when current facts cannot be verified. If the image is unclear or not a heritage site, say so in the summary instead of guessing.

Identify the monument with high historical precision and return a valid JSON object matching this schema:
{
  "monument_name": "Official Monument Name (e.g., Sun Temple, Konark)",
  "hindi_name": "हिंदी नाम (e.g., कोणार्क सूर्य मंदिर)",
  "state": "State name (e.g., Odisha)",
  "city": "City/Region (e.g., Puri District)",
  "era_dynasty": "e.g., Eastern Ganga Dynasty (13th Century CE)",
  "architectural_style": "e.g., Kalinga Architecture (Deula & Jagamohana style)",
  "unesco_status": "UNESCO World Heritage Site or ASI National Monument",
  "asi_circle": "e.g., Bhubaneswar Circle",
  "ticket_pricing": "₹40 (Indians), ₹600 (Foreigners)",
  "summary": "Captivating 2-3 sentence overview highlighting why this marvel was built and what makes it extraordinary.",
  "architectural_secrets": [
    "Secret 1: Fascinating structural or carving detail visible in this image or known to historians.",
    "Secret 2: Architectural engineering feat or astronomical alignment."
  ],
  "best_time_to_visit": "e.g., October to March (Sunrise recommended)",
  "matched_site_id": "slug or keywords matching the site (e.g., sun-temple-konark)"
}

Return ONLY the raw JSON object, without markdown code fences or conversational text.
"""

client = None
if GOOGLE_API_KEY:
    try:
        client = genai.Client(api_key=GOOGLE_API_KEY)
    except Exception as e:
        print(f"⚠️ Warning: Could not initialize Gemini client: {e}")

def ask_gemini(user_message: str, age_group: str = "adult", chat_history=None) -> str:
    """Core Gemini generation function used by Flask and Vercel serverless functions."""
    global client
    if not client and GOOGLE_API_KEY:
        try:
            client = genai.Client(api_key=GOOGLE_API_KEY)
        except Exception as e:
            print(f"⚠️ Warning: Could not initialize Gemini client: {e}")

    if not client:
        raise RuntimeError("GEMINI_API_KEY is not configured.")

    contents = []
    if chat_history and isinstance(chat_history, list):
        for turn in chat_history[-6:]:
            role = "user" if turn.get('role') == 'user' else "model"
            parts = turn.get('parts', [{}])
            text_val = parts[0].get('text', '') if isinstance(parts, list) and parts else ''
            if text_val:
                contents.append(types.Content(role=role, parts=[types.Part.from_text(text=str(text_val)[:1000])]))

    sys_prompt = FRIENDLY_SYSTEM_PROMPT
    sys_prompt += "\n\nAccuracy: Do not claim that AI output is an official ASI/UNESCO verification. Mark uncertain identification, ticket rates, timings, and access rules as needing confirmation with official sources. Do not invent citations or claim a live emergency response."
    if age_group == "child":
        sys_prompt += "\n\nNote: The user is a young child explorer! Use simpler, wonder-filled words, fairy tale vibes, and very gentle explanations."

    contents.append(types.Content(role="user", parts=[types.Part.from_text(text=user_message)]))

    config = types.GenerateContentConfig(
        system_instruction=sys_prompt,
        temperature=0.7
    )

    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=contents,
        config=config
    )
    if response and response.text:
        return response.text.strip()
    raise RuntimeError("Gemini returned an empty response.")

# -------------------------------------------------------------
# 💬 CHAT API (WITH RATE LIMITING & INPUT SANITIZATION)
# -------------------------------------------------------------
@app.route('/api/chat', methods=['POST'])
def chat():
    client_ip = get_client_ip()
    if is_rate_limited(client_ip, 'chat', max_requests=25, window_seconds=60):
        return jsonify({"error": "Rate limit exceeded. Please wait a moment before sending another message."}), 429

    if not client:
        return jsonify({
            "error": "Gemini is not configured. Add GEMINI_API_KEY in the backend environment."
        }), 503

    try:
        data = request.get_json(silent=True)
        if not isinstance(data, dict):
            return jsonify({"error": "Send a valid JSON chat request."}), 400
        user_message = str(data.get('message', '')).strip()
        chat_history = data.get('history', [])
        if not isinstance(chat_history, list):
            chat_history = []
        chat_history = [turn for turn in chat_history if isinstance(turn, dict)]
        age_group = str(data.get('ageGroup', 'adult')).strip()

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Input sanitization
        if len(user_message) > 2500:
            user_message = user_message[:2500]

        answer = ask_gemini(user_message, age_group, chat_history)
        return jsonify({"answer": answer}), 200

    except Exception:
        app.logger.exception("Gemini chat request failed.")
        return jsonify({"error": "AI response failed", "details": "The cultural sage could not process this request right now."}), 500

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# -------------------------------------------------------------
# 📷 DRISHTI AI HERITAGE SITE VISUAL SCANNER
# -------------------------------------------------------------
@app.route('/api/scan-heritage', methods=['POST'])
def scan_heritage():
    client_ip = get_client_ip()
    if is_rate_limited(client_ip, 'scan', max_requests=12, window_seconds=60):
        return jsonify({"error": "Scan rate limit reached. Please wait 60 seconds before scanning again."}), 429

    try:
        image_bytes = None
        mime_type = "image/jpeg"

        # Check for multipart file upload
        if 'file' in request.files:
            uploaded_file = request.files['file']
            if uploaded_file.filename == '':
                return jsonify({"error": "No selected file"}), 400
            mime_type = uploaded_file.mimetype or 'image/jpeg'
            if mime_type not in {'image/jpeg', 'image/png', 'image/webp'}:
                return jsonify({"error": "Use a JPEG, PNG, or WebP image."}), 400
            image_bytes = uploaded_file.read()

        # Or JSON base64 payload
        elif request.is_json:
            data = request.get_json(silent=True)
            if not isinstance(data, dict):
                return jsonify({"error": "Send a valid JSON image request."}), 400
            base64_str = data.get('imageBase64') or data.get('image') or ''
            if not base64_str:
                return jsonify({"error": "No image data received"}), 400

            if not isinstance(base64_str, str):
                return jsonify({"error": "Image data must be a base64 string."}), 400
            data_url_match = re.match(r'^data:(image/(?:jpeg|png|webp));base64,', base64_str)
            if base64_str.startswith('data:'):
                if not data_url_match:
                    return jsonify({"error": "Use a JPEG, PNG, or WebP image."}), 400
                mime_type = data_url_match.group(1)
                base64_str = base64_str[data_url_match.end():]
            try:
                image_bytes = base64.b64decode(base64_str, validate=True)
            except (ValueError, binascii.Error):
                return jsonify({"error": "Image data is not valid base64."}), 400

        if not image_bytes:
            return jsonify({"error": "No image data received."}), 400

        # Safety: enforce max 6MB file size
        if len(image_bytes) > 6 * 1024 * 1024:
            return jsonify({"error": "Image file too large (max 6MB allowed)"}), 400

        if not client:
            return jsonify({"error": "Gemini is not configured. Add GEMINI_API_KEY in the backend environment."}), 503

        image_part = types.Part.from_bytes(data=image_bytes, mime_type=mime_type)
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=[image_part, DRISHTI_VISION_PROMPT],
            config=types.GenerateContentConfig(temperature=0.2)
        )
        raw_text = response.text.strip() if response and response.text else ""
        cleaned = re.sub(r'^```json\s*', '', raw_text)
        cleaned = re.sub(r'^```\s*', '', cleaned)
        cleaned = re.sub(r'\s*```$', '', cleaned).strip()
        dossier = json.loads(cleaned)
        if not isinstance(dossier, dict) or not dossier.get("monument_name"):
            raise ValueError("Gemini returned an invalid heritage dossier.")
        return jsonify(dossier), 200
    except (json.JSONDecodeError, ValueError):
        app.logger.exception("Gemini returned an invalid heritage scan response.")
        return jsonify({"error": "The image could not be identified. Try a clearer photo of the monument."}), 502
    except Exception:
        app.logger.exception("Gemini heritage scan failed.")
        return jsonify({"error": "Heritage scanning is temporarily unavailable. Please try again."}), 502

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"ok": True, "geminiConfigured": bool(client)}), 200

@app.errorhandler(413)
def request_too_large(_error):
    return jsonify({"error": "Request is too large. Images must be under 6 MB."}), 413

# -------------------------------------------------------------
# 🌐 STATIC FILE ROUTING
# -------------------------------------------------------------
@app.route('/')
def serve_index():
    return send_from_directory(BASE_DIR, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    full_path = os.path.join(BASE_DIR, path)
    if os.path.isfile(full_path):
        return send_from_directory(BASE_DIR, path)
    return send_from_directory(BASE_DIR, '404.html'), 404

@app.errorhandler(404)
def page_not_found(e):
    return send_from_directory(BASE_DIR, '404.html'), 404

if __name__ == '__main__':
    print("🚀 Bharat Virasat Hardened Server running at http://127.0.0.1:8000")
    print("🛡️ Security: Rate Limiting & OWASP Headers Active")
    print("📷 Drishti AI Vision Scanner: Ready on /api/scan-heritage")
    app.run(port=int(os.getenv("PORT", "8000")), debug=False)