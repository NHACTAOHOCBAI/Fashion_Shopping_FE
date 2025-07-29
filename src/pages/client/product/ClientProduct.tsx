import { Breadcrumb, Pagination } from "antd"
import { sizeSelect } from "../../../constants/size"
import FilterSelect from "./ui/FilterSelect"
import ProductItem from "./ui/ProductItem"
import { useLocation } from "react-router"

const ClientProduct = () => {
    const { pathname } = useLocation();
    const endpoints = pathname.split('/')
    const items: {
        title: string
        href?: string
    }[] = [
            {
                title: "Products",
                href: '/products',
            },
        ]
    endpoints.forEach((value, index) => {
        if (index <= 1)
            return;
        items.push({
            title: endpoints[index],
            href: value
        })
    })
    if (items.length === 1)
        items.push({
            title: "All",
            href: '',
        },)
    return (
        <div className="px-[80px]" >
            <Breadcrumb
                className="py-[20px]"
                items={items}
            />
            <div >
                <div className="flex gap-[10px]">
                    <h1 className="font-bold text-text-heading text-[40px]">Yuta</h1>
                    <span className="pt-[25px]">( 57 )</span>
                </div>
                <div className="rounded-lg bg-[#FFF9EB] p-[6px] flex justify-between ">
                    <div>
                        <FilterSelect placeholder="Price" data={sizeSelect} />
                        <FilterSelect placeholder="Size" data={sizeSelect} />
                        <FilterSelect placeholder="Sale" data={sizeSelect} />
                        <FilterSelect placeholder="Brand" data={sizeSelect} />
                        <FilterSelect placeholder="Color" data={sizeSelect} />
                    </div>
                    <div>
                        <FilterSelect placeholder="Newest" data={sizeSelect} />
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-[10px] p-[10px]">
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                </div>
                <div className="flex justify-end w-full p-[20px] pb-[50px]">
                    <Pagination className="mt-[10px] ml-auto"
                        pageSize={5} total={50} />
                </div>
            </div>
        </div>
    )
}

export default ClientProduct