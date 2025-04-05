import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";

const routes = [
    {
        path: '/',
        page: Home,
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
        path: '/*',
        page: NotFound,
        layout: MainLayout
    },
];

export default routes;