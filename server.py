import json
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).parent
DEFAULT_MODEL = "gemini-2.5-flash"


def load_env_file():
    env_path = ROOT / ".env"
    if not env_path.exists():
        return

    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        name, value = line.split("=", 1)
        os.environ.setdefault(name.strip(), value.strip().strip('"').strip("'"))


load_env_file()
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "")


class AppHandler(SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        if self.path != "/api/chat":
            self.send_error(404, "Not found")
            return
        self.send_response(204)
        self.add_cors_headers()
        self.end_headers()

    def do_POST(self):
        if self.path != "/api/chat":
            self.send_error(404, "Not found")
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            payload = json.loads(self.rfile.read(length))
            message = str(payload.get("message", "")).strip()
            if not message:
                self.send_json(400, {"error": "Message is required."})
                return

            answer = ask_gemini(message)
            self.send_json(200, {"answer": answer})
        except HTTPError as error:
            details = error.read().decode("utf-8", errors="replace")
            self.send_json(502, {"error": f"Gemini API error ({error.code}).", "details": details})
        except (URLError, TimeoutError) as error:
            self.send_json(502, {"error": "Could not reach Gemini.", "details": str(error)})
        except (ValueError, json.JSONDecodeError) as error:
            self.send_json(400, {"error": f"Invalid request: {error}"})
        except Exception as error:
            self.send_json(500, {"error": "The chat server failed.", "details": str(error)})

    def send_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.add_cors_headers()
        self.end_headers()
        self.wfile.write(body)

    def add_cors_headers(self):
        request_origin = self.headers.get("Origin")
        if ALLOWED_ORIGIN and request_origin == ALLOWED_ORIGIN:
            self.send_header("Access-Control-Allow-Origin", ALLOWED_ORIGIN)
            self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")


def ask_gemini(message):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key or api_key == "paste_your_key_here":
        raise RuntimeError("GEMINI_API_KEY is missing from .env")

    model = os.environ.get("GEMINI_MODEL", DEFAULT_MODEL)
    endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
    request_body = {
        "contents": [{"parts": [{"text": message}]}],
        "systemInstruction": {
            "parts": [{"text": "You are a helpful guide to India's heritage. Be accurate, concise, and clearly say when a fact is uncertain."}]
        },
        "generationConfig": {"temperature": 0.7, "maxOutputTokens": 800},
    }
    request = Request(
        endpoint,
        data=json.dumps(request_body).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    with urlopen(request, timeout=45) as response:
        result = json.loads(response.read().decode("utf-8"))

    return result["candidates"][0]["content"]["parts"][0]["text"]


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8000"))
    os.chdir(ROOT)
    server = ThreadingHTTPServer(("127.0.0.1", port), AppHandler)
    print(f"Bharat Virasat running at http://127.0.0.1:{port}/index%20p%3Bremium.html/index%20premium.html")
    print("Press Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()
