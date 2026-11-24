import os
import sys
import socket
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(BASE_DIR, "dist")
PORT = 8080


class DistHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

    def log_message(self, format, *args):
        sys.stdout.write(f"[{self.log_date_time_string()}] {format % args}\n")


def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(("127.0.0.1", port)) == 0


if __name__ == "__main__":
    if not os.path.isdir(DIST_DIR):
        print(f"Error: Build directory not found at {DIST_DIR}. Run 'npm run build' first.")
        sys.exit(1)

    if is_port_in_use(PORT):
        print(f"Server already running on http://localhost:{PORT}. Opening browser...")
        webbrowser.open(f"http://localhost:{PORT}")
        sys.exit(0)

    print("=" * 60)
    print("   Youssef.DevOps Command Center Server")
    print(f"   Serving: {DIST_DIR}")
    print(f"   URL: http://localhost:{PORT}")
    print("=" * 60)
    webbrowser.open(f"http://localhost:{PORT}")

    try:
        httpd = HTTPServer(("127.0.0.1", PORT), DistHandler)
        print("Server active. Keep this window open while using the app.")
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
