import api from './api';
import { TaskQueueResponseDTO,TaskQueueRequestDTO } from '@/types/taskQueue';

export const getTaskQueues = async (): Promise<TaskQueueResponseDTO[]> => {
    const response = await api.get<TaskQueueResponseDTO[]>('/task-queues');
    return response.data;
};

export const getTaskQueueById = async (queueId: number): Promise<TaskQueueResponseDTO> => {
    const response = await api.get<TaskQueueResponseDTO>(`/task-queues/${queueId}`);
    return response.data;
};

export const createTaskQueue = async (taskQueue: TaskQueueRequestDTO): Promise<TaskQueueResponseDTO> => {
    const response = await api.post<TaskQueueResponseDTO>('/task-queues', taskQueue);
    return response.data;
};

export const updateTaskQueue = async (queueId: number, taskQueue: TaskQueueRequestDTO): Promise<TaskQueueResponseDTO> => {
    const response = await api.put<TaskQueueResponseDTO>(`/task-queues/${queueId}`, taskQueue);
    return response.data;
};

export const deleteTaskQueue = async (queueId: number): Promise<void> => {
    await api.delete(`/task-queues/${queueId}`);
};
