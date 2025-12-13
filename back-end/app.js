const express = require("express");
const jsonServer = require("json-server");
const morgan = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 5005;
const server = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// IMPORTANT: Add these BEFORE other middleware
server.use(express.json()); // Parse JSON request bodies
server.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

server.use(middlewares);
server.use(morgan("dev"));

// Enable CORS - FIXED VERSION
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS"); // ADDED
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // FIXED
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
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