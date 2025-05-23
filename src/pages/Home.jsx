import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import SaleBanner from "../components/sections/SaleBanner";
import ProductList from "../components/sections/ProductList";
import ProductCategoryList from "../components/sections/ProductCategoryList";
import { useQuery } from "@tanstack/react-query";
import { request } from "../services/request";
import PageHelmet from '../components/common/PageHelmet';

function Home() {
    const { data: latestProducts, isLoading: isLoadingLatest, isError: isErrorLatest } = useQuery({
        queryKey: ["latestProducts"],
        queryFn: async () => {
            const response = await request({
                method: "get",
                url: "/products",
                params: {
                    sort: "created_at",
                    sort_type: "desc",
                    limit: 12,
                },
            });
            return response.data;
        },
    });

    const { data: highestPricedProducts, isLoading: isLoadingHighest, isError: isErrorHighest } = useQuery({
        queryKey: ["highestPricedProducts"],
        queryFn: async () => {
            const response = await request({
                method: "get",
                url: "/products",
                params: {
                    sort: "price",
                    sort_type: "desc",
                    limit: 12,
                }
            });
            return response.data;
        },
    });

    return (
        <>
            <PageHelmet 
                title="Home"
                description="Discover high-quality products at the best prices"
            />
            <Hero />
            <div className="container mt-32 pb-16 space-y-32">
                <Services />
                <ProductCategoryList title="Shop by Category" />
                <ProductList
                    title="Top New Arrival"
                    products={latestProducts}
                    isLoading={isLoadingLatest}
                    isError={isErrorLatest}
                />
                <SaleBanner />
                <ProductList
                    title="Recommended for You"
                    products={highestPricedProducts}
                    isLoading={isLoadingHighest}
                    isError={isErrorHighest}
                />
            </div>
        </>
    );
}

export default Home;