// hooks/useUser.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBrand, deleteBrand, getBrands, updateBrand } from '../services/brands';

export const useBrands = (params: QueryParams) =>
    useQuery({
        queryKey: ['brands', params],
        queryFn: () => getBrands(params),
        // keepPreviousData: true, // giữ data cũ khi query thay đổi
    });
export const useCreateBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBrand,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] });
            queryClient.invalidateQueries({ queryKey: ['select brands'] });
        },
    });
};
export const useUpdateBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateBrand,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] });
            queryClient.invalidateQueries({ queryKey: ['select brands'] });
        },
    });
};
export const useSelectBrand = () => useQuery({
    queryKey: ['select brands'],
    queryFn: async () => {
        const brands = (await getBrands()).brands;
        const selectOpt = brands.map((category) => {
            return {
                value: category.id,
                label: category.name
            }
        })
        return [
            { value: 0, label: "No parent" },
            ...selectOpt
        ]
    }
});
export const useDeleteBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBrand,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] });
            queryClient.invalidateQueries({ queryKey: ['select brands'] });
        },
    });
}