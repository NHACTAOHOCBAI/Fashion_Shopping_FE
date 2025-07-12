import axios from '../configs/AxiosConfig';

const getCategories = async (params?: QueryParams) => {
    const data = await axios.get('/categories', { params }) as GetAllResponse<Category, 'categories'>
    return data
}
const createCategory = async (data: {
    name: string;
    parentId?: number;
    image?: File;
    description?: string;
}) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.parentId) formData.append('parentId', String(data.parentId));
    if (data.description) formData.append('description', data.description);
    if (data.image) formData.append('image', data.image);

    const res = await axios.post('/categories', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res;
};
const updateCategory = async (data: {
    id: number,
    name?: string;
    parentId?: number;
    image?: File;
    description?: string;
}) => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.parentId) formData.append('parentId', String(data.parentId));
    if (data.description) formData.append('description', data.description);
    if (data.image) formData.append('image', data.image);

    const res = await axios.put(`/categories/${data.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res;
};
export { getCategories, createCategory, updateCategory }