import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { Layout } from "../components/Layout";

export default function PrivateRoute() {
    const isAuthenticated = useSelector((state) => {
        state.auth.isAuthenticated
    });

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <Layout />
}
