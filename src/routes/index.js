import MainLayout from "../components/layouts/MainLayout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product";
import Register from "../pages/Register";
import Shop from "../pages/Shop";

const routes = [
    {
        path: '/',
        page: Home,
        layout: MainLayout,
    },
    {
        path: '/about',
        page: About,
        layout: MainLayout,
    },
    {
        path: '/contact',
        page: Contact,
        layout: MainLayout,
    },
    {
        path: '/register',
        page: Register,
        layout: MainLayout,
        authRedirect: true,
    },
    {
        path: '/login',
        page: Login,
        layout: MainLayout,
        authRedirect: true,
    },
    {
        path: '/shop',
        page: Shop,
        layout: MainLayout,
    },
    {
        path: '/product/:productSlug',
        page: Product,
        layout: MainLayout,
    },
    {
        path: '/*',
        page: NotFound,
        layout: MainLayout
    },
];

export default routes;