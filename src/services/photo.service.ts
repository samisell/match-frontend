import api from '@/lib/axios';
import { Photo } from '@/types';

export interface UploadPhotoData {
    user_id: number;
    photo: File;
    caption?: string;
    is_primary?: boolean;
}

export interface UpdatePhotoData {
    caption?: string;
    is_primary?: boolean;
}

export const photoService = {
    getPhotos: async (): Promise<Photo[]> => {
        const response = await api.get<Photo[]>('/photos');
        return response.data;
    },

    uploadPhoto: async (data: UploadPhotoData): Promise<Photo> => {
        const formData = new FormData();
        formData.append('user_id', data.user_id.toString());
        formData.append('photo', data.photo);
        if (data.caption) formData.append('caption', data.caption);
        if (data.is_primary !== undefined) formData.append('is_primary', data.is_primary ? '1' : '0');

        const response = await api.post<Photo>('/photos', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getPhoto: async (id: number): Promise<Photo> => {
        const response = await api.get<Photo>(`/photos/${id}`);
        return response.data;
    },

    updatePhoto: async (id: number, data: UpdatePhotoData): Promise<Photo> => {
        const formData = new FormData();
        formData.append('_method', 'PUT'); // Laravel spoofing
        if (data.caption) formData.append('caption', data.caption);
        if (data.is_primary !== undefined) formData.append('is_primary', data.is_primary ? '1' : '0');

        const response = await api.post<Photo>(`/photos/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    },

    setPrimary: async (id: number): Promise<{ message: string }> => {
        const response = await api.post<{ message: string }>(`/photos/${id}/set-primary`);
        return response.data;
    },

    deletePhoto: async (id: number): Promise<{ message: string }> => {
        const response = await api.delete<{ message: string }>(`/photos/${id}`);
        return response.data;
    }
};
