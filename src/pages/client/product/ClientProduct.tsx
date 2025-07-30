import { Breadcrumb, Pagination } from "antd"
import { sizeSelect } from "../../../constants/size"
import FilterSelect from "./ui/FilterSelect"
import ProductItem from "./ui/ProductItem"
import { useProdutcs } from "../../../hooks/useProduct"
import usePaginationSearch from "../../../hooks/usePaginationSearch"
import type { ProductFilters } from "../../admin/product/Product"
import useBreadcrumbItems from "./hooks/useBreadcrumItems"
import { useLocation } from "react-router"
const productItemsPerPage = import.meta.env.VITE_productItemsPerPage
const ClientProduct = () => {
    const { pathname } = useLocation();
    const items = useBreadcrumbItems(pathname)
    const { currentPage, setCurrentPage, keyword, setKeyword, debouncedKeyword, debouncedPage, setSortData, sortData, filters, setFilters } = usePaginationSearch<ProductFilters>()
    const { data: productsData, isPending } = useProdutcs({
        page: debouncedPage,
        limit: productItemsPerPage,
        keyword: debouncedKeyword,
        order: sortData?.sort,
        sort: sortData?.value,
    });
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
                    {productsData?.products.map((value) => {
                        return (
                            <ProductItem item={value} />
                        )
                    })}

                </div>
                <div className="flex justify-end w-full p-[20px] pb-[50px]">
                    <Pagination className="mt-[10px] ml-auto"
                        pageSize={productItemsPerPage}
                        total={productsData?.pagination.total}
                        current={currentPage}
                        onChange={(value) => {
                            setCurrentPage(value)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
export default ClientProduct