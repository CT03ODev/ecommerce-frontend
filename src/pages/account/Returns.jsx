import AccountLayout from "../../components/account/AccountLayout";

function Returns() {
    const returns = [
        {
            id: 1,
            orderNumber: "ORD-001",
            product: "Product Name",
            reason: "Wrong size",
            status: "Processing"
        },
        // Add more returns as needed
    ];

    return (
        <AccountLayout title="My Returns">
            <div className="bg-white rounded-lg shadow">
                {returns.map(returnItem => (
                    <div key={returnItem.id} className="border-b p-4 last:border-b-0">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">Order #{returnItem.orderNumber}</p>
                                <p className="text-sm text-gray-600">{returnItem.product}</p>
                                <p className="text-sm text-gray-500">Reason: {returnItem.reason}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-yellow-600">{returnItem.status}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AccountLayout>
    );
}

export default Returns;