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
  port: 3306, // puerto por defecto de MySQL
});

app.post("/books", async (req, res) => {
  const { title, author } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO books (title, author) VALUES (?, ?)",
      [title, author]
    );
    res.status(201).json({ id: result.insertId, title, author });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM books");
    res.json(rows);
  } catch (err) {
    console.error("Error en GET /books:", err); // Esto es importante
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("Servidor corriendo en puerto 3001"));