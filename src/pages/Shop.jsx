import ProductCard from "../components/product/ProductCard";
import Sidebar from "../components/shop/Sidebar";

function Shop() {
    const products = [
        { id: 1, name: "Guyer Chair", price: 45.0, oldPrice: 55.9, image: "../assets/images/products/product1.jpg", rating: 5, reviews: 150 },
        { id: 2, name: "Modern Sofa", price: 120.0, oldPrice: 150.0, image: "../assets/images/products/product2.jpg", rating: 4, reviews: 80 },
        // Add more products here...
    ];

    return (
        <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
            <Sidebar />
            <div className="col-span-3">
                <div className="flex items-center mb-4">
                    <select name="sort" id="sort" className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary">
                        <option value="">Default sorting</option>
                        <option value="price-low-to-high">Price low to high</option>
                        <option value="price-high-to-low">Price high to low</option>
                        <option value="latest">Latest product</option>
                    </select>
                </div>
                <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Shop;