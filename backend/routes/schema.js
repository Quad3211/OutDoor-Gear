/**
 * Schema discovery route — returns all tables and their columns
 * from the connected MySQL database.
 * GET /api/schema
 */
const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [tables] = await pool.query(
      `SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE()`,
    );

    const schema = {};
    for (const row of tables) {
      const tableName = row.TABLE_NAME;
      const [columns] = await pool.query(
        `SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_KEY, EXTRA
         FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?
         ORDER BY ORDINAL_POSITION`,
        [tableName],
      );
      schema[tableName] = columns;
    }

    res.json(schema);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
