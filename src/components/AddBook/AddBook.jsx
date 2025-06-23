import BookCard from '../BookCard/BookCard.jsx';
import './AddBook.css';

export default function AddBook({
  title,
  setTitle,
  author,
  setAuthor,
  genre,
  setGenre,
  rating,
  setRating,
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
          placeholder="Title"
          className="inputs"
          required
        />
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          className="inputs"
          required
        />
        <input
  type="number"
  step="0.1"
  min="0"
  max="10"
  value={rating === null ? "" : rating}
  onChange={(e) => {
    const val = e.target.value;
    setRating(val === "" ? null : parseFloat(val));
  }}
  placeholder="Rating"
  className="inputs"
  required
/>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
          className="inputs"
        >
           <option value="" disabled hidden>Select a genre</option>
           <option value="Adventure">Adventure</option>
           <option value="Horror">Horror</option>
           <option value="Romance">Romance</option>
           <option value="History">History</option>
           <option value="Scifi">Science Fiction</option>
           <option value="Mystery">Mystery</option>
        </select>
        <button>Add</button>
      </form>
    </main>
  );
}