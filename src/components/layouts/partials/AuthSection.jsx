// filepath: d:\Workspace\laragon\www\ecommerce-frontend\src\components\layouts\partials\AuthSection.jsx
import { Link } from "react-router-dom";
import useAuthStore from "../../../stores/authStore";

function AuthSection() {
    const { user, logout } = useAuthStore();

    return (
        <div>
            {user ? (
                <div className="text-gray-200">
                    <span className="mr-4">Hello, {user.name}</span>
                    <button
                        onClick={logout}
                        className="text-gray-200 hover:text-white transition"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div>
                    <Link to="/login" className="text-gray-200 hover:text-white transition">Login</Link>
                    <span className="text-gray-200">/</span>
                    <Link to="/register" className="text-gray-200 hover:text-white transition">Register</Link>
                </div>
            )}
        </div>
    );
}

export default AuthSection;