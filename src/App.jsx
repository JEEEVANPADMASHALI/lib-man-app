/**
 * 
 * 
 */


import BookList from "./components/BookList"
import { Books } from "./utils/mockData";
import "./components/style.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BrowseBook from "./components/BrowseBook";
import BookDetails from "./components/BookDetails";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";


function App() {
   return (
    <>
    <Header/>
    <Outlet/>
    </>
   
   );
}

export default App
