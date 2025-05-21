import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccountLayout from "../../components/account/AccountLayout";
import { orderService } from "../../services/orderService";
import PageHelmet from '../../components/common/PageHelmet';

function OrderDetail() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await orderService.getOrder(orderId);
                setOrder(response);
            } catch (err) {
                setError('Unable to load order details');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) return (
        <AccountLayout title="Order Details">
            <div className="text-center">Loading...</div>
        </AccountLayout>
    );

    if (error) return (
        <AccountLayout title="Order Details">
            <div className="text-red-500">{error}</div>
        </AccountLayout>
    );

    if (!order) return (
        <AccountLayout title="Order Details">
            <div className="text-center">Order not found</div>
        </AccountLayout>
    );

    return (
        <AccountLayout title="Order Details">
            <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Order Information</h3>
                        <p>Order Number: {order.order_number}</p>
                        <p>Order Date: {new Date(order.created_at).toLocaleDateString()}</p>
                        <p>Status: <span className={`font-semibold ${
                            order.status === 'completed' ? 'text-green-600' :
                            order.status === 'cancelled' ? 'text-red-600' :
                            'text-yellow-600'
                        }`}>{order.status}</span></p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                        <p>{order.address?.name}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Products</h3>
                    <div className="space-y-4">
                        {order.order_items?.map((item) => (
                            <div key={item.id} className="flex items-center border-b pb-4">
                                <div className="w-20 h-20 mr-4">
                                    <img
                                        src={item.product?.thumbnail_url || '/placeholder-image.jpg'}
                                        alt={item.product?.name}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">{item.product?.name}</p>
                                    <p className="text-sm text-gray-600">
                                        Size: {item.product_variant?.size}, 
                                        Color: {item.product_variant?.color}
                                    </p>
                                    <p className="text-sm">Quantity: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">${item.unit_price}</p>
                                    <p className="text-sm text-gray-600">
                                        Total: ${item.quantity * item.unit_price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Subtotal:</span>
                        <span>${order.total_amount - order.tax_amount - order.shipping_amount}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="font-semibold">Shipping Fee:</span>
                        <span>${order.shipping_amount}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="font-semibold">Tax:</span>
                        <span>${order.tax_amount}</span>
                    </div>
                    {order.discount_amount > 0 && (
                        <div className="flex justify-between items-center mt-2 text-green-600">
                            <span className="font-semibold">Discount:</span>
                            <span>-${order.discount_amount}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center mt-4 text-xl font-bold">
                        <span>Total:</span>
                        <span>${order.total_amount}</span>
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
}

export default OrderDetail;