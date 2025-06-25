import BookCard from '../BookCard/BookCard';
import './TopRated.css';

export default function TopRated({ books = [], genreImages = {} }) {
  const topBooks = [...books]
    .filter(book => book.rating >= 8.0)
    .sort((a, b) => b.rating - a.rating);

  return (
    <div className="top-rated-page">
      <div className="book-grid">
        {topBooks.map(book => (
          <BookCard key={book.id} book={book} imgSrc={genreImages[book.genero]} />
        ))}
      </div>
    </div>
  );
}