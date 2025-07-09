import { AlignLeft, LayoutDashboard, Package } from 'lucide-react';
import { useState, type JSX } from 'react';
import { Link, useLocation } from 'react-router';
interface SidebarProps {
    isCollapsed: boolean;
    activeItem: string | null;
    onItemClick: (id: string) => void;
    items: {
        groupName: string;
        items: {
            key: string;
            icon: JSX.Element;
            name: JSX.Element;
        }[];
    }[];
    onToggleSidebar: () => void;
}
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
const AdminLayout = () => {
    const [activeItem, setActiveItem] = useState<string | null>("dashboard");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { pathname } = useLocation();
    const endpoints = pathname.split('/').pop() as string;
    const handleClick = (item: string) => {
        setActiveItem(item);
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar
                isCollapsed={isCollapsed}
                activeItem={endpoints}
                onItemClick={handleClick}
                items={fakedata}
                onToggleSidebar={toggleSidebar}
            />
            {/* Main Content */}
            <div className="flex-1 p-8">
                <AlignLeft strokeWidth={1} onClick={toggleSidebar} />
                <div className="flex justify-end items-center mb-4">
                    <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                        <span className="text-gray-600">🔔</span>
                    </button>
                    <div className="flex items-center">
                        <span className="text-gray-600 mr-2">@Toj2k5</span>
                        <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center">
                            Admin
                        </div>
                    </div>
                </div>
                <div className="bg-white h-full rounded shadow-md">

                    <p className="p-4">Active Item: {activeItem || 'None'}</p>
                </div>
            </div>
        </div>
    );
};
const Sidebar = ({ isCollapsed, activeItem, items }: SidebarProps) => {
    return (
        <div className={`bg-white shadow-md border-r-2  transition-all duration-[400ms] ${isCollapsed ? 'w-16' : 'w-[200px]'}`}>
            {
                items.map((group) => (
                    <div key={group.groupName}>
                        <h3 className={`text-text-heading font-heading uppercase px-[10px] py-[4px] transition-opacity duration-[400ms] ease-in-out ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                            {group.groupName}
                        </h3>
                        <ul className='flex flex-col gap-[4px]'>
                            {group.items.map((item) => (
                                <li key={item.key} className='flex'>
                                    <div className={`h-[48px] transition-all duration-[400ms]  rounded-[4px] bg-accent-pinkRed ${activeItem === item.key ? 'opacity-100 w-[6px]' : 'opacity-0 w-0 '}`}></div>
                                    <Link
                                        to={item.key}
                                        className={`flex mx-[10px] items-center w-[160px] p-[12px] rounded-[8px] transition duration-[400ms] ${activeItem === item.key ? 'bg-accent-pinkRed text-white' : 'text-text-body hover:text-accent-pinkRed '}`}
                                    >
                                        <span >{item.icon}</span>
                                        <span
                                            className={`transition-all duration-[400ms] ease-in-out overflow-hidden ${isCollapsed ? 'opacity-0 max-w-0 ' : 'opacity-100 max-w-[150px] ml-[10px]'}`}
                                        >
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            }
        </div>
    );
};


export default AdminLayout;