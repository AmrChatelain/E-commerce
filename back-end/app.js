const express = require("express");
const jsonServer = require("json-server");
const morgan = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 5005;
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

// Root route
server.get("/", (req, res) => {
  res.send(`
    <h1>Backend is running!</h1>
    <p>Visit <a href='/products'>/products</a> to see the products JSON.</p>
  `);
});

// JSON Server routes
server.use(router);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
