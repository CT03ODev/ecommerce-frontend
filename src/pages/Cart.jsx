import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useCartStore from "../stores/cartStore";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";
import toast from "react-hot-toast";
import { request } from "../services/request";
import PageHelmet from '../components/common/PageHelmet';

function Cart() {
    const { items, removeItem, updateQuantity, getTotal } = useCartStore();
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Get list of product IDs from items
                const productIds = [...new Set(items.map(item => item.product.id))];
                
                if (productIds.length === 0) {
                    setLoading(false);
                    return;
                }

                // Call API to get product information
                const response = await request({
                    url: '/products',
                    method: 'get',
                    params: {
                        ids: productIds.join(',')
                    }
                });

                // Convert array to object with product_id as key
                const productsMap = response.data.reduce((acc, product) => {
                    acc[product.id] = product;
                    return acc;
                }, {});

                setProducts(productsMap);
            } catch (error) {
                toast.error('Failed to load product information');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [items]);

    const handleQuantityChange = (productId, quantity, variantId = null) => {
        if (quantity < 1) return;
        
        // Check stock quantity from latest API data
        const product = products[productId];
        if (!product) return;

        const variant = variantId 
            ? product.variants.find(v => v.id === variantId)
            : null;

        const stockQuantity = variant?.stock_quantity || 0;

        if (quantity > stockQuantity) {
            toast.error('Quantity exceeds available stock');
            return;
        }

        updateQuantity(productId, quantity, variantId);
    };

    if (loading) {
        return <div className="container py-8">
            <p className="text-center">Loading cart information...</p>
        </div>;
    }

    return (
        <div className="container py-8">
            <h2 className="text-2xl font-medium mb-6">Shopping Cart</h2>
            {items.length > 0 ? (
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-3/4">
                        {items.map((item) => {
                            const product = products[item.product.id];
                            if (!product) return null;

                            // Find latest variant from API
                            const updatedVariant = item.variant 
                                ? product.variants.find(v => v.id === item.variant.id)
                                : null;

                            return (
                                <CartItem
                                    key={`${item.product.id}-${item.variant?.id}`}
                                    item={{
                                        ...item,
                                        product,
                                        variant: updatedVariant
                                    }}
                                    onQuantityChange={handleQuantityChange}
                                    onRemove={removeItem}
                                />
                            );
                        })}
                    </div>
                    <div className="lg:w-1/4">
                        <CartSummary total={getTotal()} />
                    </div>
                </div>
            ) : (
                <EmptyCart />
            )}
        </div>
    );
}

export default Cart;