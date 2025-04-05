import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputField from "../components/shared/InputField";
import SocialSignup from "../components/SocialSignup";
import useAuthStore from "../stores/authStore";

function Register() {
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm();
    const navigate = useNavigate();
    const { register: registerUser } = useAuthStore(); // Import the register action from authStore

    const onSubmit = async (data) => {
        try {
            reset();
            const result = await registerUser(data); // Call the register action
            if (result.success) {
                navigate("/");
            } else if (result.errors) {
                // Handle field-specific validation errors
                Object.keys(result.errors).forEach((field) => {
                    setError(field, { type: "server", message: result.errors[field] });
                });
            } else if (result.message) {
                // Handle general error message
                setError("general", { type: "server", message: result.message });
            }
        } catch (err) {
            setError("general", { type: "server", message: "Something went wrong!" });
        }
    };

    return (
        <div>
            <div className="contain py-16">
                <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                    <h2 className="text-2xl uppercase font-medium mb-1">Create an account</h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        Register for new customer
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <InputField
                                label="Full Name"
                                id="name"
                                type="text"
                                placeholder="fulan fulana"
                                register={register}
                                validation={{
                                    required: "Name is required",
                                    minLength: { value: 6, message: "Name must be at least 6 characters" }
                                }}
                                error={errors.name}
                            />
                            <InputField
                                label="Email address"
                                id="email"
                                type="email"
                                placeholder="youremail.@domain.com"
                                register={register}
                                validation={{
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/, message: "Invalid email format" }
                                }}
                                error={errors.email}
                            />
                            <InputField
                                label="Password"
                                id="password"
                                type="password"
                                placeholder="*******"
                                register={register}
                                validation={{
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                                }}
                                error={errors.password}
                            />
                            <InputField
                                label="Confirm password"
                                id="password_confirmation"
                                type="password"
                                placeholder="*******"
                                register={register}
                                validation={{
                                    required: "Confirm Password is required",
                                    validate: (value, { password }) =>
                                        value === password || "Passwords do not match",
                                }}
                                error={errors.password_confirmation}
                            />
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center">
                                <input type="checkbox" name="aggrement" id="aggrement"
                                    className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                                <label htmlFor="aggrement" className="text-gray-600 ml-3 cursor-pointer">
                                    I have read and agree to the <a href="#" className="text-primary">terms & conditions</a>
                                </label>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button type="submit"
                                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                                create account
                            </button>
                        </div>
                    </form>

                    <SocialSignup />

                    <p className="mt-4 text-center text-gray-600">
                        Already have account? <Link to="/login" className="text-primary">Login now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;