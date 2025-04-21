import AccountLayout from "../../components/account/AccountLayout";

function Cancellations() {
    const cancellations = [
        {
            id: 1,
            orderNumber: "ORD-001",
            date: "2024-03-19",
            reason: "Changed mind",
            status: "Approved"
        },
        // Add more cancellations as needed
    ];

    return (
        <AccountLayout title="My Cancellations">
            <div className="bg-white rounded-lg shadow">
                {cancellations.map(cancellation => (
                    <div key={cancellation.id} className="border-b p-4 last:border-b-0">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">Order #{cancellation.orderNumber}</p>
                                <p className="text-sm text-gray-600">{cancellation.date}</p>
                                <p className="text-sm text-gray-500">Reason: {cancellation.reason}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-blue-600">{cancellation.status}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AccountLayout>
    );
}

export default Cancellations;