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
            to: string
            name: React.ReactNode
        }[];
    }[];
}
const Sidebar = ({ isCollapsed, activeItem, items }: SidebarProps) => {
    return (
        <div className={`bg-white flex flex-col gap-[6px] shadow-md border-r-2  transition-all duration-[400ms] px-[5px] ${isCollapsed ? 'max-w-[70px] min-w-[0px]' : 'max-w-[200px] min-w-[200px]'}`}>
            <div
                className={`flex justify-center items-center p-[20px] transition-all duration-[400ms] ease-in-out overflow-hidden ${isCollapsed
                    ? 'opacity-0 scale-0 max-h-0'
                    : 'opacity-100 scale-100 max-h-[120px]'
                    }`}
            >
                <img src="/logo.png" alt="" className="object-cover w-auto h-[80px]" />
            </div>
            {
                items.map((group) => (
                    <div key={group.groupName}>
                        <h3 className={`text-text-heading font-heading uppercase font-semibold px-[10px] py-[2px] transition duration-[400ms] ease-in-out ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                            {group.groupName}
                        </h3>
                        <ul className='flex flex-col gap-[2px]'>
                            {group.items.map((item) => (
                                <Link to={item.to} key={item.key} className='flex '>
                                    <div className={` transition-all duration-[400ms] ease-in-out rounded-[4px] bg-accent-pinkRed ${activeItem === item.key ? 'opacity-100 w-[6px]' : 'opacity-0 w-0 '} `}></div>
                                    <div
                                        className={`flex mx-[10px] items-center w-[160px] p-[10px] rounded-[8px] transition duration-[400ms] ease-in-out ${activeItem === item.key ? 'bg-accent-pinkRed text-white' : 'text-text-body hover:text-accent-pinkRed '}`}
                                    >
                                        <span >{item.icon}</span>
                                        <span
                                            className={`font-bold transition-all duration-[400ms] ease-in-out overflow-hidden ${isCollapsed ? 'opacity-0 max-w-0 ' : 'opacity-100 max-w-[150px] ml-[10px]'}`}
                                        >
                                            {item.name}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </ul>
                    </div>
                ))
            }
        </div>
    );
};
export default Sidebar;