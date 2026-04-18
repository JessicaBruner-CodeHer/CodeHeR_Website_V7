import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import quoteRoutes from "./routes/quoteRoutes.js";
import badgeRoutes from "./routes/badgeRoutes.js";
import env from "./config/env.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://codeherllc.com",
  "http://www.codeherllc.com",
  "https://codeherllc.com",
  "https://www.codeherllc.com",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/quotes", quoteRoutes);
app.use("/api/badge-requests", badgeRoutes);

// ── BLS Workforce Stats ──────────────────────────────────────
const BLS_SERIES = ["LNS14000000", "LNS13000000", "JTS00000000JOL", "LNS13008396"];

const BLS_FALLBACK = {
  unemploymentRate:   "4.1",
  unemployedPersons:  "6,800,000",
  jobOpenings:        "8,600,000",
  longTermUnemployed: "1,600,000",
  lastUpdated:        "March 2025",
  source:             "U.S. Bureau of Labor Statistics",
};

let blsCache = null;
let blsCacheTime = 0;
const BLS_TTL = 60 * 60 * 1000;

function formatThousands(rawValue) {
  const num = Math.round(parseFloat(rawValue) * 1000);
  return num.toLocaleString("en-US");
}

app.get("/api/workforce-stats", async (_req, res) => {
  if (blsCache && Date.now() - blsCacheTime < BLS_TTL) {
    return res.json(blsCache);
  }

  try {
    const body = {
      seriesid: BLS_SERIES,
      latest: true,
      registrationkey: env.blsApiKey,
    };

    const response = await fetch("https://api.bls.gov/publicAPI/v2/timeseries/data/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await response.json();

    if (json.status !== "REQUEST_SUCCEEDED") {
      console.warn("[bls] API returned non-success:", json.status);
      return res.json(blsCache ?? BLS_FALLBACK);
    }

    const byId = {};
    for (const series of json.Results.series) {
      const latest = series.data?.[0];
      if (latest) byId[series.seriesID] = latest;
    }

    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const latestEntry = byId["LNS14000000"] ?? byId["LNS13000000"];
    const periodLabel = latestEntry
      ? `${monthNames[parseInt(latestEntry.period.replace("M", ""), 10) - 1]} ${latestEntry.year}`
      : BLS_FALLBACK.lastUpdated;

    blsCache = {
      unemploymentRate:   byId["LNS14000000"]    ? byId["LNS14000000"].value                     : BLS_FALLBACK.unemploymentRate,
      unemployedPersons:  byId["LNS13000000"]    ? formatThousands(byId["LNS13000000"].value)    : BLS_FALLBACK.unemployedPersons,
      jobOpenings:        byId["JTS00000000JOL"] ? formatThousands(byId["JTS00000000JOL"].value) : BLS_FALLBACK.jobOpenings,
      longTermUnemployed: byId["LNS13008396"]    ? formatThousands(byId["LNS13008396"].value)    : BLS_FALLBACK.longTermUnemployed,
      lastUpdated:        periodLabel,
      source:             "U.S. Bureau of Labor Statistics",
    };
    blsCacheTime = Date.now();

    return res.json(blsCache);
  } catch (err) {
    console.error("[bls] Fetch failed:", err.message);
    return res.json(blsCache ?? BLS_FALLBACK);
  }
});

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "../../client/dist");
  app.use(express.static(clientDist));
  app.get("/{*path}", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

export default app;
