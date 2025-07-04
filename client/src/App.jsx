import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Home from './components/Home/Home.jsx';
import Library from './components/Library/Library.jsx';
import Favorites from './components/Favorites/Favorites.jsx';
import AddBook from './components/AddBook/AddBook.jsx';
import About from './components/About/About.jsx';
import TopRated from './components/TopRated/TopRated.jsx'; // ✅ NUEVO

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
  const [rating, setRating] = useState(null);
  const [books, setBooks] = useState([]);

  const genreImages = {
    "Adventure": adventureImg,
    "Horror": horrorImg,
    "Romance": romanceImg,
    "History": historyImg,
    "Scifi": scifiImg,
    "Mystery": mysteryImg,
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

    if (rating === null || isNaN(rating)) {
      alert("Please enter a valid rating");
      return;
    }

    await fetch("http://localhost:3001/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, genero: genre, rating }),
    });

    setTitle("");
    setAuthor("");
    setGenre("");
    setRating(null);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Router basename="/ReadRank">
      <Header />
      <Routes>
        <Route path="/" element={<Home books={books} genreImages={genreImages} />} />
        <Route path="/library" element={<Library books={books} genreImages={genreImages} />} />
        <Route path="/favorites" element={<Favorites books={books} genreImages={genreImages} />} />
        <Route path="/top-rated" element={<TopRated books={books} genreImages={genreImages} />} /> {/* ✅ NUEVA RUTA */}
        <Route path="/add" element={
          <AddBook
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            genre={genre}
            setGenre={setGenre}
            setRating={setRating}
            handleSubmit={handleSubmit}
            books={books}
            genreImages={genreImages}
          />
        } />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}