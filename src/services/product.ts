import axios from '../configs/AxiosConfig';
const getProducts = async (params?: QueryParams) => {
    const data = await axios.get('/products', { params }) as GetAllResponse<Product, 'products'>
    return data
}
const createProduct = async (data: {
    name: string,
    description?: string,
    categoryId: number,
    brandId: number,
    price: number,
    images: File[],
}) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    formData.append('categoryId', String(data.categoryId));
    formData.append('brandId', String(data.brandId));
    formData.append('price', String(data.price));
    // if (data.images.length !== 0) formData.append('images', data.images);

    const res = await axios.post('/products', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res;
};
const deleteProduct = async (data: { id: number }) => {
    const res = await axios.delete(`/products/${data.id}`)
    return res
}
export { getProducts, createProduct, deleteProduct }