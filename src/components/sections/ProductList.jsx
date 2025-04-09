import ProductCard from "../product/ProductCard";

function ProductList({ title, products = [], isLoading, isError }) {
    return (
        <div>
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">{title}</h2>
            <div className="grid grid-cols-4 gap-6">
                {isLoading && <p className="text-gray-600">Loading products...</p>}
                {isError && <p className="text-red-600">Failed to load products</p>}
                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </div>
    );
}

export default ProductList;