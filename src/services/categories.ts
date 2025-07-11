import axios from '../configs/AxiosConfig';

const getCategories = async (params?: QueryParams) => {
    const data = await axios.get('/categories', { params }) as GetAllResponse<Category, 'categories'>
    return data
}
export { getCategories }