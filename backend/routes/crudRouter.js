/**
 * Generic CRUD route factory.
 * Creates standard REST endpoints for any DB table.
 * Usage: createCRUDRouter('table_name', 'primary_key')
 */
const express = require("express");
const pool = require("../db");

function createCRUDRouter(tableName, primaryKey = "id") {
  const router = express.Router();

  // GET all rows
  router.get("/", async (req, res) => {
    try {
      const [rows] = await pool.query(`SELECT * FROM \`${tableName}\``);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET single row by primary key
  router.get(`/:id`, async (req, res) => {
    try {
      const [rows] = await pool.query(
        `SELECT * FROM \`${tableName}\` WHERE \`${primaryKey}\` = ?`,
        [req.params.id],
      );
      if (rows.length === 0)
        return res.status(404).json({ error: "Not found" });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST create
  router.post("/", async (req, res) => {
    try {
      const [result] = await pool.query(`INSERT INTO \`${tableName}\` SET ?`, [
        req.body,
      ]);
      res.status(201).json({ [primaryKey]: result.insertId, ...req.body });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT update
  router.put("/:id", async (req, res) => {
    try {
      const [result] = await pool.query(
        `UPDATE \`${tableName}\` SET ? WHERE \`${primaryKey}\` = ?`,
        [req.body, req.params.id],
      );
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Not found" });
      res.json({
        message: "Updated successfully",
        [primaryKey]: req.params.id,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE
  router.delete("/:id", async (req, res) => {
    try {
      const [result] = await pool.query(
        `DELETE FROM \`${tableName}\` WHERE \`${primaryKey}\` = ?`,
        [req.params.id],
      );
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Not found" });
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

module.exports = { createCRUDRouter };
