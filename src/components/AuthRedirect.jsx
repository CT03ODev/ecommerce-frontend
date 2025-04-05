import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const AuthRedirect = ({ authRedirect = false, children }) => {
    if (!authRedirect) {
        return children;
    }
    const { user } = useAuthStore(); // Check if the user is logged in
    if (user) {
        return <Navigate to="/" replace />; // Redirect to home if logged in
    }
    return children;
};

export default AuthRedirect;