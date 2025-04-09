import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-9xl font-bold text-primary">404</h1>
            <h2 className="text-3xl font-medium text-gray-800 mt-4">Page Not Found</h2>
            <p className="text-gray-600 mt-2 text-center">
                The page you are looking for doesn’t exist or has been moved.
            </p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-primary text-white text-lg font-medium rounded shadow hover:bg-primary-dark transition"
            >
                Go Back Home
            </Link>
        </div>
    );
}

export default NotFound;