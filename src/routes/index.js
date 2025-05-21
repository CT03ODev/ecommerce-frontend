import MainLayout from "../components/layouts/MainLayout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product";
import Register from "../pages/Register";
import Shop from "../pages/Shop";
import Account from "../pages/Account";
import OrderHistory from "../pages/account/OrderHistory";
import OrderDetail from "../pages/account/OrderDetail";
import Returns from "../pages/account/Returns";
import Cancellations from "../pages/account/Cancellations";
import Reviews from "../pages/account/Reviews";
import PaymentMethods from "../pages/account/PaymentMethods";
import Vouchers from "../pages/account/Vouchers";
import Wishlist from "../pages/account/Wishlist";
import ManageAddresses from "../pages/account/ManageAddresses";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import CheckoutSuccess from "../pages/checkout/Success";
import CheckoutFailed from "../pages/checkout/Failed";
import PendingOrders from "../pages/account/PendingOrders";
import ProcessingOrders from "../pages/account/ProcessingOrders";
import ShippedOrders from "../pages/account/ShippedOrders";
import DeliveredOrders from "../pages/account/DeliveredOrders";
import CancelledOrders from "../pages/account/CancelledOrders";

const routes = [
    {
        path: '/',
        page: Home,
        layout: MainLayout,
    },
    {
        path: '/account',
        page: Account,
        layout: MainLayout,
        isPrivate: true,
    },
    {
        path: '/account/orders',
        page: OrderHistory,
        layout: MainLayout,
        isPrivate: true,
    },
    {
        path: '/account/orders/:orderId',
        page: OrderDetail,
        layout: MainLayout,
        isPrivate: true,
    },
    {
        path: '/account/returns',
        page: Returns,
        layout: MainLayout,
        isPrivate: true,
    },
    {
        path: '/account/cancellations',
        page: Cancellations,
        layout: MainLayout,
        isPrivate: true,
    },
    {
        path: '/account/reviews',
        page: Reviews,
        layout: MainLayout,
        isPrivate: true,
    },
    {
        path: '/account/payment-methods',
        page: PaymentMethods,
        layout: MainLayout,
        isPrivate: true,
    },
    {
        path: '/account/vouchers',
        page: Vouchers,
        layout: MainLayout,
        isPrivate: true,
    },
    {
        path: '/account/wishlist',
        page: Wishlist,
        layout: MainLayout,
        isPrivate: true,
    },
    {
        path: '/account/addresses',
        page: ManageAddresses,
        layout: MainLayout,
        isPrivate: true,
    },
    {
        path: '/account/orders/pending',
        page: PendingOrders,
        layout: MainLayout,
        isPrivate: true,
    },
    {
        path: '/account/orders/processing',
        page: ProcessingOrders,
        layout: MainLayout,
        isPrivate: true,
    },
    {
        path: '/account/orders/shipped',
        page: ShippedOrders,
        layout: MainLayout,
        isPrivate: true,
    },
    {
        path: '/account/orders/delivered',
        page: DeliveredOrders,
        layout: MainLayout,
        isPrivate: true,
    },
    {
        path: '/account/orders/cancelled',
        page: CancelledOrders,
        layout: MainLayout,
        isPrivate: true,
    },
    {
        path: '/about',
        page: About,
        layout: MainLayout,
    },
    {
        path: '/cart',
        page: Cart,
        layout: MainLayout,
    },
    {
        path: '/checkout',
        page: Checkout,
        layout: MainLayout,
        isPrivate: true,
    },
    {
        path: '/checkout/success',
        page: CheckoutSuccess,
        layout: MainLayout,
        isPrivate: true,
    },
    {
        path: '/checkout/failed',
        page: CheckoutFailed,
        layout: MainLayout,
        isPrivate: true,
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
        layout: MainLayout,
    },
];

export default routes;