import { Rate } from "antd"
import { CiHeart } from "react-icons/ci"
import NormalButton from "../../../../components/NormalButton"
import { formatPrice } from "../../../../utils/formatPrice"

const ProductItem = () => {
    return (
        <div className="relative bg-white border rounded-lg p-[15px]  w-[240px] duration-500 hover:drop-shadow-lg hover:-translate-y-2 ">
            <CiHeart size={24} className="absolute text-white z-10 translate-x-[180px]  translate-y-[10px]" />
            <div className="absolute text-white bg-black rounded-lg px-[10px] py-[5px] z-10 translate-x-[10px]  translate-y-[10px]">50% OFF</div>
            <div className=" aspect-square rounded-lg overflow-hidden">
                <img className=" duration-500 hover:scale-110" src="https://i.pinimg.com/736x/0a/6c/8a/0a6c8af6388b24b008890992d6b5bb90.jpg" alt="yuta" />
            </div>
            <h3 className="font-bold text-text-heading text-[20px] my-[5px]">Yuta Coat</h3>
            <p>Jujutsu kaisen</p>
            <Rate className="text-[12px]" disabled value={4} />
            <p className="text-[20px] font-bold text-text-heading mb-[10px]">{formatPrice(120)}</p>
            <NormalButton>BUY NOW</NormalButton>
        </div>
    )
}
export default ProductItem