import {TaskResponseDTO} from './task';

export interface TaskQueueRequestDTO {
    taskIds: number[];
}

export interface TaskQueueResponseDTO {
    queueId: number;
    tasks: TaskResponseDTO[];
}
