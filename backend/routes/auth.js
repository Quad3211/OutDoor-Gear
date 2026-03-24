const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "island_adventure_secret_key";

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, phone, address, password } = req.body;

  if (!email || !password || !firstName) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required." });
  }

  try {
    // Check if user exists
    const [existing] = await pool.query(
      "SELECT * FROM customers WHERE Email = ?",
      [email],
    );
    if (existing.length > 0) {
      return res.status(409).json({ error: "Email already registered." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      `INSERT INTO customers (FirstName, LastName, Email, Phone, Address, PasswordHash) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        firstName,
        lastName || null,
        email,
        phone || null,
        address || null,
        passwordHash,
      ],
    );

    const token = jwt.sign(
      { customerId: result.insertId, email, firstName },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      message: "Registered successfully",
      token,
      user: {
        id: result.insertId,
        firstName,
        lastName,
        email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const [users] = await pool.query(
      "SELECT * FROM customers WHERE Email = ?",
      [email],
    );
    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = users[0];

    if (!user.PasswordHash) {
      return res
        .status(401)
        .json({
          error: "Account missing password. Please register again or reset.",
        });
    }

    const validPassword = await bcrypt.compare(password, user.PasswordHash);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign(
      {
        customerId: user.CustomerID,
        email: user.Email,
        firstName: user.FirstName,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Logged in successfully",
      token,
      user: {
        id: user.CustomerID,
        firstName: user.FirstName,
        lastName: user.LastName,
        email: user.Email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
