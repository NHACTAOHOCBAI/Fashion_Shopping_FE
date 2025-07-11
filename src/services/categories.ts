import axios from '../configs/AxiosConfig';

const getCategories = async (params?: QueryParams) => {
    const data = await axios.get('/categories', { params }) as GetAllResponse<Category, 'categories'>
    return data
}
export const createCategory = async (data: {
    name: string;
    parentId?: number;
    image?: File;
    description?: string;
}) => {
    console.log(data)
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
    return res.data;
};

export { getCategories }