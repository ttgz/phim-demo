import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { AdminLogin } from "../pages/AdminLogin";
import { Layout } from "../components/Layout";
import { Movie } from "../pages/Movie";
import { NotFound } from "../pages/NotFound";
import { useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import PrivateRoute from "./PrivateRoute";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute/>,
        children: [{
            index: true,
            element: <Dashboard />
        },
        {
            path: "/movies",
            element: <Movie/>
        }
    ]
    },

    {
        path: "/login",
        element: <AdminLogin />
    },
    {
        path: "*",
        element: <NotFound />
    }
]);