import { createBrowserRouter } from "react-router";
import AdminLayout from "../layouts/admin_layouts/AdminLayout";
import { lazy, Suspense } from "react";
const Dashboard = lazy(() => import('../pages/admin/dashboard/Dashboard'));
const Category = lazy(() => import('../pages/admin/category/Category'));
const Brand = lazy(() => import('../pages/admin/brand/Brand'));
const router = createBrowserRouter([
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "dashboard",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Dashboard />
                    </Suspense>
                )
            },
            {
                path: "categories",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Category />
                    </Suspense>
                )
            },
            {
                path: "brands",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Brand />
                    </Suspense>
                )
            }
        ]
    }

]);
export default router