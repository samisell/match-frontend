import api from '@/lib/axios';
import { Preference } from '@/types';

export interface CreatePreferenceData {
    user_id: number;
    age_min: number;
    age_max: number;
    location_radius_km: number;
    desired_interests: string[];
}

export interface UpdatePreferenceData {
    age_min?: number;
    age_max?: number;
    location_radius_km?: number;
    desired_interests?: string[];
}

export const preferenceService = {
    getPreferences: async (): Promise<Preference[]> => {
        const response = await api.get<Preference[]>('/preferences');
        return response.data;
    },

    createPreference: async (data: CreatePreferenceData): Promise<Preference> => {
        const response = await api.post<Preference>('/preferences', data);
        return response.data;
    },

    getPreference: async (id: number): Promise<Preference> => {
        const response = await api.get<Preference>(`/preferences/${id}`);
        return response.data;
    },

    updatePreference: async (id: number, data: UpdatePreferenceData): Promise<Preference> => {
        const response = await api.put<Preference>(`/preferences/${id}`, data);
        return response.data;
    },

    deletePreference: async (id: number): Promise<{ message: string }> => {
        const response = await api.delete<{ message: string }>(`/preferences/${id}`);
        return response.data;
    }
};
