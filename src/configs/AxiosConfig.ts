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
    async (error) => {
        if (error.response) {
            // Lỗi có phản hồi từ server
            const message = error.response.data?.message || 'Unknown error from server';
            return Promise.reject(new Error(message)); // ném lỗi với message rõ ràng
        } else if (error.request) {
            // Request được gửi đi nhưng không có phản hồi
            return Promise.reject(new Error('No response from server'));
        } else {
            // Lỗi khác (cấu hình hoặc Axios lỗi)
            return Promise.reject(new Error(error.message || 'Unexpected error'));
        }
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response.data.data,
    async (error) => {
        if (error.response) {
            // Lỗi có phản hồi từ server
            const message = error.response.data?.message || 'Unknown error from server';
            return Promise.reject(new Error(message)); // ném lỗi với message rõ ràng
        } else if (error.request) {
            // Request được gửi đi nhưng không có phản hồi
            return Promise.reject(new Error('No response from server'));
        } else {
            // Lỗi khác (cấu hình hoặc Axios lỗi)
            return Promise.reject(new Error(error.message || 'Unexpected error'));
        }
    }
);

export default axiosInstance;
