import {PublishingPlatformResponseDTO} from './publishingPlatform';
import {UserResponseDTO} from './user';
import {TaskStatus} from './enums';

export interface TaskRequestDTO {
    title: string;
    description: string;
    deadline: string; // Using ISO string format for date
    status: TaskStatus;
    targetPlatformIds: number[];
    assignedToUserId: number;
}

export interface TaskResponseDTO {
    taskId: number;
    title: string;
    description: string;
    deadline: string; // ISO 8601 format
    status: TaskStatus;
    targetPlatforms: PublishingPlatformResponseDTO[];
    assignedTo: UserResponseDTO;
}
