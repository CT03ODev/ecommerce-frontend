import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Kiểm tra nếu đang ở trang /shop thì không hiển thị thanh search
    if (location.pathname === '/shop') {
        return null;
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/shop?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="w-full max-w-xl relative flex">
            <span className="absolute left-4 top-3 text-lg text-gray-400">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <input
                type="text"
                name="search"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
                placeholder="Search..."
            />
            <button 
                type="submit"
                className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition"
            >
                Search
            </button>
        </form>
    );
}

export default SearchBar;