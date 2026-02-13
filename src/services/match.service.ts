import api from '@/lib/axios';
import { Match } from '@/types';

export interface CreateMatchData {
    user_id_1: number;
    user_id_2: number;
    status?: string;
}

export interface UpdateMatchData {
    status: 'proposed' | 'accepted' | 'declined';
}

export const matchService = {
    getMatches: async (): Promise<Match[]> => {
        const response = await api.get<Match[]>('/matches');
        return response.data;
    },

    createMatch: async (data: CreateMatchData): Promise<Match> => {
        const response = await api.post<Match>('/matches', data);
        return response.data;
    },

    getMatch: async (id: number): Promise<Match> => {
        const response = await api.get<Match>(`/matches/${id}`);
        return response.data;
    },

    updateMatch: async (id: number, data: UpdateMatchData): Promise<Match> => {
        const response = await api.put<Match>(`/matches/${id}`, data);
        return response.data;
    },

    deleteMatch: async (id: number): Promise<{ message: string }> => {
        const response = await api.delete<{ message: string }>(`/matches/${id}`);
        return response.data;
    }
};
