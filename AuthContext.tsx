'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService, userService, tokenService } from '../../api';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
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
      const response = await userService.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile', error);
      tokenService.removeToken();
      setUser(null);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = tokenService.getToken();
      if (token) {
        await refreshUser();
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (data: any) => {
    const response = await authService.login(data);
    tokenService.setToken(response.data.access_token);
    await refreshUser();
    router.push('/dashboard');
  };

  const register = async (data: any) => {
    const response = await authService.register(data);
    tokenService.setToken(response.data.access_token);
    await refreshUser();
    router.push('/dashboard');
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      tokenService.removeToken();
      setUser(null);
      router.push('/login');
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