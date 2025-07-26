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
    variants: {
        color: string,
        quantity: number,
        size: string,
        price: number
    }[],
    images: File[],
    variant_images: File[]
}) => {
    data.variants = data.variants.map((value) => {
        return {
            remaining: value.quantity,
            ...value
        }
    })
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    formData.append('categoryId', String(data.categoryId));
    formData.append('brandId', String(data.brandId));
    formData.append('price', String(data.price));
    formData.append('variants', JSON.stringify(data.variants));
    data.images.forEach(file => {
        formData.append('images', file);
    });
    data.variant_images.forEach(file => {
        formData.append('variant_images', file);
    });
    const res = await axios.post(`/products`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res;
};
const updateProduct = async (data: {
    id: number,
    name: string,
    description?: string,
    categoryId: number,
    brandId: number,
    price: number,
    variants: {
        color: string,
        quantity: number,
        size: string,
        price: number
    }[],
    images: File[],
    variant_images: File[]
}) => {
    data.variants = data.variants.map((value) => {
        return {
            remaining: value.quantity,
            ...value
        }
    })
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    formData.append('categoryId', String(data.categoryId));
    formData.append('brandId', String(data.brandId));
    formData.append('price', String(data.price));
    formData.append('variants', JSON.stringify(data.variants));
    data.images.forEach(file => {
        formData.append('images', file);
    });
    data.variant_images.forEach(file => {
        formData.append('variant_images', file);
    });
    const res = await axios.put(`/products/${data.id}`, formData, {
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
const getProductById = async (data: { id: number }) => {
    const res = await axios.get(`/products/${data.id}`)
    return res
}
export { getProducts, createProduct, deleteProduct, updateProduct, getProductById }