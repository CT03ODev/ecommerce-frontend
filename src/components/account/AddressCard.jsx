const AddressCard = ({ address, onEdit, onDelete }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{address.name}</h3>
                <div className="space-x-2">
                    <button 
                        onClick={onEdit} 
                        className="text-blue-500 text-sm"
                    >
                        Edit
                    </button>
                    <button 
                        onClick={onDelete} 
                        className="text-red-500 text-sm"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <p className="text-sm">{address.address}</p>
            <p className="text-sm">{`${address.city}, ${address.state} ${address.postal_code}`}</p>
            <p className="text-sm">{address.phone}</p>
            {address.is_default ? (
                <span className="inline-block mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Default Address
                </span>
            ) : ''}
        </div>
    );
};

export default AddressCard;