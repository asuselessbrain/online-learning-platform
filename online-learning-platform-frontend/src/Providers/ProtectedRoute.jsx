import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext";
import Loading from "../Components/Shared/Loading";

const ProtectedRoute = ({children}) => {
    const location = useLocation();
    const {user, loading} = useContext(AuthContext);

    // Show loading while checking authentication state
    if (loading) {
        return <Loading message="Checking authentication..." fullScreen={true} />;
    }

    // If user is authenticated, render children
    if (user) {
        return children;
    }

    // If not authenticated, redirect to login with return path
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

export default ProtectedRoute;