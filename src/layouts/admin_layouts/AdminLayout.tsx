import { Album, LayoutDashboard, Package, Shirt } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { pathname } = useLocation();
    const endpoints = pathname.split('/').pop() as string
    const fakedata = useMemo(() => [
        {
            groupName: 'overview',
            items: [
                {
                    key: 'dashboard',
                    icon: <LayoutDashboard strokeWidth={1.8} />,
                    to: '/admin/dashboard',
                    name: "Dashboard",
                },
            ]
        },
        {
            groupName: 'management',
            items: [
                {
                    key: 'categories',
                    icon: <Package strokeWidth={1.8} />,
                    to: '/admin/categories',
                    name: "Categories"
                },
                {
                    key: 'brands',
                    icon: <Album strokeWidth={1.8} />,
                    to: '/admin/brands',
                    name: "Brands"
                },
                {
                    key: 'products',
                    icon: <Shirt strokeWidth={1.8} />,
                    to: '/admin/products',
                    name: "Products"
                }
            ]
        }
    ], [])
    const toggleSidebar = useCallback(() => {
        setIsCollapsed(!isCollapsed);
    }, [isCollapsed])
    return (
        <div className="flex h-screen bg-background-gray overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                isCollapsed={isCollapsed}
                activeItem={endpoints}
                items={fakedata}
            />

            <div className="flex flex-col flex-1 h-full">
                {/* Header */}
                <Header toggleSidebar={toggleSidebar} />

                {/* Main Content (scrollable area) */}
                <div className="flex-1 overflow-auto p-[20px]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};



export default AdminLayout