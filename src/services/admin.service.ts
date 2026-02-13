import api from '@/lib/axios';
import { EmailTemplate } from '@/types';

export const adminService = {
    getEmailTemplates: async (): Promise<EmailTemplate[]> => {
        const response = await api.get<EmailTemplate[]>('/admin/email-templates');
        return response.data;
    },

    getEmailTemplate: async (id: number): Promise<EmailTemplate> => {
        const response = await api.get<EmailTemplate>(`/admin/email-templates/${id}`);
        return response.data;
    },

    updateEmailTemplate: async (id: number, data: Partial<EmailTemplate>): Promise<EmailTemplate> => {
        const response = await api.put<EmailTemplate>(`/admin/email-templates/${id}`, data);
        return response.data;
    },

    deleteEmailTemplate: async (id: number): Promise<void> => {
        await api.delete(`/admin/email-templates/${id}`);
    }
};
