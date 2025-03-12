import { useParams, useNavigate } from "react-router-dom";
import { Books as mockBooks } from "../utils/mockData"; 
import { useEffect, useState } from "react";
import "./style.css";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Get books from localStorage
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

    // Merge mock data with stored books
    const allBooks = [...mockBooks, ...storedBooks];

    // Find the book by id
    const foundBook = allBooks.find((book) => book.id.toString() === id);

    // Update state
    setBook(foundBook);
  }, [id]);

  if (!book) {
    return <h2 className="book-details-container">Book not found</h2>;
  }

  return (
    <div className="book-details-container">
      <h1>Book Details</h1>
      <h2>{book.title}</h2>
      <h3>By: {book.author}</h3>
      <img src={book.coverImage} alt={book.title} />
      <p>{book.description}</p>
      <h3 className="book-genre">Genre: {book.genre}</h3>
      <h3 className="book-pages">Pages: {book.pages}</h3>
      <button className="back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
}

export default BookDetails;
