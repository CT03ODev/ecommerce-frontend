import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function CartItem({ item, onQuantityChange, onRemove }) {
    return (
        <div className="flex items-center gap-6 p-4 border border-gray-200 rounded mb-4">
            <div className="w-28">
                <img src={item.product.thumbnail_url} alt={item.product.name} className="w-full" />
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-medium">
                    <Link to={`/product/${item.product.slug}`}>
                        {item.product.name}
                    </Link>
                </h3>
                {item.variant && (
                    <p className="text-sm text-gray-600">
                        Size: {item.variant.size}
                    </p>
                )}
                <p className="text-primary font-medium">${item.product.price}</p>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300">
                    <button
                        className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer"
                        onClick={() => onQuantityChange(item.product.id, item.quantity - 1, item.variant?.id)}
                    >
                        -
                    </button>
                    <div className="h-8 w-8 flex items-center justify-center">
                        {item.quantity}
                    </div>
                    <button
                        className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer"
                        onClick={() => onQuantityChange(item.product.id, item.quantity + 1, item.variant?.id)}
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={() => onRemove(item.product.id, item.variant?.id)}
                    className="text-red-500 hover:text-red-600"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
}

export default CartItem;