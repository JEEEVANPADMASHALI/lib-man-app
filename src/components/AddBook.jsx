import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddBook.css"; 

function AddBook() {
  const navigate = useNavigate();
  const location = useLocation();
  const onAddBook = location.state?.onAddBook || (() => {}); // Get function from state

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedDate: "",
    pages: "",
    coverImage: "",
    description: "",
    genre: "",
    rating: "", // New field for rating
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Handles input changes and validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  // Validate form fields
  const validateField = (name, value) => {
    let errorMsg = "";

    if (!value.trim()) {
      errorMsg = "This field is required.";
    } else {
      if (name === "title" && value.length < 3) {
        errorMsg = "Title must be at least 3 characters.";
      }
      if (name === "pages" && (isNaN(value) || parseInt(value) <= 0)) {
        errorMsg = "Pages must be a valid number greater than zero.";
      }
      if (name === "coverImage" && !/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i.test(value)) {
        errorMsg = "Please enter a valid image URL (jpg, png, gif).";
      }
      if (name === "genre" && value === "") {
        errorMsg = "Please select a genre.";
      }
      if (name === "rating") {
        const ratingValue = parseFloat(value);
        if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
          errorMsg = "Rating must be between 1 and 5.";
        }
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));

    checkFormValidity();
  };

  // Check overall form validity
  const checkFormValidity = () => {
    const isValid =
      Object.values(formData).every((value) => value.trim() !== "") &&
      Object.values(errors).every((error) => error === "");
    setIsFormValid(isValid);
  };

  // Handle form submission
  const handleAddBook = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Please correct the errors before submitting.");
      return;
    }

    const newBook = {
      id: Date.now(),
      ...formData,
      pages: parseInt(formData.pages),
      rating: parseFloat(formData.rating), // Store rating as a number
    };

    // Retrieve existing books from local storage
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

    // Add the new book to the list
    const updatedBooks = [...storedBooks, newBook];

    // Save updated books back to local storage
    localStorage.setItem("books", JSON.stringify(updatedBooks));

    onAddBook(newBook); // Update the state if needed
    resetForm();

    setTimeout(() => {
      navigate("/browse-book"); // Redirect after submission
    }, 500);
  };

  // Reset form after submission
  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      publishedDate: "",
      pages: "",
      coverImage: "",
      description: "",
      genre: "",
      rating: "", // Reset rating
    });
    setErrors({});
    setIsFormValid(false);
  };

  return (
    <div className="add-book-container">
      <h2>Add a New Book</h2>
      <form className="add-book-form" onSubmit={handleAddBook}>
        
        <label>Title:</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required
        />
        {errors.title && <span className="error">{errors.title}</span>}

        <label>Author:</label>
        <input 
          type="text" 
          name="author" 
          value={formData.author} 
          onChange={handleChange} 
          required
        />
        {errors.author && <span className="error">{errors.author}</span>}

        <label>Published Date:</label>
        <input 
          type="date" 
          name="publishedDate" 
          value={formData.publishedDate} 
          onChange={handleChange} 
          required
        />
        {errors.publishedDate && <span className="error">{errors.publishedDate}</span>}

        <label>Pages:</label>
        <input 
          type="number" 
          name="pages" 
          value={formData.pages} 
          onChange={handleChange} 
          required
        />
        {errors.pages && <span className="error">{errors.pages}</span>}

        <label>Genre:</label>
        <select 
          name="genre" 
          value={formData.genre} 
          onChange={handleChange} 
          required
        >
          <option value="">Select a genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-fiction">Non-fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Sci-Fi">Science Fiction</option>
          <option value="Biography">Biography</option>
        </select>
        {errors.genre && <span className="error">{errors.genre}</span>}

        <label>Cover Image URL:</label>
        <input 
          type="text" 
          name="coverImage" 
          value={formData.coverImage} 
          onChange={handleChange} 
          required
        />
        {errors.coverImage && <span className="error">{errors.coverImage}</span>}

        <label>Description:</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required
        />
        {errors.description && <span className="error">{errors.description}</span>}

        <label>Rating (1-5):</label>
        <input 
          type="number" 
          name="rating" 
          value={formData.rating} 
          onChange={handleChange} 
          min="1"
          max="5"
          step="0.1"
          required
        />
        {errors.rating && <span className="error">{errors.rating}</span>}

        <button type="submit" disabled={!isFormValid}>Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
