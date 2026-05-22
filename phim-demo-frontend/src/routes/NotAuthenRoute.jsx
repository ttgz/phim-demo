import { useSelector } from "react-redux";
import { AdminLogin } from "../pages/AdminLogin";
import { Navigate } from "react-router-dom";

export default function NotAuthenRoute() {
    const isAuthenticated = useSelector((state) =>
        state.auth.isAuthenticated
    );
    if (isAuthenticated) {
        return <Navigate to="/admin" replace />
    }

    return  <AdminLogin/>
}
