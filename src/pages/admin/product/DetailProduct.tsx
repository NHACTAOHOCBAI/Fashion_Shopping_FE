import { ChevronRight } from "lucide-react"
import { Link } from "react-router"
import ProductField from "./ui/ProductField"
import ImageSlider from "../../../components/MyImageDisplay"
import VariantsCard from "./ui/VariantCard"
import Reviews from "./ui/Reviews"
const data = [{
    url: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/10/toji-iconic-panel.jpg",
    alt: "toji"
},
{
    url: "https://static0.srcdn.com/wordpress/wp-content/uploads/2023/11/jujutsu-kaisen_yuta-takes-control.jpg",
    alt: "toji"
}]
const DetailProduct = () => {
    return (
        <div className="w-full">
            {/* Product */}
            <h1 className='font-medium text-[14px] text-text-heading flex items-center'>
                <Link to="/admin/products" className='text-zinc-300'>Products</Link>
                <ChevronRight size={20} className='text-zinc-300' />
                Details Product</h1>
            <div className=' bg-white p-[14px] rounded-lg border mt-[10px]'>
                <h2 className='font-medium text-[14px] mb-[10px] '>Basic Details</h2>
                <div className=" flex gap-[40px]">
                    <div className="flex-[1] border rounded ">
                        <ImageSlider images={data} />
                    </div>
                    <div className="flex-[1] flex flex-col gap-[10px]">
                        <ProductField title="Id" value="001" />
                        <ProductField title="Product name" value="Long-sleeved shirt" />
                        <ProductField title="Brand" value="Gucci" />
                        <ProductField title="Category" value="Shirt" />
                        <ProductField title="Price" value="$90" />
                        <ProductField title="Description" value="Introducing the Nike Alpha All-Purpose Gen Z, the latest evolution in athletic footwear designed to meet the dynamic needs of the modern generation. These cutting-edge trainers represent a fusion of style, technology, and performance, making them a perfect choice for those who value both form and function. The Gen Z boasts a sleek, contemporary design ." />
                        <ProductField title="Stock" value="100" />
                        <ProductField title="Sold" value="230" />
                        <ProductField title="Updated at" value="15 July 2025" />
                        <ProductField title="Created at" value="15 July 2025" />
                    </div>
                </div>
            </div>
            {/* Variant */}
            <div className='bg-white p-[14px] rounded-lg border mt-[10px]'>
                <h2 className='font-medium text-[14px] mb-[10px] '>Variants</h2>
                <div className="flex gap-x-[40px] gap-y-[10px] flex-wrap">
                    <VariantsCard />
                    <VariantsCard />
                </div>
            </div>
            <Reviews />
        </div>
    )
}
export default DetailProduct