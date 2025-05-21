import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountLayout from "../../components/account/AccountLayout";
import { orderService } from "../../services/orderService";
import PageHelmet from '../../components/common/PageHelmet';

function ShippedOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await orderService.getOrders('shipped');
                setOrders(response);
            } catch (err) {
                setError('Error loading orders');
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return (
        <AccountLayout title="Shipped Orders">
            <div className="text-center">Loading...</div>
        </AccountLayout>
    );

    if (error) return (
        <AccountLayout title="Shipped Orders">
            <div className="text-red-500">{error}</div>
        </AccountLayout>
    );

    return (
        <AccountLayout title="Shipped Orders">
            <div className="bg-white rounded-lg shadow">
                {orders.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        You have no shipped orders
                    </div>
                ) : (
                    <div className="divide-y">
                        {orders.map((order) => (
                            <div key={order.id} className="p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">Order #{order.order_number}</p>
                                        <p className="text-sm text-gray-600">
                                            Order Date: {new Date(order.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <Link 
                                        to={`/account/orders/${order.id}`}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AccountLayout>
    );
}

export default ShippedOrders;