import {Role} from './enums';

export interface UserRequestDTO {
    username: string;
    role: Role;
}

export interface UserResponseDTO {
    userId: number;
    username: string;
    role: Role;
}
