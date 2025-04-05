import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/shared/InputField";
import SocialSignup from "../components/SocialSignup";
import useAuthStore from "../stores/authStore";

function Login() {
    const { register, handleSubmit, formState: { errors }, setError, reset, clearErrors } = useForm();
    const navigate = useNavigate();
    const { login } = useAuthStore(); // Import the login action from authStore

    const onSubmit = async (data) => {
        try {
            const result = await login(data.email, data.password);
            if (result.success) {
                reset();
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
                    <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        Welcome back customer
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
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
                            {errors.general && <p className="text-red-500 text-sm mt-1">{errors.general.message}</p>}
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    id="remember"
                                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                />
                                <label htmlFor="remember" className="text-gray-600 ml-3 cursor-pointer">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-primary">Forgot password</a>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() => clearErrors()}
                                type="submit"
                                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <SocialSignup />

                    <p className="mt-4 text-center text-gray-600">
                        Don't have an account? <Link to="/register" className="text-primary">Register now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;