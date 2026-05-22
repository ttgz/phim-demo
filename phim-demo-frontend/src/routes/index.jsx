import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { AdminLogin } from "../pages/AdminLogin";
import { Layout } from "../components/Layout";
import { Movie } from "../pages/Movie";
import { NotFound } from "../pages/NotFound";
import { useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import PrivateRoute from "./PrivateRoute";
import NotAuthenRoute from "./NotAuthenRoute";




export const router = createBrowserRouter([
    {
        path: "/admin",
        element: <PrivateRoute />,
        children: [{
            index: true,
            element: <Dashboard />
        },
        {
            path: "dashboard",
            element: <Dashboard />
        },
        {
            path: "movies",
            element: <Movie />
        }
        ]
    },

    {
        path: "/admin/login",
        element: <NotAuthenRoute />
    },

    {
        path: "*",
        element: <NotFound />
    }
]);