import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../stores/cartStore";
import toast from "react-hot-toast";
import { addressService } from "../services/addressService";
import { orderService } from "../services/orderService";
import PageHelmet from '../components/common/PageHelmet';
import AddressModal from '../components/account/AddressModal';
import InputField from "../components/shared/InputField";
import AddressCard from "../components/account/AddressCard";

function Checkout() {
    const navigate = useNavigate();
    const { items, getTotal, clearCart } = useCartStore();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [orderNote, setOrderNote] = useState("");
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [voucherCode, setVoucherCode] = useState('');
    const [voucherError, setVoucherError] = useState('');
    const [appliedVoucher, setAppliedVoucher] = useState(null);

    const handleAddAddress = async (data) => {
        try {
            await addressService.createAddress(data);
            toast.success('Địa chỉ đã được thêm thành công');
            setIsAddressModalOpen(false);
            // Fetch lại danh sách địa chỉ
            await fetchAddresses();
        } catch (error) {
            toast.error('Có lỗi xảy ra khi thêm địa chỉ');
        }
    };

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
            const variantIds = [];
            const quantities = [];
            items.forEach(item => {
                variantIds.push(item.variant ? item.variant.id : null);
                quantities.push(item.quantity);
            });

            const orderData = {
                address_id: selectedAddress,
                variant_ids: variantIds,
                quantities: quantities,
                payment_method: paymentMethod,
                notes: orderNote
            };

            // Thêm voucher nếu có
            if (appliedVoucher) {
                orderData.voucher_code = appliedVoucher.code;
            }

            const response = await orderService.createOrder(orderData);

            if (response.payment_url) {
                window.location.href = response.payment_url;
            } else {
                clearCart();
                navigate(`/account/orders/${response.order.id}`);
                toast.success('Order placed successfully!');
            }
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.error || 'Failed to place order';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const calculateDiscount = () => {
        if (!appliedVoucher) return 0;

        const subtotal = getTotal();
        let discount = 0;

        if (appliedVoucher.discount_type === 'fixed') {
            discount = appliedVoucher.discount_value;
        } else {
            discount = (subtotal * appliedVoucher.discount_value) / 100;
            if (appliedVoucher.maximum_discount) {
                discount = Math.min(discount, appliedVoucher.maximum_discount);
            }
        }

        if (appliedVoucher.minimum_spend && subtotal < appliedVoucher.minimum_spend) {
            return 0;
        }

        return discount;
    };

    const calculateTotal = () => {
        const subtotal = getTotal();
        const discount = calculateDiscount();
        const tax = (subtotal - discount) * 0.05;
        const shipping = 10;
        return subtotal - discount + tax + shipping;
    };

    const handleApplyVoucher = async () => {
        if (!voucherCode.trim()) {
            setVoucherError('Please enter a voucher code');
            return;
        }

        try {
            const response = await orderService.validateVoucher(voucherCode);
            setAppliedVoucher(response.voucher);
            setVoucherError('');
            toast.success('Voucher applied successfully!');
        } catch (error) {
            setVoucherError(error.response?.data?.error || 'Invalid voucher code');
            setAppliedVoucher(null);
        }
    };

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setIsAddressModalOpen(true);
    };

    const handleDeleteAddress = async (addressId) => {
        try {
            await addressService.deleteAddress(addressId);
            toast.success('Address deleted successfully');
            await fetchAddresses();
        } catch (error) {
            toast.error('Failed to delete address');
        }
    };

    const handleAddressSubmit = async (data) => {
        try {
            if (editingAddress) {
                await addressService.updateAddress(editingAddress.id, data);
                toast.success('Address updated successfully');
            } else {
                await addressService.createAddress(data);
                toast.success('Address added successfully');
            }
            setIsAddressModalOpen(false);
            setEditingAddress(null);
            await fetchAddresses();
        } catch (error) {
            toast.error(editingAddress ? 'Failed to update address' : 'Failed to add address');
        }
    };

    return (
        <div className="container py-8">
            <PageHelmet title="Checkout" />
            <h2 className="text-2xl font-medium mb-6">Checkout</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {/* Shipping Address Section */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Shipping Address</h3>
                            <button
                                onClick={() => {
                                    setEditingAddress(null);
                                    setIsAddressModalOpen(true);
                                }}
                                className="text-primary hover:text-primary-dark text-sm font-medium"
                            >
                                + Add New Address
                            </button>
                        </div>
                        <div className="space-y-4">
                            {addresses.map(address => (
                                <div key={address.id} className="flex items-start space-x-3">
                                    <input
                                        type="radio"
                                        name="address"
                                        value={address.id}
                                        checked={selectedAddress === address.id}
                                        onChange={() => setSelectedAddress(address.id)}
                                        className="mt-6"
                                    />
                                    <div className="flex-1">
                                        <AddressCard
                                            address={address}
                                            onEdit={() => handleEditAddress(address)}
                                            onDelete={() => handleDeleteAddress(address.id)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Address Modal */}
                    {isAddressModalOpen && (
                        <AddressModal
                            address={editingAddress}
                            onSubmit={handleAddressSubmit}
                            onClose={() => {
                                setIsAddressModalOpen(false);
                                setEditingAddress(null);
                            }}
                            isLoading={false}
                        />
                    )}

                    {/* Payment Method Section */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="cod"
                                    name="payment_method"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mr-2"
                                />
                                <label htmlFor="cod" className="cursor-pointer">
                                    <span className="font-medium">Cash on Delivery (COD)</span>
                                    <p className="text-sm text-gray-500">Pay when you receive the package</p>
                                </label>
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="vnpay"
                                    name="payment_method"
                                    value="vnpay"
                                    checked={paymentMethod === 'vnpay'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mr-2"
                                />
                                <label htmlFor="vnpay" className="cursor-pointer">
                                    <span className="font-medium">VNPay</span>
                                    <p className="text-sm text-gray-500">Pay securely with VNPay</p>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Note */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium mb-4">Order Note</h3>
                        <InputField
                            label=""
                            id="orderNote"
                            type="textarea" 
                            placeholder="Additional notes for your order"
                            value={orderNote}
                            onChange={(e) => setOrderNote(e.target.value)}
                            register={() => ({})}
                        />
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                        
                        {/* Voucher Section */}
                        <div className="mb-4 pb-4 border-b">
                            <div className="flex items-center gap-2">
                                <InputField
                                    type="text"
                                    value={voucherCode}
                                    onChange={(e) => setVoucherCode(e.target.value)}
                                    placeholder="Enter voucher code"
                                    register={() => ({})}
                                />
                                <button
                                    onClick={handleApplyVoucher}
                                    disabled={!voucherCode.trim() || loading}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                >
                                    Apply
                                </button>
                            </div>
                            {voucherError && (
                                <p className="text-red-500 text-sm mt-1">{voucherError}</p>
                            )}
                            {appliedVoucher && (
                                <div className="mt-2 p-2 bg-green-50 text-green-700 rounded-md text-sm">
                                    <p>Voucher applied: {appliedVoucher.code}</p>
                                    <p>Discount: {appliedVoucher.discount_type === 'fixed' ? 
                                        `$${appliedVoucher.discount_value}` : 
                                        `${appliedVoucher.discount_value}%`}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${getTotal().toFixed(2)}</span>
                            </div>
                            {appliedVoucher && (
                                <div className="flex justify-between text-green-600">
                                    <span>Discount</span>
                                    <span>-${calculateDiscount().toFixed(2)}</span>
                                </div>
                            )}
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
                                    <span>${calculateTotal().toFixed(2)}</span>
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


    
