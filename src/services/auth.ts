import axiosInstance from '../configs/AxiosConfig';
import axios from 'axios';
const login = async (data: { email: string, password: string }) => {
    const res = await axiosInstance.post('/auth/login', data) as { user: User, accessToken: string }
    return res
}
const register = async (data: { email: string, password: string, name: string }) => {
    const res = await axiosInstance.post('/auth/register', data)
    return res
}
const verifyEmail = async (data: { token: string }) => {
    const res = await axiosInstance.post('/auth/verify-email', data);
    return res;
}
const loginGoogle = async (data: { email: string, name: string, avatarUrl: string }) => {
    const res = await axiosInstance.post('/auth/google', {
        email: data.email,
        name: data.name,
        avatar: data.avatarUrl,
    }) as { accessToken: string, user: User, refreshToken: string }
    return res
}
const getGoogleUser = async (accessToken: string) => {
    const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data as { email: string, name: string, picture: string };
}
export { login, register, verifyEmail, loginGoogle, getGoogleUser }