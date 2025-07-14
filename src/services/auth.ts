import axios from '../configs/AxiosConfig';
const login = async (data: { email: string, password: string }) => {
    const res = await axios.post('/auth/login', data)
    return res
}
const register = async (data: { email: string, password: string, name: string }) => {
    const res = await axios.post('/auth/register', data)
    return res
}
export { login, register }