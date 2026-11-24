import json
import os
import shutil
import socket
import sys
import webbrowser
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler

try:
    from http.server import ThreadingHTTPServer as HttpServerClass
except ImportError:
    from http.server import HTTPServer as HttpServerClass

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(BASE_DIR, "dist")
SERVER_DATA_DIR = os.path.join(BASE_DIR, "server_data")
USER_STATE_FILE = os.path.join(SERVER_DATA_DIR, "user_state.json")
USER_STATE_BACKUP_FILE = os.path.join(SERVER_DATA_DIR, "user_state.backup.json")
USER_STATE_TMP_FILE = os.path.join(SERVER_DATA_DIR, "user_state.json.tmp")
HOST = "0.0.0.0"
PORT = 8080


def utc_now_iso():
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def get_lan_ip():
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            return s.getsockname()[0]
    except OSError:
        return "127.0.0.1"


class DistHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".json": "application/json; charset=utf-8",
        ".webmanifest": "application/manifest+json; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
        ".mjs": "application/javascript; charset=utf-8",
        ".svg": "image/svg+xml",
        ".png": "image/png",
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)

    def _send_json(self, status_code, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _handle_get_state(self):
        if not os.path.isfile(USER_STATE_FILE):
            self._send_json(200, {"ok": True, "state": None, "updatedAt": None})
            return

        try:
            with open(USER_STATE_FILE, "r", encoding="utf-8") as f:
                raw = json.load(f)
            if isinstance(raw, dict) and "state" in raw and isinstance(raw["state"], dict):
                state = raw["state"]
                updated_at = raw.get("updatedAt") or state.get("updatedAt")
            elif isinstance(raw, dict):
                state = raw
                updated_at = raw.get("updatedAt")
            else:
                state = None
                updated_at = None
            self._send_json(200, {"ok": True, "state": state, "updatedAt": updated_at})
        except (OSError, json.JSONDecodeError) as exc:
            self._send_json(500, {"ok": False, "error": f"Failed to read state: {exc}"})

    def _handle_post_state(self):
        try:
            content_length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self._send_json(400, {"ok": False, "error": "Invalid Content-Length"})
            return

        if content_length <= 0 or content_length > 10 * 1024 * 1024:
            self._send_json(400, {"ok": False, "error": "Invalid request body size"})
            return

        try:
            raw_body = self.rfile.read(content_length)
            payload = json.loads(raw_body.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            self._send_json(400, {"ok": False, "error": f"Invalid JSON: {exc}"})
            return

        if not isinstance(payload, dict) or not isinstance(payload.get("state"), dict):
            self._send_json(
                400,
                {"ok": False, "error": "Request body must be a JSON object with a 'state' object"},
            )
            return

        state = payload["state"]
        updated_at = state.get("updatedAt") or payload.get("updatedAt") or utc_now_iso()
        state["updatedAt"] = updated_at

        record = {
            "ok": True,
            "updatedAt": updated_at,
            "state": state,
        }

        try:
            os.makedirs(SERVER_DATA_DIR, exist_ok=True)
            if os.path.isfile(USER_STATE_FILE):
                shutil.copy2(USER_STATE_FILE, USER_STATE_BACKUP_FILE)

            with open(USER_STATE_TMP_FILE, "w", encoding="utf-8") as tmp_f:
                json.dump(record, tmp_f, ensure_ascii=False, indent=2)
                tmp_f.flush()
                os.fsync(tmp_f.fileno())

            os.replace(USER_STATE_TMP_FILE, USER_STATE_FILE)
            self._send_json(200, {"ok": True, "updatedAt": updated_at})
        except OSError as exc:
            self._send_json(500, {"ok": False, "error": f"Failed to persist state: {exc}"})

    def do_GET(self):
        request_path = self.path.split("?", 1)[0].split("#", 1)[0]
        if request_path == "/api/state":
            self._handle_get_state()
            return

        rel_path = request_path.lstrip("/")
        full_path = os.path.normpath(os.path.join(DIST_DIR, rel_path))
        dist_root = os.path.normpath(DIST_DIR)

        if not full_path.startswith(dist_root):
            self.send_error(403, "Forbidden")
            return

        # Serve real static files/directories if they exist; otherwise fallback to index.html for SPA routes
        if rel_path and os.path.isfile(full_path):
            return super().do_GET()

        # Do not rewrite missing static assets (e.g., .js, .css, .png, .svg, .ico, .map, .json) to HTML
        _, ext = os.path.splitext(rel_path)
        if ext and ext.lower() not in {".html"}:
            self.send_error(404, "File not found")
            return

        self.path = "/index.html"
        return super().do_GET()

    def do_POST(self):
        request_path = self.path.split("?", 1)[0].split("#", 1)[0]
        if request_path == "/api/state":
            self._handle_post_state()
            return
        self._send_json(404, {"ok": False, "error": "Unknown API endpoint"})

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

    def log_message(self, format, *args):
        sys.stdout.write(f"[{self.log_date_time_string()}] {format % args}\n")


def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(("127.0.0.1", port)) == 0


class ReusableHttpServer(HttpServerClass):
    allow_reuse_address = True


if __name__ == "__main__":
    if not os.path.isdir(DIST_DIR):
        print(f"Error: Build directory not found at {DIST_DIR}. Run 'npm run build' first.")
        sys.exit(1)

    if is_port_in_use(PORT):
        print(f"Server already running on http://localhost:{PORT}. Opening browser...")
        webbrowser.open(f"http://localhost:{PORT}")
        sys.exit(0)

    lan_ip = get_lan_ip()
    print("=" * 60)
    print("   Youssef.DevOps Command Center Server")
    print(f"   Serving: {DIST_DIR}")
    print(f"   Local:   http://localhost:{PORT}")
    print(f"   LAN:     http://{lan_ip}:{PORT}")
    print(f"   State:   {USER_STATE_FILE}")
    print("=" * 60)
    webbrowser.open(f"http://localhost:{PORT}")

    try:
        httpd = ReusableHttpServer((HOST, PORT), DistHandler)
        print("Server active on 0.0.0.0:8080. Keep this window open while using the app.")
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
