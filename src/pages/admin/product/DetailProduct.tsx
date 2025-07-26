import { ChevronRight } from "lucide-react"
import { Link, useParams } from "react-router"
import ProductField from "./ui/ProductField"
import ImageSlider from "../../../components/MyImageDisplay"
import VariantsCard from "./ui/VariantCard"
import Reviews from "./ui/Reviews"
import { useGetProdutcById } from "../../../hooks/useProduct"
import { formatPrice } from "../../../utils/formatPrice"
import { formatDate } from "../../../utils/formatTime"
import MyLoading from "../../../components/MyLoading"
const DetailProduct = () => {
    const { id } = useParams();
    const { data: detailProduct, isPending } = useGetProdutcById(Number(id))
    const thumbnails = detailProduct?.images.map((value, index) => {
        return {
            alt: `Thumbnail ${index}`,
            url: value.imageUrl
        }
    })
    const stock = detailProduct?.variants.reduce((total, value) => {
        return total + Number(value.remaining);
    }, 0) || 0;
    const quantity = detailProduct?.variants.reduce((total, value) => {
        return total + Number(value.quantity);
    }, 0) || 0;
    return (
        isPending ?
            <MyLoading />
            :
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
                            <ImageSlider images={thumbnails} />
                        </div>
                        <div className="flex-[1] flex flex-col gap-[10px]">
                            <ProductField title="Id" value={detailProduct?.id} />
                            <ProductField title="Product name" value={detailProduct?.name} />
                            <ProductField title="Brand" value={detailProduct?.brand.name} />
                            <ProductField title="Category" value={detailProduct?.category.name} />
                            <ProductField title="Price" value={formatPrice(detailProduct?.price)} />
                            <ProductField title="Description" value={detailProduct?.description} />
                            <ProductField title="Stock" value={stock} />
                            <ProductField title="Sold" value={quantity - stock} />
                            <ProductField title="Updated at" value={formatDate(detailProduct?.updatedAt as Date)} />
                            <ProductField title="Created at" value={formatDate(detailProduct?.createdAt as Date)} />
                        </div>
                    </div>
                </div>
                {/* Variant */}
                <div className='bg-white p-[14px] rounded-lg border mt-[10px]'>
                    <h2 className='font-medium text-[14px] mb-[10px] '>Variants</h2>
                    <div className="flex gap-x-[40px] gap-y-[10px] flex-wrap">
                        {detailProduct?.variants.map((value, index) => {
                            return (
                                <VariantsCard item={value} index={index} />
                            )
                        })}
                    </div>
                </div>
                <Reviews />
            </div>
    )
}
export default DetailProduct