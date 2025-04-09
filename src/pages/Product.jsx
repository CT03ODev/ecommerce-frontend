import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/product/ProductCard";
import { request } from "../services/request";
import { faBagShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Product() {
    const { productSlug } = useParams(); // Get productSlug from the route

    const { data: product, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["product", productSlug],
        queryFn: async () => {
            const response = await request({
                url: `/products/${productSlug}`, // API endpoint to fetch product details
                method: "get",
            });
            return response;
        },
    });

    if (isLoading) {
        return <p className="text-center text-gray-600">Loading product details...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-600">Failed to load product details.</p>;
    }

    return (
        <>
            {isSuccess && <div>
                <div className="mt-8 container grid lg:grid-cols-2 gap-8">
                    <div>
                        <img src={product.thumbnail_url} alt={product.slug} className="w-full" />
                        <div className="grid grid-cols-5 gap-4 mt-4">
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Gallery ${index}`}
                                    className="w-full cursor-pointer border"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="py-4">
                        <h2 className="text-3xl font-medium uppercase mb-2">{product.name}</h2>
                        <div className="flex items-center mb-4">
                            <div className="flex gap-1 text-sm text-yellow-400">
                                {[...Array(product.rating)].map((_, i) => (
                                    <span key={i}><i className="fa-solid fa-star"></i></span>
                                ))}
                            </div>
                            <div className="text-xs text-gray-500 ml-3">({product.reviews.length} Reviews)</div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-800 font-semibold space-x-2">
                                <span>Availability:</span>
                                <span className={product.stock_quantity ? "text-green-600" : "text-red-600"}>
                                    {product.stock_quantity ? "In Stock" : "Out of Stock"}
                                </span>
                            </p>
                            <p className="space-x-2">
                                <span className="text-gray-800 font-semibold">Brand:</span>
                                <span className="text-gray-600">{product.brand.name}</span>
                            </p>
                            <p className="space-x-2">
                                <span className="text-gray-800 font-semibold">Category:</span>
                                <span className="text-gray-600">{product.category.name}</span>
                            </p>
                            {/* <p className="space-x-2">
                                <span className="text-gray-800 font-semibold">SKU:</span>
                                <span className="text-gray-600">{product.sku}</span>
                            </p> */}
                        </div>
                        <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                            <p className="text-xl text-primary font-semibold">${product.price}</p>
                        </div>
                        <p className="mt-4 text-gray-600">{product.description}</p>
                        <div className="pt-4">
                            <h3 className="text-sm text-gray-800 uppercase mb-1">Size</h3>
                            <div className="flex items-center gap-2">
                                {["XS", "S", "M", "L", "XL"].map((size) => (
                                    <div key={size} className="size-selector">
                                        <input type="radio" name="size" id={`size-${size}`} className="hidden" />
                                        <label
                                            htmlFor={`size-${size}`}
                                            className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                                        >
                                            {size}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="pt-4">
                            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Color</h3>
                            <div className="flex items-center gap-2">
                                {["#fc3d57", "#000", "#fff"].map((color, index) => (
                                    <div key={index} className="color-selector">
                                        <input type="radio" name="color" id={`color-${index}`} className="hidden" />
                                        <label
                                            htmlFor={`color-${index}`}
                                            className="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                                            style={{ backgroundColor: color }}
                                        ></label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
                            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">-</div>
                                <div className="h-8 w-8 text-base flex items-center justify-center">4</div>
                                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">+</div>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                            <a
                                href="#"
                                className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
                            >
                                <FontAwesomeIcon icon={faBagShopping} />
                                Add to cart
                            </a>
                            <a
                                href="#"
                                className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
                            >
                                <FontAwesomeIcon icon={faHeart} /> Wishlist
                            </a>
                        </div>
                    </div>
                </div>

                <div className="container pb-16">
                    <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">Product detail description</h2>
                    <div dangerouslySetInnerHTML={{ __html: product.content }} className="content">
                    </div>
                </div>

                <div className="container pb-16">
                    <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">Related products</h2>
                    <div className="grid grid-cols-4 gap-6">
                        {[].map((relatedProduct) => (
                            <ProductCard key={relatedProduct.id} product={relatedProduct} />
                        ))}
                    </div>
                </div>
            </div>}
        </>
    );
}

export default Product;