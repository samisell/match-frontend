import api from '@/lib/axios';
import { Notification } from '@/types';

export const notificationService = {
    getNotifications: async (): Promise<Notification[]> => {
        const response = await api.get<Notification[]>('notifications');
        return response.data;
    },

    markAsRead: async (id: number): Promise<Notification> => {
        const response = await api.post<Notification>(`notifications/${id}/read`);
        return response.data;
    },

    markAllAsRead: async (): Promise<{ message: string }> => {
        const response = await api.post<{ message: string }>('notifications/read-all');
        return response.data;
    },

    deleteNotification: async (id: number): Promise<void> => {
        await api.delete(`notifications/${id}`);
    }
};
