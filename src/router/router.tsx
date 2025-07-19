import { createBrowserRouter } from "react-router";
import AdminLayout from "../layouts/admin_layouts/AdminLayout";
import { lazy, Suspense } from "react";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFoundPage from "../components/NotFoundPage";
import VerifyEmail from "../pages/auth/VerifyEmail";
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
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/verify-email",
        element: <VerifyEmail />,
    },
    {
        path: "/404",
        element: <NotFoundPage />,
    }

]);
export default router