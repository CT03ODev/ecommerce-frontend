import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../constants';

function ProductGallery({ product }) {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        setSelectedImage(product.thumbnail_url);
        
        const allImages = [];
        
        allImages.push(product.thumbnail_url);
        
        if (product.variants && product.variants.length > 0) {
            product.variants.forEach(variant => {
                if (variant.images && variant.images.length > 0) {
                    variant.images.forEach(image => {
                        // Kiểm tra trùng lặp trước khi thêm vào
                        if (!allImages.includes(image)) {
                            allImages.push(apiUrl + '/storage/' + image.image);
                        }
                    });
                }
            });
        }
        setImages(allImages);
    }, [product]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <div>
            <div className="w-full overflow-hidden rounded-lg">
                <img 
                    src={selectedImage} 
                    alt={product.name} 
                    className="w-full aspect-video object-contain bg-gray-200"
                />
            </div>
            
            <div className="grid grid-cols-5 gap-4 mt-4">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Gallery ${index}`}
                        className={`w-full aspect-square object-contain cursor-pointer bg-gray-200 border hover:border-blue-500 ${selectedImage === image ? 'border-blue-500 border-2' : 'border-gray-200'}`}
                        onClick={() => handleImageClick(image)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductGallery;