import { LayoutDashboard, Package } from 'lucide-react';
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { pathname } = useLocation();
    const endpoints = pathname.split('/').pop() as string
    const fakedata = [
        {
            groupName: 'overview',
            items: [
                {
                    key: 'dashboard',
                    icon: <LayoutDashboard strokeWidth={1} />,
                    name: <Link to='/admin/dashboard'>Dashboard</Link>,
                },
                {
                    key: 'categories',
                    icon: <Package strokeWidth={1} />,
                    name: <Link to='/admin/categories'>Categories</Link>,
                }
            ]
        },
        {
            groupName: 'management',
            items: [
                {
                    key: 'brands',
                    icon: <LayoutDashboard strokeWidth={1} />,
                    name: <Link to='/admin/brands'>Brands</Link>,
                },
                {
                    key: 'products',
                    icon: <Package strokeWidth={1} />,
                    name: <Link to='/admin/products'>Products</Link>,
                }
            ]
        }
    ]
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="flex h-screen bg-background-gray">
            {/* Sidebar */}
            <Sidebar
                isCollapsed={isCollapsed}
                activeItem={endpoints}
                items={fakedata}
            />
            <div className="flex-1">
                {/* <header className="bg-white  p-3 flex items-center justify-between">
                    <MyClickable> <AlignLeft strokeWidth={1} onClick={toggleSidebar} /></MyClickable>
                    <div className='flex items-center gap-6 ml-auto mr-[20px]'>
                        <MyClickable ><Bell size={18} strokeWidth={1} /></MyClickable>
                        <div className='flex gap-1 items-center' >
                            <Avatar icon={<User strokeWidth={1} />} />
                            <div className='text-[10px] drop-shadow'>
                                <p >@Toji_2k5</p>
                                <p className='font-medium'>Admin</p>
                            </div>
                            <MyPopover
                                content={<div>No shadow here</div>}
                                title="Title"
                                trigger="click"
                            >
                                <MyClickable><ChevronDown size={20} strokeWidth={1} /></MyClickable>
                            </MyPopover>
                        </div>
                    </div>
                </header> */}
                <Header toggleSidebar={toggleSidebar} />
                {/* Main Content */}
                <div className="flex-1 p-[20px]  overflow-auto max-h-[670px]">
                    <Outlet />
                </div>

            </div>
        </div>
    );
};



export default AdminLayout;