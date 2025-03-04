import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../services/request";

function Login() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setError(null);
        try {
            const response = await request({
                url: '/login',
                method: 'post',
                data
            });
            if (response.status === 200) {
                reset();
                navigate("/");
            }
        } catch (err) {
            setError("Invalid email or password");
        }
    };

    return (
        <div>
            <div className="contain py-16">
                <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                    <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        welcome back customer
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <div>
                                <label for="email" className="text-gray-600 mb-2 block">Email address</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="youremail.@domain.com"
                                    {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/, message: "Invalid email format" } })}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label for="password" className="text-gray-600 mb-2 block">Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="*******" 
                                    {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center">
                                <input type="checkbox" name="remember" id="remember"
                                    className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                                <label for="remember" className="text-gray-600 ml-3 cursor-pointer">Remember me</label>
                            </div>
                            <a href="#" className="text-primary">Forgot password</a>
                        </div>
                        <div className="mt-4">
                            <button type="submit"
                                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">Login</button>
                        </div>
                    </form>

                    <div className="mt-6 flex justify-center relative">
                        <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">Or login with</div>
                        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
                    </div>
                    <div className="mt-4 flex gap-4">
                        <a href="#"
                            className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">facebook</a>
                        <a href="#"
                            className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">google</a>
                    </div>

                    <p className="mt-4 text-center text-gray-600">
                        Don't have account? <Link to="/register" className="text-primary">Register now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;