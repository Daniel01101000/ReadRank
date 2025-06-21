import React from 'react';
import BookCard from '../BookCard/BookCard.jsx';
import './AddBook.css';

export default function AddBook({
  title,
  setTitle,
  author,
  setAuthor,
  genre,
  setGenre,
  handleSubmit,
  books,
  genreImages
}) {
  return (
    <main className="page-content add-book-page">
      <div className="book-grid">
        {books.map((book) => {
          const imgSrc = genreImages[book.genero];
          return (
            <BookCard key={book.id} book={book} imgSrc={imgSrc} />
          );
        })}
      </div>
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
    </main>
  );
}