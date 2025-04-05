import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBagShopping, faUser } from "@fortawesome/free-solid-svg-icons";

function UserActions() {
    return (
        <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="text-center text-gray-700 hover:text-primary transition relative">
                <FontAwesomeIcon icon={faHeart} className="text-2xl" />
                <div className="text-xs leading-3">Wishlist</div>
                <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                    8
                </div>
            </Link>
            <Link to="/cart" className="text-center text-gray-700 hover:text-primary transition relative">
                <FontAwesomeIcon icon={faBagShopping} className="text-2xl" />
                <div className="text-xs leading-3">Cart</div>
                <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                    2
                </div>
            </Link>
            <Link to="/account" className="text-center text-gray-700 hover:text-primary transition relative">
                <FontAwesomeIcon icon={faUser} className="text-2xl" />
                <div className="text-xs leading-3">Account</div>
            </Link>
        </div>
    );
}

export default UserActions;