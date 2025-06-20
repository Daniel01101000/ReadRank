import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Library from './components/Library.jsx';
import Favorites from './components/Favorites.jsx';
import AddBook from './components/AddBook.jsx';
import About from './components/About.jsx';
import mainbg from "./assets/mainbg.png";

import adventureImg from "./assets/books/Adventure.png";
import horrorImg from "./assets/books/Horror.png";
import romanceImg from "./assets/books/Romance.png";
import historyImg from "./assets/books/History.png";
import scifiImg from "./assets/books/Scifi.png";
import mysteryImg from "./assets/books/Mystery.png";

export default function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [books, setBooks] = useState([]);

  const genreImages = {
    "Aventura": adventureImg,
    "Terror": horrorImg,
    "Romance": romanceImg,
    "Historia": historyImg,
    "Ciencia ficcion": scifiImg,
    "Misterio": mysteryImg,
  };

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
    <Router basename="/ReadRank">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={
          <>
            <div className="hero">
              <img src={mainbg} alt="Fondo principal" className="hero-image" />
              <h1 className="title pixel-font">BookRank</h1>
            </div>

            <div className="book-grid">
              {books.map((book) => {
                const imgSrc = genreImages[book.genero];
                return (
                  <div key={book.id} className="book-card">
                    <p className="pixel-font">{book.title}</p>
                    <img src={imgSrc} alt={book.genero} className="book" />
                    <p className='bookAuthor'>{book.author}</p>
                    <p className='bookGender'>{book.genero}</p>
                  </div>
                );
              })}
            </div>
          </>
         } /> 
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/add" element={
          <div className="content">
            <form onSubmit={handleSubmit}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título"
                className="inputs"
                required
              />
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Autor"
                className="inputs"
                required
              />
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
                className="inputs"
              >
                <option value="" disabled hidden>Selecciona un género</option>
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
        } />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}