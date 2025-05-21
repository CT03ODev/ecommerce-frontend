import { Link, useLocation } from 'react-router-dom';

const AccountMenu = () => {
    const location = useLocation();
    
    const menuItems = [
        {
            title: 'Account Management',
            items: [
                { label: 'Personal Information', path: '/account' },
                { label: 'Address Management', path: '/account/addresses' },
            ]
        },
        {
            title: 'My Orders',
            items: [
                { label: 'Pending', path: '/account/orders/pending' },
                { label: 'Processing', path: '/account/orders/processing' },
                { label: 'Shipped', path: '/account/orders/shipped' },
                { label: 'Delivered', path: '/account/orders/delivered' },
                { label: 'Cancelled', path: '/account/orders/cancelled' },
            ]
        },
        // {
        //     title: 'My Wishlist',
        //     items: [
        //         { label: 'My Wishlist', path: '/account/wishlist' },
        //     ]
        // },
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