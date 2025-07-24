import React, { useCallback, useMemo } from 'react';
import MyTable from '../../../components/MyTable';
import MyClickable from '../../../components/MyClickable';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Input, message } from 'antd';
import { Search } from 'lucide-react';
import NewCategory from './NewCategory';
import { useCategories, useDeleteCategory, useSelectCategory } from '../../../hooks/useCategory';
import { formatDate } from '../../../utils/formatTime';
import UpdateCategory from './UpdateCategory';
import useOpenModal from '../../../hooks/useOpenModal';
import usePaginationSearch from '../../../hooks/usePaginationSearch';
import DetailCategory from './DetailCategory';
import MyPopConfirm from '../../../components/MyPopconfirm';
const itemsPerPage = 4;
const Categories: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { data: updatedCategory, isModalOpen: isUpdateOpen, openModal: openUpdateModal, closeModal: closeUpdateModal } = useOpenModal<Category>()
    const { data: detailCategory, isModalOpen: isDetailOpen, openModal: openDetailModal, closeModal: closeDetailModal } = useOpenModal<Category>()
    //
    const { currentPage, setCurrentPage, keyword, setKeyword, debouncedKeyword, debouncedPage } = usePaginationSearch()
    const { data: categoriesData, isPending } = useCategories({
        page: debouncedPage,
        limit: itemsPerPage,
        keyword: debouncedKeyword,
    });
    const { mutate: deleteCategory } = useDeleteCategory()
    const handleDelete = useCallback((id: number) => {
        deleteCategory({ id: id }, {
            onSuccess: () => {
                messageApi.success("Delete categories success")
            },
            onError: (error) => {
                messageApi.error(error.message)
            },
        },)
    }, [deleteCategory, messageApi])
    const { data: categoryOpt } = useSelectCategory()
    const columns = useMemo(() => [
        {
            title: 'Id',
            key: 'id',
            render: (_: any, record: Category) => (
                <p className="text-accent-pinkRed cursor-pointer" onClick={() => openDetailModal(record)} >
                    {`#${record.id}`}
                </p>
            )
        },
        {
            title: 'Image',
            key: 'image',
            render: (_: any, record: Category) => {
                if (record.imageUrl)
                    return <img className='rounded object-cover size-[50px] bg-black' src={record.imageUrl} />
                return <div className='rounded object-cover size-[50px] bg-background-gray flex justify-center items-center text-center'> No Image</div>
            }
        },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Created at',
            key: 'createdAt',
            render: (_: any, record: Category) => (
                <p >
                    {formatDate(record.createdAt)}
                </p>
            )
        },
        {
            title: 'Updated at',
            key: 'updatedAt',
            render: (_: any, record: Category) => (
                <p>
                    {formatDate(record.updatedAt)}
                </p>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Category) => (
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
                        dataSource={categoriesData?.categories || []}
                        columns={columns}
                        totalItems={categoriesData?.pagination.total || 0}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                        isLoading={isPending}
                    />
                </div>
                <div className='flex-[1]'>
                    <NewCategory categoryOpt={categoryOpt} />
                </div>
                <UpdateCategory
                    categoryOpt={categoryOpt}
                    closeUpdateModal={closeUpdateModal}
                    isUpdateOpen={isUpdateOpen}
                    updatedCategory={updatedCategory}
                />
                <DetailCategory
                    isDetailOpen={isDetailOpen}
                    detailCategory={detailCategory}
                    closeDetailModal={closeDetailModal}
                />
            </div>
        </>
    );
};
export default Categories;