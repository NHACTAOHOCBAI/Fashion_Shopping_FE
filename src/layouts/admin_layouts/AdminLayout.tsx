import { AlignLeft, Bell, CircleChevronDown, LayoutDashboard, Package, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import Sidebar from './Sidebar';
import { Avatar, Popover } from 'antd';
import MyPopover from '../../components/MyPopover';

const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);
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
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar
                isCollapsed={isCollapsed}
                activeItem={endpoints}
                items={fakedata}
            />
            <div className="flex-1">
                <header className="bg-white  p-3 flex items-center justify-between">
                    <AlignLeft strokeWidth={1} onClick={toggleSidebar} />
                    <div className='flex items-center gap-6 ml-auto mr-[20px]'>
                        <Bell size={18} strokeWidth={1} />
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
                                <CircleChevronDown size={18} strokeWidth={1} />
                            </MyPopover>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="bg-background-gray h-full rounded shadow-md">


                </div>
            </div>
        </div>
    );
};



export default AdminLayout;