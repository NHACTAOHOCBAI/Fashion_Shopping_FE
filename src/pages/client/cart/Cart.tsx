import { Checkbox, Drawer } from "antd"
import NormalButton from "../../../components/NormalButton"
import MyCountButton from "../../../components/MyCountButton"
import { FiDelete } from "react-icons/fi"
interface CartProps {
    isOpenCart: boolean
    closeCart: () => void
}
const Cart = ({ isOpenCart, closeCart }: CartProps) => {
    return (
        <Drawer
            size="large"
            title={<div className="flex items-center justify-between">
                <h2 className="text-[24px] font-semibold text-text-heading">Cart updated</h2>
                <NormalButton>Continue shopping</NormalButton>
            </div>}
            onClose={closeCart}
            open={isOpenCart}
            closable={false}
        >
            <div>
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </div>
            <div className="flex items-center text-[16px] justify-between p-[20px]">
                <p>2 items</p>
                <p className="text-text-heading font-bold text-[24px]">Subtotal : $50</p>
            </div>
            <NormalButton className="ml-auto bg-[#FFD470] border-[black]">Proceed to Checkout</NormalButton>
        </Drawer>
    )
}
const CartItem = () => {
    return (
        <div className="flex items-center gap-[10px] border-b-[1px] py-[10px]">
            <Checkbox />
            <div className="flex flex-1 items-center gap-[10px] duration-500 rounded hover:bg-blue-100 p-[10px]">
                <img className="aspect-[5/3] object-contain border  w-[150px]" src="https://i.pinimg.com/736x/0a/6c/8a/0a6c8af6388b24b008890992d6b5bb90.jpg" alt="" />
                <div >
                    <h3 className="font-medium text-[14px] text-gray-500">Nike</h3>
                    <h2 className="text-[20px] font-semibold text-text-heading">Alpha All-Purpose Gen Z</h2>
                    <div className="flex items-center gap-[20px]">
                        <div>Size : 42</div>
                        <div>Color : White</div>
                    </div>
                </div>
                <div className="ml-auto ">
                    <MyCountButton />
                </div>
                <div className="text-[20px] font-semibold text-text-heading">$ 90</div>
            </div>
            <FiDelete size={20} className="text-red-400" />
        </div>
    )
}
export default Cart