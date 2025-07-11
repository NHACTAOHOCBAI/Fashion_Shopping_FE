import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response.data.data,
    async (error) => {
        // Ví dụ xử lý lỗi 401 - unauthorized
        if (error.response?.status === 401) {
            console.warn('Unauthorized! Redirecting to login...');
            // Clear token, redirect, refresh token v.v...
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
