import { Link } from "react-router-dom";
import "./style.css";

function Book({ bookDetails }) {
  return (
    <Link to={`/book/${bookDetails.id}`} className="book-link">
      <div className="book-card">
        <img
          src={bookDetails.coverImage || "https://via.placeholder.com/200"} // Fallback image
          alt={bookDetails.title || "Book Cover"}
          height="200px"
          width="200px"
          className="book-cover"
        />
        <div className="book-details">
          <h2 className="book-title">{bookDetails.title}</h2>
          <p className="book-author">By {bookDetails.author}</p>
          <p className="book-genre">{bookDetails.genre}</p>
          {bookDetails.price && <p className="book-price">Price: ${bookDetails.price}</p>}
          {/* <p className="book-description">
            {bookDetails.description.length > 100
              ? `${bookDetails.description.substring(0, 100)}...`
              : bookDetails.description}
          </p> */}
          <p>⭐ Rating: {bookDetails.rating}/ 5</p>
          <button className="view-more-btn">View More</button>  
        </div>
      </div>
    </Link>
  );
}

export default Book;
