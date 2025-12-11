const express = require("express");
const jsonServer = require("json-server");
const morgan = require("morgan");
const path = require("path");

const PORT = process.env.PORT || https://e-commerce-09wy.onrender.com;
const server = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(morgan("dev"));

// Enable CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Serve images
server.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// ----------------------------
// Root route must be before JSON Server
// ----------------------------
server.get("/", (req, res) => {
  res.send(
    "<h1>Backend is running!</h1><p>Visit <a href='/products'>/products</a> to see products JSON.</p>"
  );
});

// JSON Server API
server.use(router);

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Images available at http://localhost:${PORT}/uploads/...`);
  console.log(`API available at http://localhost:${PORT}/products`);
});
