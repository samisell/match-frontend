/// <reference types="node" />
import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Important for Sanctum/cookies if needed
});

// Request Interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // You can retrieve the token from localStorage, sessionStorage, or cookies
        // For this example, we'll assume it's in localStorage under 'token'
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        // Log request for debugging
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data || '');

        return config;
    },
    (error: AxiosError) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        // Log response for debugging
        console.log(`[API Response] ${response.status} ${response.config.url}`, response.data);
        return response;
    },
    (error: AxiosError) => {
        const status = error.response?.status;
        const url = error.config?.url;

        console.error(`[API Response Error] ${status} ${url}`, error.response?.data || error.message);

        // Handle specific error codes if needed (e.g., 401 Unauthorized)
        if (status === 401) {
            // Clear token and redirect to login if implementing client-side routing
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                // window.location.href = '/login'; // Optional: Redirect to login
            }
        }

        return Promise.reject(error);
    }
);

export default api;
