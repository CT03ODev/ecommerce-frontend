import ProductCategoryCard from "../product/ProductCategoryCard";

function ProductCategoryList({ title }) {
    return (
        <div>
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                { title }
            </h2>
            <div className="grid grid-cols-3 gap-3">
                <ProductCategoryCard />
            </div>
        </div>
    );
}

export default ProductCategoryList;