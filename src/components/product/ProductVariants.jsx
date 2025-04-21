import React from 'react';

function ProductVariants({ sizes, colors, selectedSize, selectedColor, onSizeSelect, onColorSelect, variants }) {
    return (
        <div className="pt-4">
            {sizes.length > 0 && (
                <div className="pt-4">
                    <h3 className="text-gray-800 uppercase mb-1">Size</h3>
                    <div className="flex items-center gap-2">
                        {sizes.map((size) => (
                            <div key={size} className="size-selector">
                                <input 
                                    type="radio" 
                                    name="size" 
                                    id={`size-${size}`} 
                                    className="hidden"
                                    checked={selectedSize === size}
                                    onChange={() => onSizeSelect(size)}
                                />
                                <label
                                    htmlFor={`size-${size}`}
                                    className={`p-1 text-sm border border-gray-200 rounded-sm h-6 flex items-center 
                                        justify-center cursor-pointer shadow-sm text-gray-600
                                        ${selectedSize === size ? 'border-primary text-primary' : ''}`}
                                >
                                    {size}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {colors.length > 0 && (
                <div className="pt-4">
                    <h3 className="text-gray-800 mb-3 uppercase font-medium">Color</h3>
                    <div className="flex items-center gap-2">
                        {colors.map((color) => {
                            const isAvailable = selectedSize 
                                ? variants.some(v => v.size === selectedSize && v.color === color)
                                : true;
                            return (
                                <div key={color} className="color-selector">
                                    <input 
                                        type="radio" 
                                        name="color" 
                                        id={`color-${color}`} 
                                        className="hidden"
                                        checked={selectedColor === color}
                                        onChange={() => onColorSelect(color)}
                                        disabled={!isAvailable}
                                    />
                                    <label
                                        htmlFor={`color-${color}`}
                                        className={`border rounded-sm h-6 w-6 cursor-pointer shadow-sm block
                                            ${selectedColor === color ? 'ring-2 ring-primary' : 'border-gray-200'}
                                            ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        style={{ backgroundColor: color }}
                                    ></label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductVariants;