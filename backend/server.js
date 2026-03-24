require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/products", require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/customers", require("./routes/customers"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/order-items", require("./routes/orderItems"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/suppliers", require("./routes/suppliers"));
app.use("/api/schema", require("./routes/schema"));

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "🌊 Island Adventure Gear API",
    version: "1.0.0",
    database: process.env.DB_NAME,
    endpoints: [
      "GET  /api/products         — list all products",
      "GET  /api/products/:id     — get product by id",
      "GET  /api/products/search?q= — search products",
      "POST /api/products         — create product",
      "PUT  /api/products/:id     — update product",
      "DELETE /api/products/:id   — delete product",
      "",
      "GET  /api/categories/:id",
      "GET  /api/customers/:id",
      "GET  /api/orders/:id",
      "GET  /api/order-items/:id",
      "GET  /api/reviews/:id",
      "GET  /api/suppliers/:id",
      "",
      "GET  /api/schema           — view full DB schema",
    ],
  });
});

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .json({ error: "Internal server error", details: err.message });
});

// ─── Start server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 Database: ${process.env.DB_NAME} @ ${process.env.DB_HOST}`);
});
