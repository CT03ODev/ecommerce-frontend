import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/request";

function Sidebar() {
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
        <div className="col-span-1 bg-white px-4 py-6 shadow rounded overflow-hidden">
            <div className="divide-y divide-gray-200 space-y-5">
                <div>
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Categories</h3>
                    <div className="space-y-2">
                        {isLoading && <p className="text-gray-600">Loading categories...</p>}
                        {isError && <p className="text-red-600">Failed to load categories</p>}
                        {categories &&
                            categories.map((category) => (
                                <div key={category.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name={`cat-${category.id}`}
                                        id={`cat-${category.id}`}
                                        className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                    />
                                    <label
                                        htmlFor={`cat-${category.id}`}
                                        className="text-gray-600 ml-3 cursor-pointer"
                                    >
                                        {category.name}
                                    </label>
                                    {/* <div className="ml-auto text-gray-600 text-sm">({category.productCount})</div> */}
                                </div>
                            ))}
                    </div>
                </div>
                <div className="pt-4">
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Brands</h3>
                    <div className="space-y-2">
                        {/* Add brand filters here if needed */}
                        <p className="text-gray-600">Brand filters coming soon...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;