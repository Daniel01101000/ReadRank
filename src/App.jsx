import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Library from './components/Library.jsx';
import Favorites from './components/Favorites.jsx';
import AddBook from './components/AddBook.jsx';
import About from './components/About.jsx';

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
        <Route path="/" element={<Home books={books} genreImages={genreImages} />} />
        <Route path="/library" element={
          <Library books={books} genreImages={genreImages} />
        } />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/add" element={
          <AddBook
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            genre={genre}
            setGenre={setGenre}
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
