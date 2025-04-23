import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import useCartStore from "../stores/cartStore";
import { request } from "../services/request";
import ProductCard from "../components/product/ProductCard";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductVariants from "../components/product/ProductVariants";
import ProductQuantity from "../components/product/ProductQuantity";
import PageHelmet from "../components/common/PageHelmet";

function Product() {
    const { productSlug } = useParams();
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCartStore();

    const { data: product, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["product", productSlug],
        queryFn: async () => {
            const response = await request({
                url: `/products/${productSlug}`,
                method: "get",
            });
            return response;
        },
    });

    const { data: relatedProducts, isLoading: isLoadingRelated, isError: isErrorRelated } = useQuery({
        queryKey: ["relatedProducts", product?.id],
        queryFn: async () => {
            const response = await request({
                method: "get",
                url: "/products",
                params: {
                    category: product?.category.id,
                    limit: 12,
                }
            });
            return response.data;
        },
    });

    const handleAddToCart = () => {
        const variant = product.variants.find(v =>
            v.size === selectedSize &&
            (!v.color || v.color === selectedColor)
        );

        if (product.variants.length > 0 && !variant) {
            toast.error("Please select product options");
            return;
        }

        addItem(product, quantity, variant);
        toast.success("Product added to cart");
    };

    // Get unique sizes and colors
    const sizes = [...new Set(product?.variants.map(v => v.size) || [])];
    const colors = [...new Set(product?.variants.map(v => v.color).filter(Boolean) || [])];

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        // Reset color if the new size doesn't have the currently selected color
        const availableColors = product.variants
            .filter(v => v.size === size)
            .map(v => v.color);
        if (selectedColor && !availableColors.includes(selectedColor)) {
            setSelectedColor(null);
        }
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    const handleQuantityChange = (amount) => {
        const newQuantity = quantity + amount;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    // Thêm useEffect để tự động chọn variant đầu tiên
    useEffect(() => {
        if (product?.variants?.length > 0) {
            const firstVariant = product.variants[0];
            setSelectedSize(firstVariant.size);
            if (firstVariant.color) {
                setSelectedColor(firstVariant.color);
            }
        }
    }, [product]);

    if (isLoading) {
        return <p className="text-center text-gray-600">Loading product details...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-600">Failed to load product details.</p>;
    }

    return (
        <>
            {isSuccess && <div>
                <PageHelmet
                    title={product.name}
                    description={product.description}
                />
                <div className="mt-8 container grid lg:grid-cols-2 gap-8">
                    <ProductGallery product={product} />

                    <div className="py-4">
                        <ProductInfo product={product} />

                        <ProductVariants
                            sizes={sizes}
                            colors={colors}
                            selectedSize={selectedSize}
                            selectedColor={selectedColor}
                            onSizeSelect={handleSizeSelect}
                            onColorSelect={handleColorSelect}
                            variants={product.variants}
                        />

                        <ProductQuantity
                            quantity={quantity}
                            onQuantityChange={handleQuantityChange}
                        />

                        <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                            <button
                                onClick={handleAddToCart}
                                className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
                            >
                                <FontAwesomeIcon icon={faBagShopping} />
                                Add to cart
                            </button>
                            <a
                                href="#"
                                className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
                            >
                                <FontAwesomeIcon icon={faHeart} /> Wishlist
                            </a>
                        </div>
                    </div>
                </div>

                <div className="container pb-16 mt-8">
                    <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                        Product detail description
                    </h2>
                    <div dangerouslySetInnerHTML={{ __html: product.content }} className="content" />
                </div>

                <div className="container pb-16">
                    <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                        Related products
                    </h2>
                    <div className="grid grid-cols-4 gap-6">
                        {relatedProducts?.map((relatedProduct) => (
                            <ProductCard key={relatedProduct.id} product={relatedProduct} />
                        ))}
                    </div>
                </div>
            </div>}
        </>
    );
}

export default Product;