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
    thumbnails: File[],
    variants: {
        color: string,
        quantity: number,
        size: string,
        variantPrice: number
    }[]
    images: File[]
}) => {
    console.log(data)
};
const deleteProduct = async (data: { id: number }) => {
    const res = await axios.delete(`/products/${data.id}`)
    return res
}
export { getProducts, createProduct, deleteProduct }