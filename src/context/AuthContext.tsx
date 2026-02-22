'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { userService } from '@/services/user.service';
import { tokenService } from '@/lib/token';
import { User, LoginData, RegisterData, AuthResponse } from '@/types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<User | undefined>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const refreshUser = async () => {
        setIsLoading(true);
        try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
            return currentUser; // Add this line
        } catch (error) {
            console.error('Failed to fetch user profile', error);
            setUser(null);
            tokenService.removeToken();
            throw error; // Add this line
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const token = tokenService.getToken();
        if (token) {
            refreshUser();
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (data: LoginData) => {
        setIsLoading(true);
        try {
            const response: AuthResponse = await authService.login(data);
            tokenService.setToken(response.access_token);
            setUser(response.user);
            if (!response.user.email_verified_at || response.user.is_verified === false) {
                router.push(`/verify-email?email=${encodeURIComponent(response.user.email)}`);
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: RegisterData) => {
        setIsLoading(true);
        try {
            await authService.register(data);
            router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
        } catch (error) {
            console.error('Registration failed', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            tokenService.removeToken();
            setUser(null);
            router.push('/login');
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
