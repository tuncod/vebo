import http from "http";
import fs from "fs";
import path from "path";
import { URL } from "url";

const PORT = 3000;
const DIST_DIR = path.join(process.cwd(), "standalone");

const mimeTypes: Record<string, string> = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

// ---------- helpers ----------
function buildQuery(query: any) {
  if (!query) return "";
  const params = new URLSearchParams(query);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

function normalizeHeaders(headers: any) {
  const h: Record<string, string> = {};
  if (!headers) return h;

  for (const k in headers) {
    h[k.toLowerCase()] = headers[k];
  }

  return h;
}

// ---------- server ----------
const server = http.createServer((req, res) => {
  if (!req.url) {
    res.writeHead(400);
    res.end("no url");
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  // =========================
  // PROXY ROUTE
  // =========================
  if (parsedUrl.pathname === "/api/proxy") {
    if (req.method !== "POST") {
      res.writeHead(405, { "content-type": "text/plain" });
      res.end("POST only");
      return;
    }

    let body = "";

    req.on("data", chunk => {
      console.log(chunk.toString())
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const {
          url,
          method = "GET",
          headers,
          query,
          data,
          form
        } = JSON.parse(body || "{}");

        if (!url) {
          res.writeHead(400);
          res.end(body);
          return;
        }

        const finalUrl = url + buildQuery(query);

        const options: any = {
          method,
          headers: normalizeHeaders(headers),
        };

        // JSON body
        if (data) {
          options.headers["content-type"] = "application/json";
          options.body = JSON.stringify(data);
        }

        // form body
        if (form) {
          options.headers["content-type"] =
            "application/x-www-form-urlencoded";
          options.body = new URLSearchParams(form).toString();
        }

        const response = await fetch(finalUrl, options);

        const buffer = Buffer.from(await response.arrayBuffer());

        res.writeHead(response.status, {
          "Access-Control-Allow-Origin": "*",
          "Content-Type":
            response.headers.get("content-type") ||
            "application/octet-stream",
        });

        res.end(buffer);
      } catch (err) {
        res.writeHead(500, {
          "content-type": "application/json",
        });

        res.end(JSON.stringify({ error: "proxy failed" }));
      }
    });

    return;
  }

  // =========================
  // STATIC FILE SERVER
  // =========================

  let filePath =
    parsedUrl.pathname === "/"
      ? path.join(DIST_DIR, "index.html")
      : path.join(DIST_DIR, parsedUrl.pathname);

  // basic path traversal protection
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403);
    res.end("nope");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("not found");
      return;
    }

    const ext = path.extname(filePath);

    res.writeHead(200, {
      "content-type": mimeTypes[ext] || "application/octet-stream",
    });

    res.end(data);
  });
});

// ---------- start ----------
server.listen(PORT, () => {
  console.log(`server running http://localhost:${PORT}`);
});