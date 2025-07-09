import { createBrowserRouter } from "react-router";
import Category from "../pages/admin/category/Category";
import AdminLayout from "../layouts/admin_layouts/AdminLayout";
import Dashboard from "../pages/admin/dashboard/Dashboard";
const router = createBrowserRouter([
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard /> // Placeholder for Category component
            },
            {
                path: "categories",
                element: <Category /> // Placeholder for Category component
            }
        ]
    },
]);
export default router