import http from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3001;
const DB_PATH = path.join(__dirname, "payment-methods.db.json");

async function ensureDb() {
  try {
    await readFile(DB_PATH, "utf8");
  } catch {
    await mkdir(__dirname, { recursive: true });
    await writeFile(DB_PATH, JSON.stringify([], null, 2), "utf8");
  }
}

async function readDb() {
  await ensureDb();
  const content = await readFile(DB_PATH, "utf8");
  return JSON.parse(content || "[]");
}

async function writeDb(data) {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(data));
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (url.pathname !== "/api/payment-methods") {
    sendJson(res, 404, { message: "Rota não encontrada." });
    return;
  }

  if (req.method === "GET") {
    const methods = await readDb();
    sendJson(res, 200, methods);
    return;
  }

  if (req.method === "POST") {
    try {
      const body = await readRequestBody(req);
      const methods = await readDb();
      const id = Date.now().toString();

      const base = {
        id,
        type: body.type,
        nickname: body.nickname,
        createdAt: new Date().toISOString(),
      };

      let nextMethod;

      if (body.type === "card") {
        nextMethod = {
          ...base,
          holderName: body.holderName,
          cardNumber: body.cardNumber,
          lastDigits:
            body.lastDigits || String(body.cardNumber || "").slice(-4),
          expiry: body.expiry,
        };
      } else {
        nextMethod = {
          ...base,
          type: "boleto",
          document: body.document,
          email: body.email,
        };
      }

      const nextMethods = [nextMethod, ...methods];
      await writeDb(nextMethods);
      sendJson(res, 201, nextMethod);
      return;
    } catch (error) {
      sendJson(res, 400, { message: "Não foi possível cadastrar o método." });
      return;
    }
  }

  if (req.method === "DELETE") {
    const id = url.pathname.split("/").pop();
    const methods = await readDb();
    const nextMethods = methods.filter((method) => method.id !== id);

    if (nextMethods.length === methods.length) {
      sendJson(res, 404, { message: "Método não encontrado." });
      return;
    }

    await writeDb(nextMethods);
    sendJson(res, 200, { ok: true });
    return;
  }

  sendJson(res, 405, { message: "Método não suportado." });
});

server.listen(PORT, () => {
  console.log(`Payment API running on http://localhost:${PORT}`);
});
