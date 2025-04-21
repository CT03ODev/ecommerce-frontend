import { Link } from "react-router-dom";

function EmptyCart() {
    return (
        <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link
                to="/"
                className="bg-primary text-white px-4 py-2 rounded-md inline-block"
            >
                Continue Shopping
            </Link>
        </div>
    );
}

export default EmptyCart;