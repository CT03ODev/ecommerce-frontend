import { use, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/product/ProductCard";
import Sidebar from "../components/shop/Sidebar";
import { request } from "../services/request";
import { useSearchParams } from "react-router-dom";

function Shop() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState("latest"); // State for sorting
    const [pageParams, setPageParams] = useState({ current_page: 1, last_page: 1 }); // State for pagination
    const [sortFilter, setSortFilter] = useState({}); // State for sorting
    const [filters, setFilters] = useState({}); // State for filters (e.g., categories, brands)

    const { data: products, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["products", sortFilter, filters, pageParams.current_page],
        queryFn: async () => {
            const response = await request({
                url: "/products",
                method: "get",
                params: {
                    ...sortFilter,
                    ...filters,
                    page: pageParams.current_page, // Pass the current page as a query parameter
                },
            });
            const { data, current_page, last_page } = response;
            setSearchParams({
                ...sortFilter,
                ...filters,
                page: pageParams.current_page, // Pass the current page as a query parameter
            });
            setPageParams((prev) => ({
                ...prev,
                current_page,
                last_page,
            }));
            return data;
        },
    });

    useEffect(() => {
        setFilters((prev) => {
            const newFilters = Object.fromEntries(searchParams.entries());
            return { ...prev, ...newFilters };
        });
        setPageParams({ current_page: parseInt(searchParams.get("page")) || 1 });
    }, []);

    useEffect(() => {
        switch (sort) {
            case "price-low-to-high":
                setSortFilter({ sort: 'price', sort_type: "asc" });
                break;
            case "price-high-to-low":
                setSortFilter({ sort: 'price', sort_type: "desc" });
                break;
            case "latest":
                setSortFilter({ sort: 'created_at', sort_type: "desc" });
                break;
            default:
                setSortFilter({});
        }
    }, [sort]);

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handlePageChange = (newPage) => {
        setPageParams((prev) => ({
            ...prev,
            current_page: newPage,
        }));
    };

    return (
        <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
            <Sidebar filters={filters} onFilterChange={handleFilterChange} />
            <div className="col-span-3">
                <div className="flex items-center mb-4">
                    <select
                        name="sort"
                        id="sort"
                        value={sort}
                        onChange={handleSortChange}
                        className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
                    >
                        <option value="latest">Latest product</option>
                        <option value="price-low-to-high">Price low to high</option>
                        <option value="price-high-to-low">Price high to low</option>
                    </select>
                </div>
                <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                    {isLoading && <p className="col-span-full text-center text-gray-600">Loading products...</p>}
                    {isError && <p className="col-span-full text-center text-red-600">Failed to load products</p>}
                    {isSuccess && !products.length && <p className="col-span-full text-center text-gray-600">No product found!</p>}
                    {products &&
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </div>
                <div className="mt-6 flex justify-center items-center space-x-2">
                    <button
                        onClick={() => handlePageChange(pageParams.current_page - 1)}
                        disabled={pageParams.current_page === 1}
                        className={`px-4 py-2 bg-primary text-white rounded ${
                            pageParams.current_page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-dark"
                        }`}
                    >
                        Previous
                    </button>
                    <span className="text-gray-600">
                        Page {pageParams.current_page} of {pageParams.last_page}
                    </span>
                    <button
                        onClick={() => handlePageChange(pageParams.current_page + 1)}
                        disabled={pageParams.current_page === pageParams.last_page}
                        className={`px-4 py-2 bg-primary text-white rounded ${
                            pageParams.current_page === pageParams.last_page
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-primary-dark"
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Shop;