import React from 'react';

function ProductGallery({ product }) {
    return (
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
    );
}

export default ProductGallery;