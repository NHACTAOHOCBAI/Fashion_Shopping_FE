import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"
import { useState } from "react"
import Cart from "../../pages/client/cart/Cart"

const ClientLayout = () => {
    const [isOpenCart, setIsOpenCart] = useState(false)
    const openCart = () => {
        setIsOpenCart(true)
    }
    const closeCart = () => {
        setIsOpenCart(false)
    }
    return (
        <div>
            <Header openCart={openCart} closeCart={closeCart} />
            <Outlet />
            <Footer />
            <Cart
                isOpenCart={isOpenCart}
                closeCart={closeCart} />
        </div>
    )
}

export default ClientLayout