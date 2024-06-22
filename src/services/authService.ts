import api from './api';
import {AuthResponseDTO, LoginRequestDTO, RegisterRequestDTO} from '@/types/auth';

export const login = async (loginData: LoginRequestDTO): Promise<AuthResponseDTO> => {
    const response = await api.post<AuthResponseDTO>('/auth/authenticate', loginData);
    return response.data;
};

export const register = async (registerData: RegisterRequestDTO): Promise<AuthResponseDTO> => {
    const response = await api.post<AuthResponseDTO>('/auth/register', registerData);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
};
