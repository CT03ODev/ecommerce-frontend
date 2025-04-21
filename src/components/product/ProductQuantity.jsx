import React from 'react';

function ProductQuantity({ quantity, onQuantityChange }) {
    return (
        <div className="mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                <button 
                    onClick={() => onQuantityChange(-1)}
                    className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                >
                    -
                </button>
                <div className="h-8 w-8 text-base flex items-center justify-center">{quantity}</div>
                <button 
                    onClick={() => onQuantityChange(1)}
                    className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default ProductQuantity;