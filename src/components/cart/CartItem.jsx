import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function CartItem({ item, onQuantityChange, onRemove }) {
    // Lấy số lượng tồn kho từ variant hoặc sản phẩm
    const stockQuantity = item.variant?.stock_quantity || 0;

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
                    <div className="text-sm text-gray-600">
                        <p>Size: {item.variant.size}</p>
                        {item.variant.color && (
                            <div className="flex items-center gap-2">
                                <span>Màu sắc:</span>
                                <div 
                                    className="w-6 h-6 rounded-full border"
                                    style={{ backgroundColor: item.variant.color }}
                                ></div>
                            </div>
                        )}
                    </div>
                )}
                <p className="text-primary font-medium">${item.product.price}</p>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300">
                    <button
                        className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => onQuantityChange(item.product.id, item.quantity - 1, item.variant?.id)}
                        disabled={item.quantity <= 1}
                    >
                        -
                    </button>
                    <div className="h-8 w-8 flex items-center justify-center">
                        {item.quantity}
                    </div>
                    <button
                        className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => onQuantityChange(item.product.id, item.quantity + 1, item.variant?.id)}
                        disabled={item.quantity >= stockQuantity}
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
            {stockQuantity > 0 && item.quantity >= stockQuantity && (
                <p className="text-red-500 text-sm mt-1">
                    Đã đạt giới hạn số lượng tồn kho
                </p>
            )}
        </div>
    );
}

export default CartItem;