import api from './api';
import { ContentHistoryResponseDTO,ContentHistoryRequestDTO } from '@/types/contentHistory';

export const getContentHistories = async (): Promise<ContentHistoryResponseDTO[]> => {
    const response = await api.get<ContentHistoryResponseDTO[]>('/content-histories');
    return response.data;
};

export const getContentHistoryById = async (changeId: number): Promise<ContentHistoryResponseDTO> => {
    const response = await api.get<ContentHistoryResponseDTO>(`/content-histories/${changeId}`);
    return response.data;
};

export const getContentHistoriesByContentId = async (contentId: number): Promise<ContentHistoryResponseDTO[]> => {
    const response = await api.get<ContentHistoryResponseDTO[]>(`/content-histories/content/${contentId}`);
    return response.data;
};

export const getContentHistoriesByUserId = async (userId: number): Promise<ContentHistoryResponseDTO[]> => {
    const response = await api.get<ContentHistoryResponseDTO[]>(`/content-histories/user/${userId}`);
    return response.data;
};

export const createContentHistory = async (contentHistory: ContentHistoryRequestDTO): Promise<ContentHistoryResponseDTO> => {
    const response = await api.post<ContentHistoryResponseDTO>('/content-histories', contentHistory);
    return response.data;
};

export const updateContentHistory = async (changeId: number, contentHistory: ContentHistoryRequestDTO): Promise<ContentHistoryResponseDTO> => {
    const response = await api.put<ContentHistoryResponseDTO>(`/content-histories/${changeId}`, contentHistory);
    return response.data;
};

export const deleteContentHistory = async (changeId: number): Promise<void> => {
    await api.delete(`/content-histories/${changeId}`);
};
