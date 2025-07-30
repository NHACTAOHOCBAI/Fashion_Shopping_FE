import { Rate } from "antd"
import { CiHeart } from "react-icons/ci"
import NormalButton from "../../../../components/NormalButton"
import { formatPrice } from "../../../../utils/formatPrice"
import { Link } from "react-router"

const ProductItem = ({ item }: { item: Product }) => {
    return (
        <Link to={`/product-detail/${item.id}`} className="relative bg-white border rounded-lg p-[15px]  w-[240px] duration-500 hover:drop-shadow-lg hover:-translate-y-2 ">
            <CiHeart size={24} className="absolute text-white z-10 translate-x-[180px]  translate-y-[10px]" />
            <div className="absolute text-white bg-black rounded-lg px-[10px] py-[5px] z-10 translate-x-[10px]  translate-y-[10px]">50% OFF</div>
            <div className=" aspect-square rounded-lg overflow-hidden">
                <img className=" duration-500 hover:scale-110" src={item.images[0].imageUrl} alt={`${item.name} image`} />
            </div>
            <h3 className="font-bold text-text-heading text-[20px] my-[5px]">{item.name}</h3>
            <p>{item.brand.name}</p>
            <Rate className="text-[12px]" disabled value={4} />
            <p className="text-[20px] font-bold text-text-heading mb-[10px]">{formatPrice(item.price)}</p>
            <NormalButton>BUY NOW</NormalButton>
        </Link>
    )
}
export default ProductItem