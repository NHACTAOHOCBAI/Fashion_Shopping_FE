import React, { useCallback, useMemo } from 'react';
import MyTable from '../../../components/MyTable';
import MyClickable from '../../../components/MyClickable';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Button, Input, message } from 'antd';
import { Plus, Search } from 'lucide-react';
import { useSelectCategory } from '../../../hooks/useCategory';
import { formatDate } from '../../../utils/formatTime';
import usePaginationSearch from '../../../hooks/usePaginationSearch';
import MyPopConfirm from '../../../components/MyPopconfirm';
import { useDeleteProduct, useProdutcs } from '../../../hooks/useProduct';
import { formatPrice } from '../../../utils/formatPrice';
import { useSelectBrand } from '../../../hooks/useBrand';

import { useNavigate } from 'react-router';
import ProductFilter from './ui/ProductFilter';
export interface ProductFilters {
    brandId: number[],
    categoryId: number[]
}
const itemsPerPage = import.meta.env.VITE_itemsPerPage;
const Products: React.FC = () => {
    const router = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const { data: categoryOpt } = useSelectCategory()
    const { data: brandOpt } = useSelectBrand()
    //
    const { currentPage, setCurrentPage, keyword, setKeyword, debouncedKeyword, debouncedPage, setSortData, sortData, filters, setFilters } = usePaginationSearch<ProductFilters>()
    const { data: productsData, isPending } = useProdutcs({
        page: debouncedPage,
        limit: itemsPerPage,
        keyword: debouncedKeyword,
        order: sortData?.sort,
        sort: sortData?.value,
    });
    const { mutate: deleteProduct } = useDeleteProduct()
    const handleDelete = useCallback((id: number) => {
        deleteProduct({ id: id }, {
            onSuccess: () => {
                messageApi.success("Delete product success")
            },
            onError: (error) => {
                messageApi.error(error.message)
            },
        },)
    }, [deleteProduct, messageApi])
    const columns = useMemo(() => [
        {
            title: 'Id',
            key: 'id',
            render: (_: any, record: Product) => (
                <p className="text-accent-pinkRed cursor-pointer" onClick={() => router(`/admin/products/detail-product/${record.id}`)} >
                    {`#${record.id}`}
                </p>
            )
        },
        {
            title: 'Image',
            key: 'image',
            render: (_: any, record: Product) => {
                if (record.images[0])
                    return <img className='rounded object-cover size-[50px] bg-black' src={record.images[0].imageUrl} />
                return <div className='rounded object-cover size-[50px] bg-background-gray flex justify-center items-center text-center'> No Image</div>
            }
        },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Brand',
            key: 'brand',
            render: (_: any, record: Product) => (
                <p >
                    {record.brand.name}
                </p>
            )
        },
        {
            title: 'Category',
            key: 'category',
            render: (_: any, record: Product) => (
                <p >
                    {record.category.name}
                </p>
            )
        },
        {
            title: 'Price',
            key: 'price',
            render: (_: any, record: Product) => (
                formatPrice(record.price)
            )
        },
        {
            title: 'Stock',
            key: 'stock',
            render: (_: any, record: Product) => (
                <p>Unknow</p>
            )
        },
        {
            title: <div>Created at</div>,
            sort: true,
            key: 'createdAt',
            render: (_: any, record: Product) => (
                <p >
                    {formatDate(record.createdAt)}
                </p>
            )
        },
        {
            title: 'Updated at',
            sort: true,
            key: 'updatedAt',
            render: (_: any, record: Product) => (
                <p>
                    {formatDate(record.updatedAt)}
                </p>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Product) => (
                <div className="flex rounded-lg border overflow-hidden bg-background-gray items-center justify-evenly w-[70px] h-[30px]">
                    <MyClickable onClick={() => {
                        router(`/admin/products/update-product/${record.id}`)
                    }}>
                        <FaRegEdit />
                    </MyClickable>
                    <div className='border h-full'></div>
                    <MyPopConfirm
                        title="Delete the task"
                        description="Are you sure to delete this product?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <RiDeleteBin6Line className='text-[#EF3826]' />
                    </MyPopConfirm>
                </div>
            ),
        },
    ], [handleDelete, router])
    return (
        <>
            {contextHolder}
            <div className='flex gap-[10px]'>
                <div className='flex-[2] gap-[10px] flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <Input
                            value={keyword}
                            onChange={(e) => {
                                setKeyword(e.target.value);
                                setCurrentPage(1); // reset page khi search
                            }}
                            prefix={<Search size={20} strokeWidth={1} />}
                            className='rounded-[14px] p-2 w-[60%] min-w-[200px]'
                            placeholder='Search product name'
                        />
                        <div className='flex gap-[10px]'>
                            <ProductFilter
                                categoryOpt={categoryOpt}
                                brandOpt={brandOpt}
                                setFilters={setFilters}
                            />
                            <Button onClick={() => router('/admin/products/new-product')} type="primary" className="rounded-2xl flex items-center">
                                <Plus size={16} /> Create
                            </Button>
                        </div>
                    </div>
                    <MyTable
                        setSortData={setSortData}
                        sortData={sortData}
                        dataSource={productsData?.products || []}
                        columns={columns}
                        totalItems={productsData?.pagination.total || 0}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                        isLoading={isPending}
                    />
                </div>
            </div>
        </>
    );
};
export default Products;