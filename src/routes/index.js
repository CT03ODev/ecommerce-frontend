import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const routes = [
    {
        path: '/',
        page: Home,
        layout: MainLayout
    },
    {
        path: '/register',
        page: Register,
        layout: MainLayout
    },
    {
        path: '/login',
        page: Login,
        layout: MainLayout
    },
];

export default routes;