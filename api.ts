import axios from 'axios';
import { User, Photo, Preference, Match, Message } from '@/types';

// Base URL from environment variable or default to local Laravel backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Useful for Sanctum cookie-based auth if needed
});

// Request interceptor to add the Auth token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authService = {
  register: (data: any) => api.post('/register', data),
  login: (data: any) => api.post('/login', data),
  logout: () => api.post('/logout'),
  forgotPassword: (email: string) => api.post('/forgot-password', { email }),
  resetPassword: (data: any) => api.post('/reset-password', data),
};

export const userService = {
  getProfile: () => api.get<User>('/user'),
  getAll: () => api.get<User[]>('/users'),
  getById: (id: number) => api.get<User>(`/users/${id}`),
  update: (id: number, data: Partial<User>) => api.put<User>(`/users/${id}`, data),
  delete: (id: number) => api.delete(`/users/${id}`),
};

export const photoService = {
  getAll: () => api.get<Photo[]>('/photos'),
  upload: (data: FormData) => api.post<Photo>('/photos', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getById: (id: number) => api.get<Photo>(`/photos/${id}`),
  // Note: Using POST with _method: 'PUT' for file updates as per Laravel convention
  update: (id: number, data: FormData) => {
    data.append('_method', 'PUT');
    return api.post<Photo>(`/photos/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  setPrimary: (id: number) => api.post(`/photos/${id}/set-primary`),
  delete: (id: number) => api.delete(`/photos/${id}`),
};

export const preferenceService = {
  getAll: () => api.get<Preference[]>('/preferences'),
  create: (data: Omit<Preference, 'id' | 'created_at' | 'updated_at'>) => api.post<Preference>('/preferences', data),
  getById: (id: number) => api.get<Preference>(`/preferences/${id}`),
  update: (id: number, data: Partial<Preference>) => api.put<Preference>(`/preferences/${id}`, data),
  delete: (id: number) => api.delete(`/preferences/${id}`),
};

export const matchService = {
  getAll: () => api.get<Match[]>('/matches'),
  create: (data: any) => api.post<Match>('/matches', data),
  getById: (id: number) => api.get<Match>(`/matches/${id}`),
  updateStatus: (id: number, status: 'accepted' | 'declined') => api.put<Match>(`/matches/${id}`, { status }),
  delete: (id: number) => api.delete(`/matches/${id}`),
};

export const messageService = {
  getAll: () => api.get<Message[]>('/messages'),
  create: (data: any) => api.post<Message>('/messages', data),
  getById: (id: number) => api.get<Message>(`/messages/${id}`),
  markAsRead: (id: number) => api.put<Message>(`/messages/${id}`, { is_read: true }),
  delete: (id: number) => api.delete(`/messages/${id}`),
};

export const aiService = {
  analyzeProfile: (data: any) => api.post('/ai/analyze-profile', data),
};

// Helper to manage token
export const tokenService = {
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  },
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  },
  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }
};

export default api;