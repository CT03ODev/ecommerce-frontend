import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAuthStore from "../stores/authStore";
import ProfileCard from "../components/account/ProfileCard";
import AccountMenu from "../components/account/AccountMenu";
import InputField from "../components/shared/InputField";
import { updatePassword } from "../services/authService";
import { toast } from "react-hot-toast";

function Account() {
    const { user } = useAuthStore();
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const updatePasswordMutation = useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            toast.success('Password updated successfully');
            setShowPasswordForm(false);
            reset();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update password');
        }
    });

    const onSubmit = (data) => {
        updatePasswordMutation.mutate(data);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/4">
                    <ProfileCard />
                    <AccountMenu />
                </div>

                <div className="md:w-3/4">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="col-span-3">
                            <div className="bg-white p-4 rounded-lg shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-semibold">Personal Profile</h3>
                                    <button className="text-red-500 text-sm"></button>
                                </div>
                                <div>
                                    <p className="text-sm">{user.name}</p>
                                    <p className="text-sm">{user.email}</p>
                                    <p className="text-sm">{user.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Password Update Section */}
                        <div className="col-span-3">
                            <div className="bg-white p-4 rounded-lg shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-semibold">Change Password</h3>
                                    <button 
                                        onClick={() => {
                                            setShowPasswordForm(!showPasswordForm);
                                            if (!showPasswordForm) reset();
                                        }}
                                        className="text-red-500 text-sm"
                                    >
                                        {showPasswordForm ? 'Cancel' : 'Change'}
                                    </button>
                                </div>
                                
                                {showPasswordForm && (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                        <InputField
                                            label="Current Password"
                                            id="current_password"
                                            type="password"
                                            placeholder="Enter your current password"
                                            register={register}
                                            validation={{ required: "Current password is required" }}
                                            error={errors.current_password}
                                        />

                                        <InputField
                                            label="New Password"
                                            id="password"
                                            type="password"
                                            placeholder="Enter new password"
                                            register={register}
                                            validation={{ 
                                                required: "New password is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters"
                                                }
                                            }}
                                            error={errors.password}
                                        />

                                        <InputField
                                            label="Confirm New Password"
                                            id="password_confirmation"
                                            type="password"
                                            placeholder="Confirm new password"
                                            register={register}
                                            validation={{ 
                                                required: "Please confirm your password",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters"
                                                }
                                            }}
                                            error={errors.password_confirmation}
                                        />

                                        <button
                                            type="submit"
                                            disabled={updatePasswordMutation.isPending}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
                                        >
                                            {updatePasswordMutation.isPending ? 'Updating...' : 'Update Password'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;