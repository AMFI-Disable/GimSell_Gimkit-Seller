"""Exercise the installed userscript against a local locker in headless Chrome."""

import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
from threading import Thread

ROOT = Path(__file__).resolve().parent.parent
FILES = {
    "/rewards/locker": ("text/html", ROOT / "tests/locker.html"),
    "/userscript.js": ("text/javascript", ROOT / "gimkit-seller.user.js"),
}


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path in FILES:
            mime, path = FILES[self.path]
            data = path.read_bytes()
        elif self.path.endswith(".svg"):
            mime = "image/svg+xml"
            data = b'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"/>'
        else:
            self.send_error(404)
            return
        self.send_response(200)
        self.send_header("Content-Type", mime)
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, *args):
        pass


chrome = os.environ.get("CHROME_BIN") or shutil.which("google-chrome") or (
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
)
with ThreadingHTTPServer(("127.0.0.1", 0), Handler) as server, tempfile.TemporaryDirectory() as profile:
    Thread(target=server.serve_forever, daemon=True).start()
    proc = subprocess.run(
        [chrome, "--headless", "--disable-gpu", "--disable-background-networking",
         f"--user-data-dir={profile}", "--dump-dom",
         f"http://127.0.0.1:{server.server_port}/rewards/locker"],
        capture_output=True, text=True, timeout=45, check=True,
    )
    server.shutdown()
    result = re.search(r'<output id="result">(.*?)</output>', proc.stdout)
    if not result or result[1] != "PASS":
        raise SystemExit(result[1] if result else "Locker fixture did not run")
    print("Locker browser checks passed.")
