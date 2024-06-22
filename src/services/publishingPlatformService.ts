import api from './api';
import { PublishingPlatformResponseDTO,PublishingPlatformRequestDTO } from '@/types/publishingPlatform';

export const getPublishingPlatforms = async (): Promise<PublishingPlatformResponseDTO[]> => {
    const response = await api.get<PublishingPlatformResponseDTO[]>('/publishing-platforms');
    return response.data;
};

export const getPublishingPlatformById = async (platformId: number): Promise<PublishingPlatformResponseDTO> => {
    const response = await api.get<PublishingPlatformResponseDTO>(`/publishing-platforms/${platformId}`);
    return response.data;
};

export const createPublishingPlatform = async (platform: PublishingPlatformRequestDTO): Promise<PublishingPlatformResponseDTO> => {
    const response = await api.post<PublishingPlatformResponseDTO>('/publishing-platforms', platform);
    return response.data;
};

export const updatePublishingPlatform = async (platformId: number, platform: PublishingPlatformRequestDTO): Promise<PublishingPlatformResponseDTO> => {
    const response = await api.put<PublishingPlatformResponseDTO>(`/publishing-platforms/${platformId}`, platform);
    return response.data;
};

export const deletePublishingPlatform = async (platformId: number): Promise<void> => {
    await api.delete(`/publishing-platforms/${platformId}`);
};
