import type { JSX } from "react";
import { Link } from "react-router";

interface SidebarProps {
    isCollapsed: boolean;
    activeItem: string | null;
    items: {
        groupName: string;
        items: {
            key: string;
            icon: JSX.Element;
            name: JSX.Element;
        }[];
    }[];
}
const Sidebar = ({ isCollapsed, activeItem, items }: SidebarProps) => {
    return (
        <div className={`bg-white flex flex-col gap-[10px] shadow-md border-r-2  transition-all duration-[400ms] ${isCollapsed ? 'w-16' : 'w-[200px]'}`}>
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
export default Sidebar;