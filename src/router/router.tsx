import { createBrowserRouter } from "react-router";
import Category from "../pages/admin/category/Category";
import AdminLayout from "../layouts/AdminLayout";
const router = createBrowserRouter([
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "categories",
                element: <Category /> // Placeholder for Category component
            }
        ]
    },
]);
export default router