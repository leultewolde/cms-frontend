import api from './api';
import { UserResponseDTO, UserRequestDTO } from '@/types/user';

export const getUsers = async (): Promise<UserResponseDTO[]> => {
    const response = await api.get<UserResponseDTO[]>('/users');
    return response.data;
};

export const getUserByUsername = async (username: string): Promise<UserResponseDTO> => {
    const response = await api.get<UserResponseDTO>(`/users/${username}`);
    return response.data;
};

export const createUser = async (user: UserRequestDTO): Promise<UserResponseDTO> => {
    const response = await api.post<UserResponseDTO>('/users', user);
    return response.data;
};

export const updateUser = async (username: string, user: UserRequestDTO): Promise<UserResponseDTO> => {
    const response = await api.put<UserResponseDTO>(`/users/${username}`, user);
    return response.data;
};

export const deleteUser = async (username: string): Promise<void> => {
    await api.delete(`/users/${username}`);
};
