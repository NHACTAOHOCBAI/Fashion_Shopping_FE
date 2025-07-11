// hooks/useUser.ts
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/categories';

export const useCategories = (params: QueryParams) =>
    useQuery({
        queryKey: ['categories', params],
        queryFn: () => getCategories(params),
        // keepPreviousData: true, // giữ data cũ khi query thay đổi
    });
