import { Link } from "react-router-dom";

function CartSummary({ total }) {
    return (
        <div className="border border-gray-200 rounded p-4">
            <h4 className="text-lg font-medium mb-4">Order Summary</h4>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <Link
                to="/checkout"
                className="block w-full text-center bg-primary text-white px-4 py-2 font-medium rounded-md mt-4"
            >
                Proceed to Checkout
            </Link>
        </div>
    );
}

export default CartSummary;