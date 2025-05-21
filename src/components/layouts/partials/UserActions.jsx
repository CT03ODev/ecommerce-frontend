import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBagShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import useCartStore from "../../../stores/cartStore";

function UserActions() {
    const { items } = useCartStore();
    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="flex items-center space-x-4">
            {/* <Link to="/account/wishlist" className="text-center text-gray-700 hover:text-primary transition relative">
                <FontAwesomeIcon icon={faHeart} className="text-2xl" />
                <div className="text-xs leading-3">Wishlist</div>
                <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                    8
                </div>
            </Link> */}
            <Link to="/cart" className="text-center text-gray-700 hover:text-primary transition relative">
                <FontAwesomeIcon icon={faBagShopping} className="text-2xl" />
                <div className="text-xs leading-3">Cart</div>
                {cartCount > 0 && (
                    <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                        {cartCount}
                    </div>
                )}
            </Link>
            <Link to="/account" className="text-center text-gray-700 hover:text-primary transition relative">
                <FontAwesomeIcon icon={faUser} className="text-2xl" />
                <div className="text-xs leading-3">Account</div>
            </Link>
        </div>
    );
}

export default UserActions;