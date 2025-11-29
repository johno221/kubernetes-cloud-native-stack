const express = require("express");
const cors = require("cors");
const client = require("prom-client");

const app = express();
const port = process.env.PORT || 8080;

const APP_VERSION = process.env.APP_VERSION || "dev";
const APP_ENV = process.env.APP_ENV || "local";
const GREETING_MESSAGE = process.env.GREETING_MESSAGE || "Hello from backend!";

app.use(cors());
app.use(express.json());

// ----- Prometheus metrics -----
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"]
});

register.registerMetric(httpRequestCounter);

// Middleware na počítanie requestov
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode
    });
  });
  next();
});

// ----- Health / readiness -----
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/ready", (req, res) => {
 // kontrola DB, message brokeru a pod.
  res.status(200).send("READY");
});

// ----- API endpoints -----
app.get("/api/hello", (req, res) => {
  res.json({
    message: GREETING_MESSAGE,
    version: APP_VERSION,
    environment: APP_ENV,
    timestamp: new Date().toISOString()
  });
});

app.get("/api/info", (req, res) => {
  res.json({
    version: APP_VERSION,
    environment: APP_ENV,
    uptimeSeconds: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ----- Prometheus metrics endpoint -----
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err.message);
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});

