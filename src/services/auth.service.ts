import api from '@/lib/axios';
import { User, LoginData, RegisterData, AuthResponse } from '@/types';

export const authService = {
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/register', data);
        return response.data;
    },

    login: async (data: LoginData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/login', data);
        return response.data;
    },

    logout: async (): Promise<{ message: string }> => {
        const response = await api.post<{ message: string }>('/logout');
        return response.data;
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await api.get<User>('/user');
        return response.data;
    },

    forgotPassword: async (email: string): Promise<{ message: string }> => {
        const response = await api.post<{ message: string }>('/forgot-password', { email });
        return response.data;
    },

    resetPassword: async (data: any): Promise<{ message: string }> => {
        const response = await api.post<{ message: string }>('/reset-password', data);
        return response.data;
    },

    verifyEmail: async (email: string, otp: string): Promise<{ message: string }> => {
        const response = await api.post<{ message: string }>('/verify-email', { email, otp });
        return response.data;
    }
};
