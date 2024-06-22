import {ContentResponseDTO} from './content';
import {UserResponseDTO} from './user';

export interface ContentHistoryRequestDTO {
    changeDate: string; // Using ISO string format for date
    changeDescription: string;
    contentId: number;
    modifiedByUserId: number;
}

export interface ContentHistoryResponseDTO {
    changeId: number;
    changeDate: string; // ISO 8601 format
    changeDescription: string;
    content: ContentResponseDTO;
    modifiedBy: UserResponseDTO;
}
