import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import AccountLayout from "../../components/account/AccountLayout";
import AddressCard from "../../components/account/AddressCard";
import AddressModal from "../../components/account/AddressModal";
import { addressService } from "../../services/addressService";

function ManageAddresses() {
    const queryClient = useQueryClient();
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    const { data: addresses = [] } = useQuery({
        queryKey: ['addresses'],
        queryFn: addressService.getAddresses,
    });

    const createAddressMutation = useMutation({
        mutationFn: addressService.createAddress,
        onSuccess: () => {
            queryClient.invalidateQueries(['addresses']);
            setIsAddressModalOpen(false);
            toast.success('Address added successfully');
        },
    });

    const updateAddressMutation = useMutation({
        mutationFn: ({ id, data }) => addressService.updateAddress(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['addresses']);
            setIsAddressModalOpen(false);
            setEditingAddress(null);
            toast.success('Address updated successfully');
        },
    });

    const deleteAddressMutation = useMutation({
        mutationFn: addressService.deleteAddress,
        onSuccess: () => {
            queryClient.invalidateQueries(['addresses']);
            toast.success('Address deleted successfully');
        },
    });

    const handleAddAddress = (data) => {
        createAddressMutation.mutate(data);
    };

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setIsAddressModalOpen(true);
    };

    const handleUpdateAddress = (data) => {
        updateAddressMutation.mutate({
            id: editingAddress.id,
            data,
        });
    };

    const handleDeleteAddress = (id) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            deleteAddressMutation.mutate(id);
        }
    };

    return (
        <AccountLayout title="Manage Addresses">
            <div>
                <div className="flex justify-between items-center mb-6">
                    <div></div>
                    <button 
                        onClick={() => setIsAddressModalOpen(true)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        Add New Address
                    </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                        <AddressCard 
                            key={address.id}
                            address={address}
                            onEdit={() => handleEditAddress(address)}
                            onDelete={() => handleDeleteAddress(address.id)}
                        />
                    ))}
                </div>
            </div>

            {isAddressModalOpen && (
                <AddressModal
                    address={editingAddress}
                    onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress}
                    onClose={() => {
                        setIsAddressModalOpen(false);
                        setEditingAddress(null);
                    }}
                    isLoading={createAddressMutation.isPending || updateAddressMutation.isPending}
                />
            )}
        </AccountLayout>
    );
}

export default ManageAddresses;