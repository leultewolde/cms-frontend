import api from './api';
import { ContentResponseDTO,ContentRequestDTO } from '@/types/content';

export const getContents = async (): Promise<ContentResponseDTO[]> => {
    const response = await api.get<ContentResponseDTO[]>('/contents');
    return response.data;
};

export const getContentById = async (contentId: number): Promise<ContentResponseDTO> => {
    const response = await api.get<ContentResponseDTO>(`/contents/${contentId}`);
    return response.data;
};

export const createContent = async (content: ContentRequestDTO): Promise<ContentResponseDTO> => {
    const response = await api.post<ContentResponseDTO>('/contents', content);
    return response.data;
};

export const updateContent = async (contentId: number, content: ContentRequestDTO): Promise<ContentResponseDTO> => {
    const response = await api.put<ContentResponseDTO>(`/contents/${contentId}`, content);
    return response.data;
};

export const deleteContent = async (contentId: number): Promise<void> => {
    await api.delete(`/contents/${contentId}`);
};
