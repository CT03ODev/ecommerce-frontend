import AccountLayout from "../../components/account/AccountLayout";

function PaymentMethods() {
    const paymentMethods = [
        {
            id: 1,
            type: "Credit Card",
            number: "**** **** **** 1234",
            expiry: "12/25"
        },
        // Add more payment methods as needed
    ];

    return (
        <AccountLayout title="Payment Methods">
            <div className="bg-white rounded-lg shadow">
                {paymentMethods.map(method => (
                    <div key={method.id} className="border-b p-4 last:border-b-0">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{method.type}</p>
                                <p className="text-sm text-gray-600">{method.number}</p>
                                <p className="text-sm text-gray-500">Expires: {method.expiry}</p>
                            </div>
                            <button className="text-red-500 text-sm">Remove</button>
                        </div>
                    </div>
                ))}
                <div className="p-4">
                    <button className="text-blue-600">+ Add New Payment Method</button>
                </div>
            </div>
        </AccountLayout>
    );
}

export default PaymentMethods;