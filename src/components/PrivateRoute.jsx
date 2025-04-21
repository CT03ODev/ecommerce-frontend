import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const PrivateRoute = ({ children }) => {
    const { user } = useAuthStore();

    console.log(user);
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default PrivateRoute;