import { useEffect, useState } from "react";
import AccountLayout from "../../components/account/AccountLayout";
import { requestWithAuth } from "../../services/request";
import PageHelmet from '../../components/common/PageHelmet';

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await requestWithAuth({
                    url: '/orders',
                    method: 'GET',
                });
                setOrders(response);
            } catch (err) {
                setError('Error fetching orders');
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return (
        <AccountLayout title="My Orders">
            <div className="text-center">Loading...</div>
        </AccountLayout>
    );

    if (error) return (
        <AccountLayout title="My Orders">
            <div className="text-red-500">{error}</div>
        </AccountLayout>
    );

    return (
        <AccountLayout title="My Orders">
            <div className="bg-white rounded-lg shadow">
                {orders.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        You have no orders yet
                    </div>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className="border-b p-4 last:border-b-0">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">Order #{order.order_number}</p>
                                    <p className="text-sm text-gray-600">
                                        {new Date(order.created_at).toLocaleDateString('en-US')}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">${order.total_amount}</p>
                                    <p className={`text-sm ${
                                        order.status === 'delivered' ? 'text-green-600' :
                                        order.status === 'cancelled' ? 'text-red-600' :
                                        'text-blue-600'
                                    }`}>
                                        {order.status === 'pending' ? 'Pending' :
                                         order.status === 'processing' ? 'Processing' :
                                         order.status === 'shipped' ? 'Shipped' :
                                         order.status === 'delivered' ? 'Delivered' :
                                         'Cancelled'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </AccountLayout>
    );
}

export default OrderHistory;