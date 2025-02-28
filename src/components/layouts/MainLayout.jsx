import Footer from "./partials/Footer";
import Header from "./partials/Header";

function MainLayout({ children }) {
    return (
        <>
            <Header />
            <main>
                { children }
            </main>
            <Footer />
        </>
    );
}

export default MainLayout;