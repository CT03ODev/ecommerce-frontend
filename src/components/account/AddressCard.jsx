const AddressCard = ({ address, onEdit, onDelete }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{address.name}</h3>
                    {address.is_default ? (
                        <span className="inline-block mt-1 text-xs bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full font-medium">
                            Default address
                        </span>
                    ) :  null}
                </div>
                <div className="flex space-x-3">
                    <button 
                        onClick={onEdit} 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
                    >
                        Edit
                    </button>
                    <button 
                        onClick={onDelete} 
                        className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-200"
                    >
                        Remove
                    </button>
                </div>
            </div>
            <div className="space-y-2 text-gray-600">
                <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <div>
                        <p className="text-sm">{address.address}</p>
                        <p className="text-sm">{`${address.city}, ${address.state} ${address.postal_code}`}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <p className="text-sm">{address.phone}</p>
                </div>
            </div>
        </div>
    );
};

export default AddressCard;