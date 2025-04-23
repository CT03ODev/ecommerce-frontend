import { Link, useLocation } from 'react-router-dom';

const AccountMenu = () => {
    const location = useLocation();
    
    const menuItems = [
        {
            title: 'Manage Account',
            items: [
                { label: 'Profile Information', path: '/account' },
                { label: 'Manage Addresses', path: '/account/addresses' },
            ]
        },
        {
            title: 'My Order History',
            items: [
                { label: 'My Orders', path: '/account/orders' },
                // { label: 'My Returns', path: '/account/returns' },
                // { label: 'My Cancellations', path: '/account/cancellations' },
                { label: 'My Reviews', path: '/account/reviews' },
            ]
        },
        {
            title: 'Payment Methods',
            items: [
                { label: 'Payment Methods', path: '/account/payment-methods' },
                { label: 'Voucher', path: '/account/vouchers' },
            ]
        },
        {
            title: 'My Wishlist',
            items: [
                { label: 'My Wishlist', path: '/account/wishlist' },
            ]
        },
    ];

    return (
        <div className="space-y-6">
            {menuItems.map((section, index) => (
                <div key={index}>
                    <h3 className="font-semibold mb-2">{section.title}</h3>
                    <ul className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                                <Link
                                    to={item.path}
                                    className={`block text-sm ${location.pathname === item.path ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default AccountMenu;