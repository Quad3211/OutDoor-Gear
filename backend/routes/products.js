/**
 * Products route — full CRUD for the `products` table.
 * Extends generic CRUD with a search endpoint.
 */
const express = require("express");
const pool = require("../db");
const { createCRUDRouter } = require("./crudRouter");

const router = createCRUDRouter("products", "product_id");

// GET /api/products/search?q=keyword
router.get("/search", async (req, res) => {
  const q = req.query.q || "";
  try {
    const [rows] = await pool.query(
      `SELECT * FROM products WHERE name LIKE ? OR description LIKE ?`,
      [`%${q}%`, `%${q}%`],
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
