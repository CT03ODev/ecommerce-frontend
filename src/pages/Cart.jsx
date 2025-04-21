import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useCartStore from "../stores/cartStore";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";
import toast from "react-hot-toast";

function Cart() {
    const { items, removeItem, updateQuantity, getTotal } = useCartStore();

    const handleQuantityChange = (productId, quantity, variantId = null) => {
        if (quantity < 1) return;
        updateQuantity(productId, quantity, variantId);
    };

    return (
        <div className="container py-8">
            <h2 className="text-2xl font-medium mb-6">Shopping Cart</h2>
            {items.length > 0 ? (
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-3/4">
                        {items.map((item) => (
                            <CartItem
                                key={`${item.product.id}-${item.variant?.id}`}
                                item={item}
                                onQuantityChange={handleQuantityChange}
                                onRemove={removeItem}
                            />
                        ))}
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