import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../shared/InputField';

const AddressModal = ({ address, onSubmit, onClose, isLoading }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: address || {
            is_default: false
        }
    });

    useEffect(() => {
        if (address) {
            reset(address);
        }
    }, [address, reset]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">
                    {address ? 'Edit Address' : 'Add New Address'}
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <InputField
                        label="Name"
                        id="name"
                        type="text"
                        placeholder="Enter recipient name"
                        register={register}
                        validation={{ required: "Name is required" }}
                        error={errors.name}
                    />

                    <InputField
                        label="Phone"
                        id="phone"
                        type="tel"
                        placeholder="Enter phone number"
                        register={register}
                        validation={{ required: "Phone is required" }}
                        error={errors.phone}
                    />

                    <div>
                        <label className="text-gray-600 mb-2 block">Address</label>
                        <textarea
                            {...register('address', { required: 'Address is required' })}
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            rows="3"
                            placeholder="Enter full address"
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label="City"
                            id="city"
                            type="text"
                            placeholder="Enter city"
                            register={register}
                            validation={{ required: "City is required" }}
                            error={errors.city}
                        />

                        <InputField
                            label="State"
                            id="state"
                            type="text"
                            placeholder="Enter state"
                            register={register}
                            validation={{ required: "State is required" }}
                            error={errors.state}
                        />
                    </div>

                    <InputField
                        label="Postal Code"
                        id="postal_code"
                        type="text"
                        placeholder="Enter postal code"
                        register={register}
                        validation={{ required: "Postal code is required" }}
                        error={errors.postal_code}
                    />

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            {...register('is_default')}
                            className="mr-2"
                        />
                        <label className="text-sm">Set as default address</label>
                    </div>

                    <div className="flex justify-end space-x-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 border rounded-lg"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save Address'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressModal;