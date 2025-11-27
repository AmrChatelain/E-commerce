try {
  process.loadEnvFile();
} catch (e) {
  console.warn(".env file not found, using default values.");
}

const jsonServer = require("json-server");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router("db.json");

// DEFAULT MIDDLEWARES (logger, static, CORS, etc.)
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 5000;

// Serve EVERYTHING inside public (including /uploads)
server.use(express.static(path.join(__dirname, "public")));

// JSON-server middlewares
server.use(middlewares);
server.use(morgan("dev"));

// Enable CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// API routes from db.json
server.use("/api", router);

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Images served from /uploads/...`);
  console.log(`API available at /api/...`);
});
