import React from 'react';
import starOff from '../assets/stars/s5.png';
import './BookCard.css';

export default function BookCard({ book, imgSrc }) {
  return (
    <div className="book-card">
      <img src={starOff} alt={starOff} className="starOff" />
      <p className="pixel-font">{book.title}</p>
      <img src={imgSrc} alt={book.genero} className="book" />
      <p className="bookAuthor">{book.author}</p>
      <p className="bookGender">{book.genero}</p>
    </div>
  );
}