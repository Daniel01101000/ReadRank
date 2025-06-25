import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard/BookCard';
import './Favorites.css';
import starOn from '../../assets/stars/starOn.png';
import Book from '../../assets/Logo/logo.png';

export default function Favorites({ books = [], genreImages = {} }) {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    if (!books.length) return;

    const storedFavorites = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
    const filteredBooks = books.filter(book => storedFavorites.includes(book.id));
    setFavoriteBooks(filteredBooks);
  }, [books]);

  if (!books.length) {
    return (
      <div className="empty-favorites">
        <h2>
          <img src={Book} alt="Book loading icon" className="inline-book" />
          &nbsp;Loading books...
        </h2>
      </div>
    );
  }

  if (favoriteBooks.length === 0) {
    return (
      <div className="empty-favorites">
        <h2>
          <img src={starOn} alt="Favorite star" className="inline-star" />
          &nbsp;You don't have any favorite books yet
        </h2>
      </div>
    );
  }

  return (
    <main className="page-content-favorites-page">
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