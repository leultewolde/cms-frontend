import {UserResponseDTO} from './user';
import {TaskResponseDTO} from './task';
import {ReviewResponseDTO} from './review';
import {ContentStatus} from './enums';

export interface ContentRequestDTO {
    type: string;
    data: string;
    version: string;
    status: ContentStatus;
    createdByUserId: number;
}

export interface ContentResponseDTO {
    contentId: number;
    type: string;
    data: string;
    version: string;
    status: ContentStatus;
    createdBy: UserResponseDTO;
    belongsTo: TaskResponseDTO;
    reviews: ReviewResponseDTO[];
}
