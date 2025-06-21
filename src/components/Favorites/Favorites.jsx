import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard/BookCard';
import './Favorites.css';

export default function Favorites({ books = [], genreImages = {} }) {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    if (!books.length) return;

    const storedFavorites = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
    const filteredBooks = books.filter(book => storedFavorites.includes(book.id));
    setFavoriteBooks(filteredBooks);
  }, [books]); // ✅ Solo depende de `books`

  if (!books.length) {
    return <h2 style={{ textAlign: 'center' }}>📚 Cargando libros...</h2>;
  }

  if (favoriteBooks.length === 0) {
    return <h2 style={{ textAlign: 'center' }}>⭐ Aún no tienes libros favoritos</h2>;
  }

  return (
    <main className="page-content favorites-page">
      <div className="book-grid">
        {favoriteBooks.map((book) => {
          const imgSrc = genreImages[book.genero];
          return (
            <BookCard key={book.id} book={book} imgSrc={imgSrc} />
          );
        })}
      </div>
    </main>
  );
}