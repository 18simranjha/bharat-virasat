"""
BHARAT VIRASAT - Backend Server & Gemini Cultural Sage
Powered by Gemini 3.8 Flash (Friendly Heritage Buddy)
"""
import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GEMINI_API_KEY")

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__, static_folder=BASE_DIR)
CORS(app)

# Friendly Indian Heritage Explorer Persona
FRIENDLY_SYSTEM_PROMPT = """
You are "Mitra", the warm, enthusiastic, and knowledgeable cultural companion of the Bharat Virasat project.

Personality & Tone:
- Talk like a well-traveled, friendly Indian explorer and buddy—never sound like a dry textbook or rigid corporate AI!
- Use a warm, welcoming tone with natural enthusiasm (e.g., "Namaste dost!", "Arre waah!", "Hey explorer!").
- Blend historical facts with captivating stories, untold legends, and practical travel hacks (best timings, photography spots, local street food recommendations).
- If the user writes in Hindi or Hinglish, reply naturally in the same friendly Hinglish/Hindi!
- Format responses cleanly with neat bullet points and expressive emojis for quick mobile reading.
"""

client = None
if GOOGLE_API_KEY:
    try:
        client = genai.Client(api_key=GOOGLE_API_KEY)
    except Exception as e:
        print(f"⚠️ Warning: Could not initialize Gemini client: {e}")

@app.route('/api/chat', methods=['POST'])
def chat():
    if not client:
        return jsonify({
            "error": "GEMINI_API_KEY is not configured on the server. Please add it to your .env file."
        }), 500

    try:
        data = request.json or {}
        user_message = data.get('message', '').strip()
        chat_history = data.get('history', [])

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Construct conversation turns for Gemini API
        contents = []
        for turn in chat_history:
            role = "user" if turn.get('role') == 'user' else "model"
            parts = turn.get('parts', [{}])
            text_val = parts[0].get('text', '') if isinstance(parts, list) and parts else ''
            if text_val:
                contents.append(types.Content(role=role, parts=[types.Part.from_text(text=text_val)]))

        # Add current user prompt
        contents.append(types.Content(role="user", parts=[types.Part.from_text(text=user_message)]))

        # Config with system instruction
        config = types.GenerateContentConfig(
            system_instruction=FRIENDLY_SYSTEM_PROMPT,
            temperature=0.7
        )

        # Use gemini-3.8-flash
        response = client.models.generate_content(
            model='gemini-3.8-flash',
            contents=contents,
            config=config
        )

        answer = response.text.strip() if response and response.text else "Arre dost, kuch technical issue ho gaya! Ek baar dubara poocho na?"
        return jsonify({"answer": answer}), 200

    except Exception as e:
        print(f"❌ Gemini Error: {str(e)}")
        return jsonify({"error": "AI response failed", "details": str(e)}), 500

# Static file routing
@app.route('/')
def serve_index():
    return send_from_directory(BASE_DIR, 'index.html')

@app.route('/')
def serve_static(path):
    return send_from_directory(BASE_DIR, path)

if __name__ == '__main__':
    print("🚀 Bharat Virasat Server running at http://127.0.0.1:8000")
    app.run(port=8000, debug=True)