import ProductCard from "../product/ProductCard";

function ProductList({ title, products }) {
    return (
        <div>
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                { title }
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <ProductCard />
                
            </div>
        </div>
    );
}

export default ProductList;