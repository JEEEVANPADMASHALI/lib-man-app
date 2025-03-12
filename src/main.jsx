import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
// import About from './components/About.jsx';
// import Contact from './components/contact.jsx';
import AddBook from './components/Addbook.jsx';
import Error from './components/Error.jsx';
import BrowseBook from './components/BrowseBook.jsx';
import PopularBook from './components/PopularBook.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookList from './components/BookList.jsx';
import BookDetails from './components/BookDetails.jsx';


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PopularBook />,
      },
      // {
      //   path: "/about",
      //   element: <About />
      // },
      // {
      //   path: "/contact",
      //   element: <Contact />
      // },
      {
        path: "/addbook",
        element: <AddBook />
      },
      {
        path: "/browse-book",
        element: <BrowseBook />
      },
      {
        path: "/book/:id",
        element: <BookDetails/>
      }
    ],
    errorElement: <Error />
  },
  
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
