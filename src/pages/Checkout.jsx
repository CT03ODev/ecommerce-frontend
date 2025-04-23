import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../stores/cartStore";
import { request, requestWithAuth } from "../services/request";
import toast from "react-hot-toast";
import { addressService } from "../services/addressService";
import PageHelmet from '../components/common/PageHelmet';

function Checkout() {
    const navigate = useNavigate();
    const { items, getTotal, clearCart } = useCartStore();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [orderNote, setOrderNote] = useState("");

    useEffect(() => {
        // Redirect to cart if no items
        if (items.length === 0) {
            navigate('/cart');
            return;
        }

        // Fetch user's addresses
        fetchAddresses();
    }, [items, navigate]);

    const fetchAddresses = async () => {
        try {
            const address = await addressService.getAddresses();
            setAddresses(address);
            
            // Set default address if available
            const defaultAddress = address.find(addr => addr.is_default);
            if (defaultAddress) {
                setSelectedAddress(defaultAddress.id);
            }
        } catch (error) {
            toast.error('Failed to load addresses');
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.error('Please select a shipping address');
            return;
        }

        setLoading(true);
        try {
            // Prepare order items
            const variantIds = [];
            const quantities = [];
            items.forEach(item => {
                variantIds.push(item.variant ? item.variant.id : null);
                quantities.push(item.quantity);
            });

            // Calculate amounts
            const subtotal = getTotal();
            const taxAmount = subtotal * 0.05; // 5% tax
            const shippingAmount = 10; // Fixed shipping fee
            const totalAmount = subtotal + taxAmount + shippingAmount;

            // Create order
            const response = await requestWithAuth({
                url: '/orders',
                method: 'post',
                data: {
                    user_id: null, // Will be set by backend from auth token
                    address_id: selectedAddress,
                    variant_ids: variantIds,
                    quantities: quantities,
                    total_amount: totalAmount,
                    tax_amount: taxAmount,
                    shipping_amount: shippingAmount,
                    notes: orderNote
                }
            });

            // Clear cart after successful order
            clearCart();
            
            // Redirect to order confirmation
            navigate(`/account/orders/${response.data.id}`);
            toast.success('Order placed successfully!');
        } catch (error) {
            const message = error.response?.data?.error || 'Failed to place order';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-8">
            <h2 className="text-2xl font-medium mb-6">Checkout</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {/* Shipping Address Section */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
                        <div className="space-y-4">
                            {addresses.map(address => (
                                <div key={address.id} className="flex items-start">
                                    <input
                                        type="radio"
                                        name="address"
                                        value={address.id}
                                        checked={selectedAddress === address.id}
                                        onChange={() => setSelectedAddress(address.id)}
                                        className="mt-1"
                                    />
                                    <div className="ml-3">
                                        <p className="font-medium">{address.name}</p>
                                        <p>{address.phone}</p>
                                        <p>{address.address}</p>
                                        <p>{address.city}, {address.state} {address.postal_code}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Note */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium mb-4">Order Note</h3>
                        <textarea
                            value={orderNote}
                            onChange={(e) => setOrderNote(e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                            placeholder="Add any special instructions for your order"
                        />
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${getTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (5%)</span>
                                <span>${(getTotal() * 0.05).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>$10.00</span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>${(getTotal() * 1.05 + 10).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <button
                            onClick={handlePlaceOrder}
                            disabled={loading || !selectedAddress}
                            className="w-full mt-6 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
