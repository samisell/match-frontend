import api from '@/lib/axios';
import { Message } from '@/types';

export interface CreateMessageData {
    receiver_id: number;
    content: string;
}

export interface UpdateMessageData {
    content?: string;
    is_read?: boolean; // Changed to match api.ts usage (is_read: true)
}

export const messageService = {
    getMessages: async (): Promise<Message[]> => {
        const response = await api.get<Message[]>('/messages');
        return response.data;
    },

    createMessage: async (data: CreateMessageData): Promise<Message> => {
        const response = await api.post<Message>('/messages', data);
        return response.data;
    },

    getMessage: async (id: number): Promise<Message> => {
        const response = await api.get<Message>(`/messages/${id}`);
        return response.data;
    },

    updateMessage: async (id: number, data: UpdateMessageData): Promise<Message> => {
        const response = await api.put<Message>(`/messages/${id}`, data);
        return response.data;
    },

    markAsRead: async (id: number): Promise<Message> => {
        const response = await api.put<Message>(`/messages/${id}`, { is_read: true });
        return response.data;
    },

    deleteMessage: async (id: number): Promise<{ message: string }> => {
        const response = await api.delete<{ message: string }>(`/messages/${id}`);
        return response.data;
    }
};
