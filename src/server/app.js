// app.js
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  user: "root",
  host: "localhost",
  database: "BooksRank",
  password: "SQL1122",
  port: 3306,
});

app.post("/books", async (req, res) => {
  console.log("Recibido en POST /books:", req.body);
  const { title, author, genero, rating } = req.body; // ← se incluye rating
  try {
    const [result] = await pool.query(
      "INSERT INTO books (title, author, genero, rating) VALUES (?, ?, ?, ?)",
      [title, author, genero, rating]
    );
    res.status(201).json({ id: result.insertId, title, author, genero, rating });
  } catch (err) {
    console.error("Error en POST /books:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, title, author, genero, rating FROM books");
    res.json(rows);
  } catch (err) {
    console.error("Error en GET /books:", err);
    res.status(500).json({ error: err.message });
  }
});

export default app;