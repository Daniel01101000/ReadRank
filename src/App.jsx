import './App.css';
import { useState, useEffect } from "react";
import li2 from "./assets/books/l2.png";

export default function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:3001/books");
      if (!res.ok) throw new Error("Error al obtener libros");
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error(error);
      setBooks([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3001/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, genero: genre }),
    });
    setTitle("");
    setAuthor("");
    setGenre("");
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <div className="hero">
        <h1 className="title pixel-font">BookRank</h1>
      </div>

      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <p className="pixel-font">{book.title}</p>
            <img src={li2} alt="li2" className="book" />
            <p>{book.author}</p>
            <p><em>{book.genero}</em></p>
          </div>
        ))}
      </div>

      <div className="content">
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
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          >
            <option value="">Selecciona un género</option>
            <option value="Aventura">Aventura</option>
            <option value="Terror">Terror</option>
            <option value="Romance">Romance</option>
            <option value="Historia">Historia</option>
            <option value="Ciencia ficcion">Ciencia ficción</option>
            <option value="Misterio">Misterio</option>
          </select>
          <button>Agregar</button>
        </form>
      </div>
    </>
  );
}