import { useRouteError } from "react-router-dom";
import "./Error.css"; // Import the CSS file

function Error() {
    const err = useRouteError();
    console.log(err);

    return (
        <div className="error-container">
            <h1>Oops!!</h1>
            <h2>Please enter the correct path</h2>
            <h3>{err.status} {err.statusText}</h3>
            <p>{err.data}</p>
        </div>
    );
}

export default Error;
