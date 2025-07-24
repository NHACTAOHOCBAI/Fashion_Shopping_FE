import { useState } from "react";
import { useDebounce } from "./useDebounce";

const usePaginationSearch = <TFilters>() => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortData, setSortData] = useState<{
        sort: "asc" | "desc"
        value: string
    }>()
    const [keyword, setKeyword] = useState('');
    const debouncedKeyword = useDebounce(keyword, 300);
    const debouncedPage = useDebounce(currentPage, 300);
    const [filters, setFilters] = useState<TFilters>({} as TFilters);
    return { currentPage, setCurrentPage, keyword, setKeyword, debouncedKeyword, debouncedPage, sortData, setSortData, filters, setFilters }
}
export default usePaginationSearch