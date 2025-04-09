import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/request";

function Sidebar({ filters, onFilterChange }) {
    const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useQuery({
        queryKey: ["productCategories"],
        queryFn: async () => {
            const response = await request({
                url: "/product-categories",
                method: "get",
            });
            return response;
        },
    });

    const { data: brands, isLoading: isLoadingBrands, isError: isErrorBrands } = useQuery({
        queryKey: ["brands"],
        queryFn: async () => {
            const response = await request({
                url: "/brands",
                method: "get",
            });
            return response;
        },
    });

    const handleCategoryChange = (slug) => {
        onFilterChange((prevFilter) => ({ ...prevFilter, category: slug }));
    };

    const handleBrandChange = (slug) => {
        onFilterChange((prevFilter) => ({ ...prevFilter, brand: slug }));
    };

    const clearFilters = () => {
        onFilterChange({});
    };

    return (
        <div className="col-span-1 bg-white px-4 py-6 shadow rounded overflow-hidden">
            <div className="divide-y divide-gray-200 space-y-5">
                <div>
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Categories</h3>
                    <div className="space-y-2">
                        {isLoadingCategories && <p className="text-gray-600">Loading categories...</p>}
                        {isErrorCategories && <p className="text-red-600">Failed to load categories</p>}
                        {categories &&
                            categories.map((category) => (
                                <div key={category.id} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="category"
                                        id={`cat-${category.id}`}
                                        checked={filters.category === category.slug}
                                        onChange={() => handleCategoryChange(category.slug)}
                                        className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                    />
                                    <label
                                        htmlFor={`cat-${category.id}`}
                                        className="text-gray-600 ml-3 cursor-pointer"
                                    >
                                        {category.name}
                                    </label>
                                </div>
                            ))}
                    </div>
                </div>

                <div className="pt-4">
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Brands</h3>
                    <div className="space-y-2">
                        {isLoadingBrands && <p className="text-gray-600">Loading brands...</p>}
                        {isErrorBrands && <p className="text-red-600">Failed to load brands</p>}
                        {brands &&
                            brands.map((brand) => (
                                <div key={brand.id} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="brand"
                                        id={`brand-${brand.id}`}
                                        checked={filters.brand === brand.slug}
                                        onChange={() => handleBrandChange(brand.slug)}
                                        className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                    />
                                    <label
                                        htmlFor={`brand-${brand.id}`}
                                        className="text-gray-600 ml-3 cursor-pointer"
                                    >
                                        {brand.name}
                                    </label>
                                </div>
                            ))}
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        onClick={clearFilters}
                        className="w-full py-2 px-4 text-center text-white bg-red-500 hover:bg-red-600 rounded transition"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;