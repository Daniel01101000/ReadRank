import BookCard from '../BookCard/BookCard.jsx';
import './Library.css';

export default function Library({ books, genreImages }) {
  return (
    <main className="page-content library-page">
      <div className="book-grid">
        {books.map((book) => {
          const imgSrc = genreImages[book.genero];
          return (
            <BookCard key={book.id} book={book} imgSrc={imgSrc} />
          );
        })}
      </div>
    </main>
  );
}