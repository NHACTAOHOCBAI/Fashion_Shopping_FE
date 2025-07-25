import { ShoppingCart, UserRound } from "lucide-react"
import { Link } from "react-router"

const Header = () => {
    return (
        <header className="px-[80px] py-[20px]  bg-white drop-shadow-sm w-full flex">
            <nav className="flex gap-[40px]">
                <Link to="/" className="text-[16px] font-semibold">HOME</Link>
                <Link to="/products" className="text-[16px] font-semibold">PRODUCTS</Link>
                <Link to="/blogs" className="text-[16px] font-semibold">BLOGS</Link>
            </nav>
            <div className="ml-auto flex gap-[10px]">
                <UserRound size={20} />
                <ShoppingCart size={20} />
            </div>
        </header>
    )
}

export default Header