import React, { useEffect } from 'react';
import MyLoading from './MyLoading';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MyClickable from './MyClickable';
import { ChevronsUpDown } from 'lucide-react';
interface Column {
    sort?: boolean
    title: React.ReactNode;
    dataIndex?: string;
    key: string;
    render?: (text: any, record: any) => React.ReactNode;
}

interface TableProps {
    dataSource: Record<string, any>[];
    columns: Column[];
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    onPageChange?: (page: number) => void;
    isLoading?: boolean; // Thêm trạng thái loading
    width?: number; // Thêm thuộc tính width
    sortData?: {
        sort: "asc" | "desc";
        value: string;
    } | undefined,
    setSortData?: (value: {
        sort: "asc" | "desc";
        value: string;
    } | undefined) => void
}

const MyTable: React.FC<TableProps> = ({
    dataSource,
    columns,
    totalItems,
    currentPage,
    itemsPerPage,
    onPageChange,
    isLoading = false,
    width,
    setSortData,
    sortData
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
    const handleSort = (value: string) => {
        if (setSortData) {
            if (sortData?.value === value) {
                setSortData({
                    sort: sortData.sort === "asc" ? "desc" : "asc",
                    value: value
                })
            }
            else {
                setSortData({
                    sort: "asc",
                    value: value
                })
            }
        }
    }
    const handlePageChange = (page: number) => {
        if (onPageChange && page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };
    useEffect(() => {
        console.log(sortData)
    }, [sortData])
    return (
        <div className="container mx-auto" style={{ width: width }}>
            <table className="min-w-full bg-white  rounded-lg border overflow-hidden  ">
                < thead >
                    <tr className="bg-background-gray border-b">
                        {columns.map((column) => (
                            <th key={column.key} className="py-2 px-4 text-left">
                                {(column.sort === undefined || column.sort === false) ?
                                    column.title
                                    :
                                    <div className='flex gap-1 items-center' onClick={() => handleSort(column.key)} >{column.title} <ChevronsUpDown strokeWidth={3} size={10} /></div>
                                }
                            </th>
                        ))}
                    </tr>
                </thead >
                <tbody>
                    {isLoading ? (
                        <tr >
                            <td colSpan={columns.length} className="text-center py-4">
                                <MyLoading />
                            </td>
                        </tr>
                    ) : dataSource.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-4 ">
                                No data available.
                            </td>
                        </tr>
                    ) : (
                        dataSource.map((item) => (
                            <tr key={item.key} className="border-b">
                                {columns.map((column) => (
                                    <td
                                        key={`${item.key}-${column.key}`}
                                        className="py-2 px-4"
                                    >
                                        {column.render
                                            ? column.render(
                                                column.dataIndex ? item[column.dataIndex] : undefined,
                                                item
                                            )
                                            : column.dataIndex
                                                ? item[column.dataIndex]
                                                : null}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>

            </table >
            <div className="flex justify-between items-center mt-4">
                <span>
                    Showing {startIndex} to {endIndex} of {totalItems}
                </span>
                <div className="flex rounded-lg border overflow-hidden bg-background-gray items-center justify-evenly w-[50px] h-[20px]">
                    <MyClickable
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <IoIosArrowBack />
                    </MyClickable>
                    <div className='border h-full'></div>
                    <MyClickable
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                    >
                        <IoIosArrowForward />
                    </MyClickable>
                </div>
            </div>
        </div >
    );
};

export default MyTable;