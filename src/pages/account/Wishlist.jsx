import AccountLayout from "../../components/account/AccountLayout";

function Wishlist() {
    const wishlistItems = [
        {
            id: 1,
            name: "Product Name",
            price: 99.99,
            image: "/path-to-image.jpg",
            inStock: true
        },
        // Add more wishlist items as needed
    ];

    return (
        <AccountLayout title="My Wishlist">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlistItems.map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow p-4">
                        <div className="aspect-w-1 aspect-h-1 mb-4">
                            <img src={item.image} alt={item.name} className="object-cover rounded" />
                        </div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-lg text-red-600">${item.price}</p>
                        <p className={`text-sm ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                        </p>
                        <div className="mt-4 space-x-2">
                            <button className="bg-red-600 text-white px-4 py-2 rounded">
                                Add to Cart
                            </button>
                            <button className="text-red-600 px-4 py-2">
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </AccountLayout>
    );
}

export default Wishlist;