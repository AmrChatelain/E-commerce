const express = require("express");
const jsonServer = require("json-server");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 5005;
const server = express();

// IMPORTANT: Parse body BEFORE anything else
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Logging
server.use(morgan("dev"));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS"); //added this one to control
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Serve static files
server.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Root route
server.get("/", (req, res) => {
  res.send(`
    <h1>Backend is running!</h1>
    <p>Visit <a href='/products'>/products</a> to see the products JSON.</p>
  `);
});


// CUSTOM ROUTES - MUST BE BEFORE JSON SERVER

// DELETE product by _id
server.delete("/products/:id", (req, res) => {
  try {
    const dbPath = path.join(__dirname, "db.json");
    const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    const productId = req.params.id;
    
    console.log(`[DELETE] Attempting to delete product: ${productId}`);
    
    if (!db.products || !Array.isArray(db.products)) {
      console.error('[DELETE] db.products is not an array!');
      return res.status(500).json({ 
        success: false, 
        error: "Database structure error" 
      });
    }
    
    console.log(`[DELETE] Total products before: ${db.products.length}`);
    
    // Filter out the product
    const originalLength = db.products.length;
    db.products = db.products.filter(p => p._id !== productId);
    
    const deleted = originalLength - db.products.length;
    
    if (deleted === 0) {
      console.log(`[DELETE] Product ${productId} not found`);
      return res.status(404).json({ 
        success: false, 
        error: `Product ${productId} not found` 
      });
    }
    
    // Write back to file
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    console.log(`[DELETE] Success! Product ${productId} deleted. Remaining: ${db.products.length}`);
    
    return res.status(200).json({ 
      success: true, 
      message: "Product deleted",
      id: productId 
    });
    
  } catch (error) {
    console.error('[DELETE] Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// UPDATE product by _id
server.put("/products/:id", (req, res) => {
  try {
    const dbPath = path.join(__dirname, "db.json");
    const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    const productId = req.params.id;
    const updates = req.body;
    
    console.log(`[PUT] Attempting to update product: ${productId}`);
    console.log('[PUT] Update data:', updates);
    
    if (!db.products || !Array.isArray(db.products)) {
      console.error('[PUT] db.products is not an array!');
      return res.status(500).json({ 
        success: false, 
        error: "Database structure error" 
      });
    }
    
    // Find product
    const index = db.products.findIndex(p => p._id === productId);
    
    if (index === -1) {
      console.log(`[PUT] Product ${productId} not found`);
      return res.status(404).json({ 
        success: false, 
        error: `Product ${productId} not found` 
      });
    }
    
    // Update
    db.products[index] = {
      ...db.products[index],
      ...updates,
      _id: productId
    };
    
    // Write back
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    console.log(`[PUT] Success! Product ${productId} updated`);
    
    return res.status(200).json({ 
      success: true, 
      message: "Product updated",
      product: db.products[index]
    });
    
  } catch (error) {
    console.error('[PUT] Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});


// JSON SERVER (for GET and other operations)

const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Start
server.listen(PORT, () => {
  console.log(` Server running on "http://localhost:${PORT}"`);
  console.log(` Custom DELETE and PUT routes active for /products/:id`);
});