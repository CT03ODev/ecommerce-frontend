import { Link } from "react-router-dom";

function NavLinks() {
    return (
        <div className="flex items-center space-x-6 capitalize">
            <Link to="/" className="text-gray-200 hover:text-white transition">Home</Link>
            <Link to="/shop" className="text-gray-200 hover:text-white transition">Shop</Link>
            <Link to="/about" className="text-gray-200 hover:text-white transition">About us</Link>
            <Link to="/contact" className="text-gray-200 hover:text-white transition">Contact us</Link>
        </div>
    );
}

export default NavLinks;