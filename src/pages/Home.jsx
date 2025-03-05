import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import SaleBanner from "../components/sections/SaleBanner";
import ProductList from "../components/sections/ProductList";
import ProductCategoryList from "../components/sections/ProductCategoryList";

function Home() {
    return (
        <>
            <Hero />
            <div className="container mt-32 pb-16 space-y-32" >
                <Services />
            
                <ProductCategoryList title="shop by category" />
            
                <ProductList title="top new arrival" />
                <ProductList title="recomended for you" />
            
                <SaleBanner />
            </div>
        </>
    );
}

export default Home;