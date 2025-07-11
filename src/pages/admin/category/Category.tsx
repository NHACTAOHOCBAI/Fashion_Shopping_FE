import React, { useState, useEffect } from 'react';
import MyTable from '../../../components/MyTable';
import MyClickable from '../../../components/MyClickable';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Input } from 'antd';
import { Search } from 'lucide-react';
import NewCategory from './NewCategory';
const itemsPerPage = 4;
const App: React.FC = () => {
    const [dataSource, setDataSource] = useState<Record<string, any>[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (page: number) => {
        setIsLoading(true);
        try {
            const response = await new Promise<{ data: Record<string, any>[]; total: number }>((resolve) =>
                setTimeout(() => {
                    const start = (page - 1) * itemsPerPage;
                    const end = start + itemsPerPage;
                    const data = [
                        { key: '1', name: 'Mike', age: 32, address: '10 Downing Street' },
                        { key: '2', name: 'John', age: 42, address: '10 Downing Street' },
                        { key: '3', name: 'Mike', age: 32, address: '10 Downing Street' },
                        { key: '4', name: 'John', age: 42, address: '10 Downing Street' },
                        { key: '3', name: 'Mike', age: 32, address: '10 Downing Street' },
                        { key: '4', name: 'John', age: 42, address: '10 Downing Street' },
                    ].slice(start, end);
                    resolve({ data, total: 6 }); // Giả lập tổng số mục
                }, 1000) // Độ trễ 1 giây để mô phỏng loading
            );
            const { data, total } = response;
            setDataSource(data);
            setTotalItems(total);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
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
                    prefix={<Search size={20} strokeWidth={1} />}
                    className='rounded-[14px] p-2 w-[60%] min-w-[200px]'
                    placeholder='Search...'
                />
                <MyTable
                    dataSource={dataSource}
                    columns={columns}
                    totalItems={totalItems}
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