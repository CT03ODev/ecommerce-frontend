import React from "react";

function InputField({ label, id, type, placeholder, register, validation, error }) {
    return (
        <div>
            <label htmlFor={id} className="text-gray-600 mb-2 block">{label}</label>
            <input
                type={type}
                id={id}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder={placeholder}
                {...register(id, validation)}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
}

export default InputField;