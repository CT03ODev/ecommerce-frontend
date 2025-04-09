import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/request";
import ProductCategoryCard from "../product/ProductCategoryCard";

function ProductCategoryList({ title }) {
    const { data: categories, isLoading, isError } = useQuery({
        queryKey: ["productCategories"],
        queryFn: async () => {
            const response = await request({
                url: "/product-categories",
                method: "get",
            });
            return response;
        },
    });

    return (
        <div>
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                {title}
            </h2>
            <div className="grid grid-cols-3 gap-3">
                {isLoading && <p className="text-gray-600">Loading categories...</p>}
                {isError && <p className="text-red-600">Failed to load categories</p>}
                {categories &&
                    categories.map((category) => (
                        <ProductCategoryCard
                            key={category.id}
                            category={category}
                        />
                    ))}
            </div>
        </div>
    );
}

export default ProductCategoryList;