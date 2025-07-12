import { useState } from "react";
import { useDebounce } from "./useDebounce";

const usePaginationSearch = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const debouncedKeyword = useDebounce(keyword, 300);
    const debouncedPage = useDebounce(currentPage, 300);
    return { currentPage, setCurrentPage, keyword, setKeyword, debouncedKeyword, debouncedPage }
}
export default usePaginationSearch