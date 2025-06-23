import React, { useState, useEffect, useRef } from 'react';
import starOff from '../../assets/stars/starOff.png';
import starOn from '../../assets/stars/starOn.png';
import starSound from '../../assets/sounds/Star.wav'; // importa el sonido .wav
import './BookCard.css';


export default function BookCard({ book, imgSrc }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const audioRef = useRef(new Audio(starSound));

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
    setIsFavorite(storedFavorites.includes(book.id));
  }, [book.id]);

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
    let updatedFavorites;
    if (storedFavorites.includes(book.id)) {
      updatedFavorites = storedFavorites.filter(id => id !== book.id);
    } else {
      updatedFavorites = [...storedFavorites, book.id];
    }
    localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return (
    <div className="book-card">
      <div className="star-container">
        <img
          src={isFavorite ? starOn : starOff}
          alt="Favorito"
          className="starOff"
          onClick={toggleFavorite}
        />
      </div>
      <p className="pixel-font">{book.title}</p>
      <img src={imgSrc} alt={book.genero} className="book" />
      <p className="bookAuthor">{book.author}</p>

      {/* Contenedor para estrella + calificación */}
      <div className="rating-container">
        <img
          src={starOn}
          alt="star"
          className="star-small"
        />
        <span className="bookRating">{book.rating}</span>
      </div>

      <p className="bookGender">{book.genero}</p>
    </div>
  );
}