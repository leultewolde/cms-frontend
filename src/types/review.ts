import {UserResponseDTO} from './user';
import {ContentResponseDTO} from './content';

import {ReviewStatus} from './enums';

export interface ReviewRequestDTO {
    feedback: string;
    status: ReviewStatus;
    reviewedByUserId: number;
    contentId: number;
}

export interface ReviewResponseDTO {
    reviewId: number;
    feedback: string;
    status: ReviewStatus;
    reviewedBy: UserResponseDTO;
    content: ContentResponseDTO;
}
