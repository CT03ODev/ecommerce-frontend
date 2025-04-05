import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link to="/">
            <img src="../assets/images/logo.svg" alt="Logo" className="w-32" />
        </Link>
    );
}

export default Logo;