import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Book from "./Book";
import { Books } from "../utils/mockData"; // Import book data
import "./style.css";

function PopularBook() {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Function to fetch books from local storage and filter high-rated books
  const getPopularBooks = () => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    const allBooks = [...Books, ...storedBooks]; // Merge mock data with stored books
    const highRatedBooks = allBooks.filter((book) => book.rating >= 4.5);
    setFilteredBooks(highRatedBooks);
  };

  // Fetch books when component mounts
  useEffect(() => {
    getPopularBooks();
  }, []);

  // Function to filter search results and keep only high-rated books
  function filterSearchList(filteredSearchBooks) {
    setFilteredBooks(filteredSearchBooks.filter((book) => book.rating >= 4.5));
    setIsSearching(filteredSearchBooks.length > 0);
  }

  return (
    <>
      <Search filterFunction={filterSearchList} />

      {!isSearching && (
        <div className="popular">
          <h2>Popular Books</h2>
        </div>
      )}

      <div className="bookList">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Link to={`/book/${book.id}`} key={book.id}>
              <Book bookDetails={book} />
            </Link>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </>
  );
}

export default PopularBook;
