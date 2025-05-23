import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useCartStore from "../../stores/cartStore";
import { toast } from "react-hot-toast";

function ProductCard({ product }) {
    const { addItem } = useCartStore();

    const handleAddToCart = (e) => {
        e.preventDefault();
        addItem(product, 1);
        toast.success("Product added to cart");
    };

    return (
        <div className="bg-white shadow rounded overflow-hidden group">
            <div className="relative">
                <img src={product.thumbnail_url} alt="product 1" className="w-full" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <Link to={`/product/${product.slug}`}
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                        title="view product">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Link>
                    <Link to={`/product/${product.slug}`}
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                        title="add to wishlist">
                        <FontAwesomeIcon icon={faHeart} />
                    </Link>
                </div>
            </div>
            <div className="pt-4 pb-3 px-4">
                <Link to={`/product/${product.slug}`}>
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                        {product.name}
                    </h4>
                </Link>
                <div className="flex items-baseline mb-1 space-x-2">
                    <p className="text-xl text-primary font-semibold">${product.price}</p>
                    {/* <p className="text-sm text-gray-400 line-through">$55.90</p> */}
                </div>
                <div className="flex items-center">
                    <div className="flex gap-1 text-sm text-yellow-400">
                        {[...Array(5)].map((_, index) => (
                            <FontAwesomeIcon key={index} icon={faStar} />
                        ))}
                    </div>
                    <div className="text-xs text-gray-500 ml-3">(150)</div>
                </div>
            </div>
            {/* <button
                onClick={handleAddToCart}
                className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
            >
                Add to cart
            </button> */}
        </div>
    );
}

export default ProductCard;
