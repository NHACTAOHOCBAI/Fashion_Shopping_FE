import { ShoppingBasket } from "lucide-react"
import ClientButton from "../../../components/ClientButton"
import { Avatar, Rate } from "antd"
import { FaShoppingCart } from "react-icons/fa"
const Home = () => {
    return (
        <div className=" pt-[80px]">
            <HeroSection />
            <Review />
            <FeaturedProduct />
        </div>
    )
}
const HeroSection = () => {
    return (
        <div className="min-h-fit px-[80px] flex gap-[20px] h-screen flex-wrap pb-[50px]">
            <div className="flex-[1] ">
                <h2 className="text-[18px]">Trendy & Timeless</h2>
                <h1 className="font-bold text-[70px] max-w-[600px]">
                    Discover <br /> Your Perfect Style
                </h1>
                <p className="text-[18px] max-w-[700px]">
                    Explore the latest fashion trends, timeless wardrobe essentials, and exclusive collections that elevate your style for every season and occasion.
                </p>
                <ClientButton className="mt-[20px]">
                    <div className="flex items-center gap-[10px]"> SHOP NOW <ShoppingBasket size={16} /></div>
                </ClientButton>
            </div>
            <div className="relative flex-[1]">
                <div className="drop-shadow ml-[20px] mt-[20px] max-w-[400px] aspect-square rounded-lg bg-slate-300">
                </div>
                <img className="drop-shadow rounded-lg top-0 left-0 w-[360px] absolute aspect-square " src="/fashion_hero_image.png" alt="fashin_hero_image" />
            </div>
        </div>
    )
}
const Review = () => {
    return (
        <div className="px-[80px] h-screen bg-slate-50 min-h-fit pb-[50px]">
            <div className="flex  flex-col justify-center items-center pt-[40px]" >
                <h2 className="block text-[24px] font-bold ">Reviews</h2>
                <p className="block text-[18px] max-w-[600px] text-center ">"Discover what our satisfied customers have to say about their experiences with our products and services."</p>
            </div>
            <div className="flex justify-between mt-[80px] gap-[10px] flex-wrap gap-y-[20px]">
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
            </div>
        </div>
    )
}
const ReviewItem = () => {
    return (
        <div className="relative duration-500 hover:-translate-y-5 hover:drop-shadow-xl">
            <div className="absolute p-[4px] drop-shadow z-10 bg-slate-100 rounded-full ml-[20px]">
                <Avatar src="https://hobiverse.com.vn/cdn/shop/articles/yuta-okkotsu_thumbnail_hobi.jpg?v=1718011309"
                    size={100}></Avatar>
            </div>
            <div className="rounded-xl mt-[60px] bg-gray-200 min-h-[100px] max-h-[500px] max-w-[400px] p-[40px] pt-[60px]">
                <p className="font-bold text-[18px]">nguyendangphuc20112005</p>
                <Rate className="text-[12px]" disabled value={4} />
                <p className="mt-[15px]">Lorem ipsum has been Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            </div>
        </div>
    )
}
const FeaturedProduct = () => {
    return (
        <div className="px-[80px] h-screen bg-white min-h-fit pb-[50px]">
            <div className="flex  flex-col justify-center items-center pt-[40px]" >
                <h2 className="block text-[24px] font-bold ">Featured Products</h2>
                <p className="block text-[18px] max-w-[600px] text-center ">"Explore our handpicked selection of top-rated products, chosen for their quality, popularity, and innovation."</p>
            </div>
            <div className="flex justify-between mt-[80px] gap-[10px] flex-wrap gap-y-[20px]">
                <FeaturedProductItem />
                <FeaturedProductItem />
                <FeaturedProductItem />
                <FeaturedProductItem />
            </div>
        </div>
    )
}
const FeaturedProductItem = () => {
    return (
        <div className="cursor-pointer hover:scale-105 hover:drop-shadow-xl duration-500 drop-shadow max-w-[300px] bg-gray-100 p-[10px] rounded-lg">
            <div className="relative">
                <img
                    src="https://i.ebayimg.com/images/g/4tYAAOSwalZizmbX/s-l1200.jpg"
                    alt="Yuta coat"
                    className="aspect-[2/3] w-full  rounded-md"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <FaShoppingCart className="text-white" size={24} />
                </div>
            </div>
            <p className="text-[18px] font-semibold mt-[20px]">Yuta coat</p>
            <div className="flex items-center gap-[10px] "><p className="text-[16px]">4.8</p> <Rate className="text-[12px]" disabled value={4} /></div>
        </div>
    )
}
export default Home