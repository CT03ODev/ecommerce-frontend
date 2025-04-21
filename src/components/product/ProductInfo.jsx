import React from 'react';

function ProductInfo({ product }) {
    return (
        <div>
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
            </div>
            <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                <p className="text-xl text-primary font-semibold">${product.price}</p>
            </div>
            <p className="mt-4 text-gray-600">{product.description}</p>
        </div>
    );
}

export default ProductInfo;