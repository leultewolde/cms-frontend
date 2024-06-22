import {Role} from "@/types/enums";
import {UserResponseDTO} from "@/types/user";

export interface LoginRequestDTO {
    username: string;
    password: string;
}

export interface RegisterRequestDTO {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    role: Role;
}

export interface AuthResponseDTO {
    token: string;
    user: UserResponseDTO;
}
