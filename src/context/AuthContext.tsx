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
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const refreshUser = async () => {
        try {
            // NOTE: Using authService.getCurrentUser instead of userService.getProfile
            // because that's where I put the /user endpoint call.
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            console.error('Failed to fetch user profile', error);
            setUser(null);
            tokenService.removeToken();
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
            router.push('/dashboard');
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
            const response: AuthResponse = await authService.register(data);
            tokenService.setToken(response.access_token);
            setUser(response.user);
            router.push('/dashboard');
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
