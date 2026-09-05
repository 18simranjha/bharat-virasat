import json
from http.server import BaseHTTPRequestHandler

from server import ask_gemini


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > 12000:
                self.send_json(413, {"error": "Chat request is too large."})
                return

            payload = json.loads(self.rfile.read(length))
            message = str(payload.get("message", "")).strip()
            if not message:
                self.send_json(400, {"error": "Message is required."})
                return

            age_group = str(payload.get("ageGroup", "adult")).strip()[:20]
            history = payload.get("history", [])
            if not isinstance(history, list):
                history = []
            answer = ask_gemini(message, age_group, history[-8:])
            self.send_json(200, {"answer": answer})
        except json.JSONDecodeError:
            self.send_json(400, {"error": "Invalid chat request."})
        except RuntimeError:
            self.send_json(503, {"error": "Gemini is not configured on the backend."})
        except Exception:
            self.send_json(500, {"error": "The chat server failed."})

    def send_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)
