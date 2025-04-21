import AccountLayout from "../../components/account/AccountLayout";

function Reviews() {
    const reviews = [
        {
            id: 1,
            productName: "Product Name",
            rating: 4,
            comment: "Great product, very satisfied!",
            date: "2024-03-19"
        },
        // Add more reviews as needed
    ];

    return (
        <AccountLayout title="My Reviews">
            <div className="bg-white rounded-lg shadow">
                {reviews.map(review => (
                    <div key={review.id} className="border-b p-4 last:border-b-0">
                        <div className="space-y-2">
                            <p className="font-semibold">{review.productName}</p>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, index) => (
                                    <span key={index} className={`text-xl ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                                ))}
                            </div>
                            <p className="text-sm text-gray-600">{review.comment}</p>
                            <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </AccountLayout>
    );
}

export default Reviews;