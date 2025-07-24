import { createBrowserRouter } from "react-router";
import AdminLayout from "../layouts/admin_layouts/AdminLayout";
import { lazy, Suspense } from "react";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFoundPage from "../components/NotFoundPage";
import VerifyEmail from "../pages/auth/VerifyEmail";
import MyLoading from "../components/MyLoading";
const Dashboard = lazy(() => import('../pages/admin/dashboard/Dashboard'));
const Category = lazy(() => import('../pages/admin/category/Category'));
const Brand = lazy(() => import('../pages/admin/brand/Brand'));
const Product = lazy(() => import('../pages/admin/product/Product'));
const NewProduct = lazy(() => import('../pages/admin/product/NewProduct'));
const UpdateProduct = lazy(() => import('../pages/admin/product/UpdateProduct'));
const DetailProduct = lazy(() => import('../pages/admin/product/DetailProduct'));
const router = createBrowserRouter([
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "dashboard",
                element: (
                    <Suspense fallback={<MyLoading />}>
                        <Dashboard />
                    </Suspense>
                )
            },
            {
                path: "categories",
                element: (
                    <Suspense fallback={<MyLoading />}>
                        <Category />
                    </Suspense>
                )
            },
            {
                path: "brands",
                element: (
                    <Suspense fallback={<MyLoading />}>
                        <Brand />
                    </Suspense>
                )
            },
            {
                path: "products",
                element: (
                    <Suspense fallback={<MyLoading />}>
                        <Product />
                    </Suspense>
                )
            },
            {
                path: "products/new-product",
                element: (
                    <Suspense fallback={<MyLoading />}>
                        <NewProduct />
                    </Suspense>
                )
            },
            {
                path: "products/update-product/:id",
                element: (
                    <Suspense fallback={<MyLoading />}>
                        <UpdateProduct />
                    </Suspense>
                )
            },
            {
                path: "products/detail-product/:id",
                element: (
                    <Suspense fallback={<MyLoading />}>
                        <DetailProduct />
                    </Suspense>
                )
            },
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