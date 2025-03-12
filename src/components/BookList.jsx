import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Book from "./Book";
import { Books } from "../utils/mockData";
import "./style.css";

function BookList() {
  const [filteredBooks, setFilteredBooks] = useState(Books);
  const [allBooks, setAllBooks] = useState(Books);

  function filterSearchList(filteredSearchBooks) {
    setFilteredBooks(filteredSearchBooks);
  }

  function handleAddBook(newBook) {
    const updatedBooks = [...allBooks, newBook];
    setAllBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
  }

  return (
    <>
   
      <Search filterFunction={filterSearchList} />
      
      <div className="popular">
         <h2>popular books</h2>
      </div>
      
      <div className="bookList">
        
        {filteredBooks.map((book) => (
         <Link to={`/book/${book.id}`}>
         <Book key={book.id} bookDetails={book} />
         </Link> 
        ))}
      </div>
    </>
  );
}

export default BookList;
