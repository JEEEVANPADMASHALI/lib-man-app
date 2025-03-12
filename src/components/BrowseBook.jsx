import React, { useState, useEffect } from "react";
import { Books as mockBooks } from "../utils/mockData";
import Book from "./Book";
import Search from "./Search";
import "./BrowseBook.css";

const categories = ["All", "Fiction", "Non-Fiction", "Sci-Fi", "Fantasy", "Mystery", "Biography"];

function BrowseBook() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    // Load books from localStorage and merge with mock data
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setFilteredBooks([...mockBooks, ...storedBooks]);
  }, []);

  function handleFilter(updatedBooks) {
    setFilteredBooks(updatedBooks);
  }

  // Filter books based on category
  const displayedBooks =
    selectedCategory === "All"
      ? filteredBooks
      : filteredBooks.filter((book) => book.genre === selectedCategory);

  return (
    <div className="browse-container">
      <Search filterFunction={handleFilter} /> {/* Add the Search component */}

      <h2>Browse Books</h2>

      {/* Category Filter */}
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Books List */}
      <div className="book-list">
        {displayedBooks.length > 0 ? (
          displayedBooks.map((book) => <Book key={book.id} bookDetails={book} />)
        ) : (
          <p className="no-books">No books found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default BrowseBook;
