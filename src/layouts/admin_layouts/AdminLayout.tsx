import { Album, LayoutDashboard, Package } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
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
                    icon: <LayoutDashboard />,
                    name: <Link to='/admin/dashboard'>Dashboard</Link>,
                },
            ]
        },
        {
            groupName: 'management',
            items: [
                {
                    key: 'categories',
                    icon: <Package />,
                    name: <Link to='/admin/categories'>Categories</Link>,
                },
                {
                    key: 'brands',
                    icon: <Album />,
                    name: <Link to='/admin/brands'>Brands</Link>,
                }
            ]
        }
    ], [])
    const toggleSidebar = useCallback(() => {
        setIsCollapsed(!isCollapsed);
    }, [isCollapsed])
    return (
        <div className="flex h-screen bg-background-gray">
            {/* Sidebar */}
            <Sidebar
                isCollapsed={isCollapsed}
                activeItem={endpoints}
                items={fakedata}
            />
            <div className="flex-1">
                {/* Header */}
                <Header toggleSidebar={toggleSidebar} />
                {/* Main Content */}
                <div className="flex-1 p-[20px]  overflow-auto max-h-[670px]">
                    <Outlet />
                </div>

            </div>
        </div>
    );
};



export default AdminLayout