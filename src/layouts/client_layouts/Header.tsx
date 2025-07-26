import { ShoppingCart, UserRound } from "lucide-react"
import { Link, useLocation } from "react-router"

const Header = () => {
    return (
        <header className="px-[80px]   bg-white drop-shadow-sm w-full flex pt-[18px]">
            <nav className="flex gap-[40px] overflow-hidden items-center">
                <NavItem path="" value="HOME" />
                <NavItem path="products" value="PRODUCTS" />
                <NavItem path="blogs" value="BLOGS" />

            </nav>
            <div className="ml-auto flex gap-[10px]">
                <UserRound size={20} />
                <ShoppingCart size={20} />
            </div>
        </header>
    )
}
const NavItem = ({ path, value }: { path: string, value: string }) => {
    const { pathname } = useLocation();
    const endpoints = pathname.split('/').pop()
    const isActive = path === endpoints
    return (
        <div>
            <Link to={`/${path}`} className={`duration-200 text-[16px] font-semibold ${isActive ? "drop-shadow text-black " : ""}`}>{value}</Link>
            <img className={`duration-200 mx-auto mt-[10px] ${isActive ? "" : "translate-y-[6px]"}`} src="/triangle.svg" />
        </div>
    )
}
export default Header