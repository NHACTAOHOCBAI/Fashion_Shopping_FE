import { Input, message } from "antd";
import useOpenModal from "../../../hooks/useOpenModal";
import usePaginationSearch from "../../../hooks/usePaginationSearch";
import { useCallback, useMemo } from "react";
import { useBrands, useDeleteBrand } from "../../../hooks/useBrand";
import { formatDate } from "../../../utils/formatTime";
import MyClickable from "../../../components/MyClickable";
import { FaRegEdit } from "react-icons/fa";
import MyPopConfirm from "../../../components/MyPopconfirm";
import { RiDeleteBin6Line } from "react-icons/ri";
import MyTable from "../../../components/MyTable";
import NewBrand from "./NewBrand";
import UpdateBrand from "./UpdateBrand";
import DetailBrand from "./DetailBrand";
import { Search } from "lucide-react";

const itemsPerPage = 4;
const Brands = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { data: updatedBrand, isModalOpen: isUpdateOpen, openModal: openUpdateModal, closeModal: closeUpdateModal } = useOpenModal<Brand>()
    const { data: detailBrand, isModalOpen: isDetailOpen, openModal: openDetailModal, closeModal: closeDetailModal } = useOpenModal<Brand>()
    //
    const { currentPage, setCurrentPage, keyword, setKeyword, debouncedKeyword, debouncedPage } = usePaginationSearch()
    const { data: brandsData, isPending } = useBrands({
        page: debouncedPage,
        limit: itemsPerPage,
        keyword: debouncedKeyword,
    });
    const { mutate: deleteBrand } = useDeleteBrand()
    const handleDelete = useCallback((id: number) => {
        deleteBrand({ id: id }, {
            onSuccess: () => {
                messageApi.success("Delete brands success")
            },
            onError: () => {
                messageApi.error("Delete brands failed")
            },
        },)
    }, [deleteBrand, messageApi])
    const columns = useMemo(() => [
        {
            title: 'Id',
            key: 'id',
            render: (_: any, record: Brand) => (
                <p className="text-accent-pinkRed cursor-pointer" onClick={() => openDetailModal(record)} >
                    {`#${record.id}`}
                </p>
            )
        },
        {
            title: 'Logo',
            key: 'logo',
            render: (_: any, record: Brand) => {
                if (record.logoUrl)
                    return <img className='rounded object-cover size-[50px] bg-black' src={record.logoUrl} />
                return <div className='rounded object-cover size-[50px] bg-background-gray flex justify-center items-center text-center'> No Image</div>
            }
        },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Created at',
            key: 'id',
            render: (_: any, record: Brand) => (
                <p >
                    {formatDate(record.createdAt)}
                </p>
            )
        },
        {
            title: 'Updated at',
            key: 'id',
            render: (_: any, record: Brand) => (
                <p>
                    {formatDate(record.updatedAt)}
                </p>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Brand) => (
                <div className="flex rounded-lg border overflow-hidden bg-background-gray items-center justify-evenly w-[70px] h-[30px]">
                    <MyClickable onClick={() => {
                        openUpdateModal(record)
                    }}>
                        <FaRegEdit />
                    </MyClickable>
                    <div className='border h-full'></div>
                    <MyPopConfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <RiDeleteBin6Line className='text-[#EF3826]' />
                    </MyPopConfirm>
                </div>
            ),
        },
    ], [openUpdateModal, openDetailModal, handleDelete])
    return (
        <>
            {contextHolder}
            <div className='flex gap-[10px]'>
                <div className='flex-[2] gap-[10px] flex flex-col'>
                    <Input
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value);
                            setCurrentPage(1); // reset page khi search
                        }}
                        prefix={<Search size={20} strokeWidth={1} />}
                        className='rounded-[14px] p-2 w-[60%] min-w-[200px]'
                        placeholder='Search...'
                    />
                    <MyTable
                        dataSource={brandsData?.brands || []}
                        columns={columns}
                        totalItems={brandsData?.pagination.total || 0}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                        isLoading={isPending}
                    />
                </div>
                <div className='flex-[1]'>
                    <NewBrand />
                </div>
                <UpdateBrand
                    closeUpdateModal={closeUpdateModal}
                    isUpdateOpen={isUpdateOpen}
                    updatedBrand={updatedBrand}
                />
                <DetailBrand
                    isDetailOpen={isDetailOpen}
                    detailBrand={detailBrand}
                    closeDetailModal={closeDetailModal}
                />
            </div>
        </>
    );
};
export default Brands;