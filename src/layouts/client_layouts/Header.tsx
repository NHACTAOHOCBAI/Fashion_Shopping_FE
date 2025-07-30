import { ShoppingCart, UserRound } from "lucide-react"
import { Link, useLocation } from "react-router"
import MyClickable from "../../components/MyClickable"
import { Dropdown } from "antd"
import { useCategories } from "../../hooks/useCategory"
interface HeaderProps {
    openCart: () => void,
    closeCart: () => void
}
const Header = ({ openCart }: HeaderProps) => {
    return (
        <header className="px-[80px]   bg-white drop-shadow-sm w-full flex pt-[18px]">
            <nav className="flex gap-[40px] overflow-hidden items-center">
                <NavItem path="" value="HOME" />
                <MegaMenu />
                <NavItem path="blogs" value="BLOGS" />
            </nav>
            <div className="ml-auto flex gap-[10px] items-center pb-[10px]">
                <MyClickable onClick={openCart}>
                    <ShoppingCart size={20} />
                </MyClickable>
                <MyClickable onClick={openCart}>
                    <UserRound size={20} />
                </MyClickable>
            </div>
        </header>
    )
}
const Menu = () => {
    return (
        <div className="bg-black text-white w-screen grid grid-cols-4 gap-6 p-[50px] drop-shadow-xl pb-[80px]">
            <div>
                <h4 className="font-bold text-white mb-2">Thời trang nam</h4>
                <ul className="list-disc pl-4">
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-white mb-2">Thời trang nam</h4>
                <ul className="list-disc pl-4">
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-white mb-2">Thời trang nam</h4>
                <ul className="list-disc pl-4">
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-white mb-2">Thời trang nữ</h4>
                <ul className="list-disc pl-4">
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-white mb-2">Phụ kiện</h4>
                <ul className="list-disc pl-4">
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-white mb-2">Phụ kiện</h4>
                <ul className="list-disc pl-4">
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                    <li className="p-[5px]">Áo khoác nam</li>
                </ul>
            </div>
        </div>
    )
};

const MegaMenu = () => (
    <Dropdown overlay={Menu} trigger={['hover']} placement="bottomCenter">
        <div>
            <NavItem path="products" value="PRODUCTS" />
        </div>
    </Dropdown>
);
const NavItem = ({ path, value }: { path: string, value: string }) => {
    const { pathname } = useLocation();
    const endpoints = pathname.split('/').pop()
    const isActive = path === endpoints
    return (
        <div>
            <Link to={`/${path}`} className={`hover:text-black duration-200 text-[16px] font-semibold ${isActive ? "drop-shadow text-black " : ""}`}>{value}</Link>
            <img className={`duration-200 mx-auto mt-[10px] ${isActive ? "" : "translate-y-[6px]"}`} src="/triangle.svg" />
        </div>
    )
}
export default Header