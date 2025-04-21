import AccountLayout from "../../components/account/AccountLayout";

function Vouchers() {
    const vouchers = [
        {
            id: 1,
            code: "SAVE20",
            discount: "20%",
            validUntil: "2024-04-19",
            status: "Active"
        },
        // Add more vouchers as needed
    ];

    return (
        <AccountLayout title="My Vouchers">
            <div className="bg-white rounded-lg shadow">
                {vouchers.map(voucher => (
                    <div key={voucher.id} className="border-b p-4 last:border-b-0">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{voucher.code}</p>
                                <p className="text-sm text-gray-600">Save {voucher.discount}</p>
                                <p className="text-sm text-gray-500">Valid until: {voucher.validUntil}</p>
                            </div>
                            <div className="text-right">
                                <p className={`text-sm ${voucher.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                                    {voucher.status}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AccountLayout>
    );
}

export default Vouchers;