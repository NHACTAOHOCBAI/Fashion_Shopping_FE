// hooks/useUser.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../services/categories';

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
            queryClient.invalidateQueries({ queryKey: ['select categories'] });
        },
    });
};
export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['select categories'] });
        },
    });
};
export const useSelectCategory = () => useQuery({
    queryKey: ['select categories'],
    queryFn: async () => {
        const categories = (await getCategories()).categories;
        const selectOpt = categories.map((category) => {
            return {
                value: category.id,
                label: category.name
            }
        })
        console.log('rerender select')
        return selectOpt
    },
    staleTime: 1000 * 60 * 5, // 5 phút không bị stale
});
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['select categories'] });
        },
    });
}