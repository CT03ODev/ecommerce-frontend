import { Link } from "react-router-dom";

function CartSummary({ total }) {
    const tax = total * 0.05;
    const shipping = 10;
    const finalTotal = total + tax + shipping;

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Cart Summary</h3>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$10.00</span>
                </div>
                <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${finalTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            
            <Link 
                to="/checkout"
                className="block w-full mt-6 bg-primary text-white text-center py-2 px-4 rounded hover:bg-primary-dark"
            >
                Proceed to Checkout
            </Link>
        </div>
    );
}

export default CartSummary;