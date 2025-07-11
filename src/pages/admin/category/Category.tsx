import React, { useState } from 'react';
import MyTable from '../../../components/MyTable';
import MyClickable from '../../../components/MyClickable';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Input } from 'antd';
import { Search } from 'lucide-react';
import NewCategory from './NewCategory';
import { useCategories } from '../../../hooks/useCategory';
import { formatDate } from '../../../utils/formatTime';
import { useDebounce } from '../../../hooks/useDebounce';
const itemsPerPage = 4;
const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    // ✅ Debounced values
    const debouncedKeyword = useDebounce(keyword, 300);
    const debouncedPage = useDebounce(currentPage, 300);
    const { data: categoriesData, isLoading } = useCategories({
        page: debouncedPage,
        limit: itemsPerPage,
        keyword: debouncedKeyword,
    });
    const columns = [
        {
            title: 'Id',
            key: 'id',
            render: (_: any, record: Category) => (
                <p className="text-accent-pinkRed">
                    {`#${record.id}`}
                </p>
            )
        },
        {
            title: 'Image',
            key: 'image',
            render: (_: any, record: Category) => (
                <img className='rounded object-cover size-[50px] bg-black' src={record.imageUrl} />
            )
        },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Created at',
            key: 'id',
            render: (_: any, record: Category) => (
                <p >
                    {formatDate(record.createdAt)}
                </p>
            )
        },
        {
            title: 'Updated at',
            key: 'id',
            render: (_: any, record: Category) => (
                <p>
                    {formatDate(record.updatedAt)}
                </p>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <div className="flex rounded-lg border overflow-hidden bg-background-gray items-center justify-evenly w-[70px] h-[30px]">
                    <MyClickable>
                        <FaRegEdit />
                    </MyClickable>
                    <div className='border h-full'></div>
                    <MyClickable >
                        <RiDeleteBin6Line className='text-[#EF3826]' />
                    </MyClickable>
                </div>
            ),
        },
    ];

    return (
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
                    isLoading={isLoading}
                />
            </div>
            <div className='flex-[1]'>
                <NewCategory />
            </div>
        </div>
    );
};

export default App;