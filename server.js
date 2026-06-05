import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initialData } from "./app.js";
import { approveCandidate, runDailyUpdate } from "./update-engine.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT ?? 8080);
const DATA_PATH = path.join(__dirname, "data", "live-data.json");
const SOURCE_PATH = path.join(__dirname, "data", "source-watchlist.json");
const PUBLIC_FILES = new Set(["/", "/index.html", "/styles.css", "/app.js"]);

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

async function writeJson(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function sendJson(response, payload, status = 200) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  if (!PUBLIC_FILES.has(pathname)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  const filePath = path.join(__dirname, pathname.slice(1));
  const ext = path.extname(filePath);
  const contentTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8"
  };
  response.writeHead(200, { "Content-Type": contentTypes[ext] ?? "text/plain; charset=utf-8" });
  response.end(await fs.readFile(filePath));
}

async function handleApi(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const data = await readJson(DATA_PATH, { ...initialData, reviewQueue: [] });

  if (request.method === "GET" && url.pathname === "/api/health") {
    sendJson(response, { ok: true, service: "membership-monitor" });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/data") {
    sendJson(response, data);
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/update") {
    const sources = await readJson(SOURCE_PATH, []);
    const result = await runDailyUpdate(data, sources);
    await writeJson(DATA_PATH, result.data);
    await writeJson(SOURCE_PATH, result.sources);
    sendJson(response, result);
    return;
  }

  const approveMatch = url.pathname.match(/^\/api\/review\/([^/]+)\/approve$/);
  if (request.method === "POST" && approveMatch) {
    await readBody(request);
    const nextData = approveCandidate(data, decodeURIComponent(approveMatch[1]));
    await writeJson(DATA_PATH, nextData);
    sendJson(response, nextData);
    return;
  }

  sendJson(response, { error: "Not found" }, 404);
}

function startDailyScheduler() {
  const runAtHour = Number(process.env.UPDATE_HOUR ?? 9);
  let lastRunDate = "";

  setInterval(async () => {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("zh-CN", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      hour12: false
    }).formatToParts(now);
    const part = (type) => parts.find((item) => item.type === type)?.value;
    const localDate = `${part("year")}-${part("month")}-${part("day")}`;
    const localHour = Number(part("hour"));

    if (localHour === runAtHour && lastRunDate !== localDate) {
      lastRunDate = localDate;
      const data = await readJson(DATA_PATH, { ...initialData, reviewQueue: [] });
      const sources = await readJson(SOURCE_PATH, []);
      const result = await runDailyUpdate(data, sources);
      await writeJson(DATA_PATH, result.data);
      await writeJson(SOURCE_PATH, result.sources);
      console.log(`[daily-update] ${result.checkedAt} errors=${result.errors.length}`);
    }
  }, 15 * 60 * 1000);
}

const server = http.createServer(async (request, response) => {
  try {
    if (request.url.startsWith("/api/")) {
      await handleApi(request, response);
    } else {
      await serveStatic(request, response);
    }
  } catch (error) {
    sendJson(response, { error: error.message }, 500);
  }
});

server.listen(PORT, () => {
  console.log(`membership monitor listening on http://localhost:${PORT}`);
});

startDailyScheduler();
