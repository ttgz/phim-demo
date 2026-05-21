import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { AdminLogin } from "../pages/AdminLogin";
import { Layout } from "../components/Layout";
import { Movie } from "../pages/Movie";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout activeNav="dashboard"  onNavChange={() => {}} user={{ name: 'Admin' }}/>,
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
        path: "/admin",
        element: <Layout />,
        children: [{
            index: true,
            element: <Dashboard />
        }]
    },
    {
        path: "/login",
        element: <AdminLogin />
    }
]);