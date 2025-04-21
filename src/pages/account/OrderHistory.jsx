import AccountLayout from "../../components/account/AccountLayout";

function OrderHistory() {
    const orders = [
        {
            id: 1,
            orderNumber: "ORD-001",
            date: "2024-03-19",
            total: 299.99,
            status: "Delivered"
        },
        // Add more orders as needed
    ];

    return (
        <AccountLayout title="My Orders">
            <div className="bg-white rounded-lg shadow">
                {orders.map(order => (
                    <div key={order.id} className="border-b p-4 last:border-b-0">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">Order #{order.orderNumber}</p>
                                <p className="text-sm text-gray-600">{order.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">${order.total}</p>
                                <p className="text-sm text-green-600">{order.status}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AccountLayout>
    );
}

export default OrderHistory;