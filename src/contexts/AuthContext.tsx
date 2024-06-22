'use client';

import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {LoginRequestDTO, RegisterRequestDTO} from '@/types/auth';
import {login as loginService, register as registerService} from '../services/authService';
import {getUserByUsername} from "@/services/userService";
import {UserResponseDTO} from "@/types/user";

interface AuthContextProps {
    user: UserResponseDTO | null;
    isLoggedIn: boolean;
    login: (data: LoginRequestDTO) => Promise<void>;
    register: (data: RegisterRequestDTO) => Promise<void>;
    logout: () => void;
    findUserByUsername: (username: string) => Promise<UserResponseDTO | null>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<UserResponseDTO | null>(null);
    const router = useRouter();

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (data: LoginRequestDTO) => {
        const response = await loginService(data);
        setUser(response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        router.push('/');
    };

    const register = async (data: RegisterRequestDTO) => {
        const response = await registerService(data);
        setUser(response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        router.push('/');
    };

    const findUserByUsername = async (username: string): Promise<UserResponseDTO | null> => {
        return await getUserByUsername(username);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth/login');
    };

    return (
        <AuthContext.Provider value={{user, isLoggedIn: !!user, login, register, logout, findUserByUsername}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
