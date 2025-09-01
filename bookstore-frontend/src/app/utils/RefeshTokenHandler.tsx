// utils/axiosInstance.ts

import { AccessStored } from '@/app/utils/TokenStore';
import axios from 'axios';

let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void }[] = [];

const processQueue = (error: unknown, token = null) => {
    
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true, // Gửi cookie (refresh token)
});

// Gắn access token từ memory
axiosInstance.interceptors.request.use((config) => {

    const token = AccessStored.getAccessToken();

    if (token) {

        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;

});

// Khi gặp lỗi 401 → tự động gọi refresh-token
axiosInstance.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {

            if (isRefreshing) {


                return new Promise(function (resolve, reject) {

                    failedQueue.push({ resolve, reject });

                }).then((token) => {

                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    
                    return axiosInstance(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {

                const res = await axios.post('/api/refresh-token', {}, { withCredentials: true });

                const newToken = res.data.accessToken;

                //  Lưu access token trong memory
                AccessStored.setAccessToken(newToken);

                axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;

                processQueue(null, newToken);

                return axiosInstance(originalRequest);

            } catch (err) {

                processQueue(err, null);

                AccessStored.clear();

                return Promise.reject(err);

            }
            finally {

                isRefreshing = false;

            }

        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
