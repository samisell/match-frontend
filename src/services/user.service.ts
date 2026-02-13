import api from '@/lib/axios';
import { User } from '@/types';

export interface UpdateUserData {
    name?: string;
    age?: number;
    location?: string;
    interests?: string[];
    // Add other fields from User interface that are updatable if needed
}

export const userService = {
    getUsers: async (): Promise<User[]> => {
        const response = await api.get<User[]>('/users');
        return response.data;
    },

    getUser: async (id: number): Promise<User> => {
        const response = await api.get<User>(`/users/${id}`);
        return response.data;
    },

    updateUser: async (id: number, data: UpdateUserData): Promise<User> => {
        const response = await api.put<User>(`/users/${id}`, data);
        return response.data;
    },

    deleteUser: async (id: number): Promise<{ message: string }> => {
        const response = await api.delete<{ message: string }>(`/users/${id}`);
        return response.data;
    }
};
