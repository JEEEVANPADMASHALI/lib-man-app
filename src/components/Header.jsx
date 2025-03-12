import "./Header.css";
import { Link } from "react-router-dom";

function Header(){
    return(
        <div className="header">
        <ul>
            <Link to="/"> <li>Home</li> </Link>
            <Link to="/browse-book"> <li>Browse book</li></Link>
            <Link to="/addbook"> <li>Add book</li></Link>
        </ul>
        </div>
 
    );
}

export default Header;