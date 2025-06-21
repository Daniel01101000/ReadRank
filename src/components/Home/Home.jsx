import React from 'react';
import BookCard from '../BookCard/BookCard';
import mainbg from '../../assets/mainImg/mainbg.png';
import './Home.css';

export default function Home({ books, genreImages }) {
  return (
    <>
      <div className="hero">
        <img src={mainbg} alt="Fondo principal" className="hero-image" />
        <h1 className="title pixel-font">BookRank</h1>
      </div>

      <div className="book-grid">
        {books.map((book) => {
          const imgSrc = genreImages[book.genero];
          return (
            <BookCard key={book.id} book={book} imgSrc={imgSrc} />
          );
        })}
      </div>
    </>
  );
}