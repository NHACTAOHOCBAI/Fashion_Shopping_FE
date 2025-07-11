// hooks/useUser.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCategory, getCategories } from '../services/categories';

export const useCategories = (params: QueryParams) =>
    useQuery({
        queryKey: ['categories', params],
        queryFn: () => getCategories(params),
        // keepPreviousData: true, // giữ data cũ khi query thay đổi
    });
export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};