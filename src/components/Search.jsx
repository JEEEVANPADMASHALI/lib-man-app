import React, { useState } from "react";
import "./style.css";
import { Books as mockBooks } from "../utils/mockData";

function Search({ filterFunction }) {
  const [searchText, setSearchText] = useState("");

  function handleSearch() {
    if (!searchText.trim()) return; // Prevent empty search

    console.log("Search text:", searchText);

    // Get books from localStorage (default to empty array if null)
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

    // Merge mock data with stored books to get the complete book list
    const allBooks = [...mockBooks, ...storedBooks];

    // Filter books based on search text (search in title, author, or genre if available)
    const filteredBooks = allBooks.filter((book) =>
      book.title.toLowerCase().includes(searchText.toLowerCase())
    );

    console.log("Filtered books:", filteredBooks);

    // Pass the filtered books to update the book list in the parent component
    filterFunction(filteredBooks);
  }

  return (
    <div className="search">
      <h1>Welcome to Library</h1>
      <h2>Search Books</h2>
      <div>
        <input
          type="text"
          className="search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch} disabled={!searchText.trim()}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
