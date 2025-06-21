import React, { useState, useEffect, useRef } from 'react';
import starOff from '../../assets/stars/starOff.png';
import starOn from '../../assets/stars/starOn.png';
import starSound from '../../assets/sounds/Star.wav'; // importa el sonido .wav
import './BookCard.css';

export default function BookCard({ book, imgSrc }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Referencia para el audio para evitar recrearlo en cada render
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

    // Reproducir sonido al cambiar favorito
    audioRef.current.currentTime = 0; // reinicia para que pueda reproducirse rápido varias veces
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
      <p className="bookGender">{book.genero}</p>
    </div>
  );
}