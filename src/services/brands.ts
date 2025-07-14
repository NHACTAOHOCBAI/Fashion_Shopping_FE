import axios from '../configs/AxiosConfig';
interface Brand {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    description?: string;
    logo?: string;
}
const getBrands = async (params?: QueryParams) => {
    const data = await axios.get('/brands', { params }) as GetAllResponse<Brand, 'brands'>
    return data
}
const createBrand = async (data: {
    name: string;
    description?: string;
    logo?: File;
}) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.logo) formData.append('logo', data.logo);

    const res = await axios.post('/brands', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res;
};
const updateBrand = async (data: {
    id: number
    name: string;
    description?: string;
    logo?: File;
}) => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.logo) formData.append('image', data.logo);

    const res = await axios.put(`/brands/${data.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res;
};
const deleteBrand = async (data: { id: number }) => {
    const res = await axios.delete(`/brands/${data.id}`)
    return res
}
export { getBrands, createBrand, updateBrand, deleteBrand }