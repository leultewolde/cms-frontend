import api from './api';
import { TaskResponseDTO, TaskRequestDTO } from '@/types/task';

export const getTasks = async (): Promise<TaskResponseDTO[]> => {
    const response = await api.get<TaskResponseDTO[]>('/tasks');
    return response.data;
};

export const getTaskById = async (taskId: number): Promise<TaskResponseDTO> => {
    const response = await api.get<TaskResponseDTO>(`/tasks/${taskId}`);
    return response.data;
};

export const createTask = async (task: TaskRequestDTO): Promise<TaskResponseDTO> => {
    const response = await api.post<TaskResponseDTO>('/tasks', task);
    return response.data;
};

export const updateTask = async (taskId: number, task: TaskRequestDTO): Promise<TaskResponseDTO> => {
    const response = await api.put<TaskResponseDTO>(`/tasks/${taskId}`, task);
    return response.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
    await api.delete(`/tasks/${taskId}`);
};
