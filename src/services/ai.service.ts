import api from '@/lib/axios';
import { AiAnalysisResponse } from '@/types';

export const aiService = {
    analyzeProfile: async (data: any): Promise<AiAnalysisResponse> => {
        const response = await api.post<AiAnalysisResponse>('/ai/analyze-profile', data);
        return response.data;
    },
};
