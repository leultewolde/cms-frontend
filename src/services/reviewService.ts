import api from './api';
import { ReviewResponseDTO,ReviewRequestDTO } from '@/types/review';

export const getReviews = async (): Promise<ReviewResponseDTO[]> => {
    const response = await api.get<ReviewResponseDTO[]>('/reviews');
    return response.data;
};

export const getReviewById = async (reviewId: number): Promise<ReviewResponseDTO> => {
    const response = await api.get<ReviewResponseDTO>(`/reviews/${reviewId}`);
    return response.data;
};

export const createReview = async (review: ReviewRequestDTO): Promise<ReviewResponseDTO> => {
    const response = await api.post<ReviewResponseDTO>('/reviews', review);
    return response.data;
};

export const updateReview = async (reviewId: number, review: ReviewRequestDTO): Promise<ReviewResponseDTO> => {
    const response = await api.put<ReviewResponseDTO>(`/reviews/${reviewId}`, review);
    return response.data;
};

export const deleteReview = async (reviewId: number): Promise<void> => {
    await api.delete(`/reviews/${reviewId}`);
};
