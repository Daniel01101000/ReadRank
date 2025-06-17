import './App.css';

import { useState, useEffect } from "react";

export default function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
  try {
    const res = await fetch("http://localhost:3001/books");
    if (!res.ok) throw new Error("Error al obtener libros");
    const data = await res.json();
    setBooks(data);
  } catch (error) {
    console.error(error);
    setBooks([]); // para evitar error si hay fallo
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3001/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    });
    setTitle("");
    setAuthor("");
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  
  return (
    <div>
      <h1>App de Libros 📚</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          required
        />
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Autor"
          required
        />
        <button>Agregar</button>
      </form>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}