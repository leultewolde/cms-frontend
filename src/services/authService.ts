import api from './api';
import {AuthResponseDTO, LoginRequestDTO, RegisterRequestDTO} from '@/types/auth';
import {Role} from "@/types/enums";

type MockUser = {
    userId: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    role: Role;
}

const MOCK_USERS: MockUser[] = [
    {
        "userId": 1,
        "firstname": "Test",
        "lastname": "1",
        "username": "test",
        "password": "pass1234",
        "role": Role.ADMINISTRATOR
    }, {
        "userId": 2,
        "firstname": "Test",
        "lastname": "2",
        "username": "test1",
        "password": "pass1234",
        "role": Role.CONTRIBUTOR
    }
];

const findUserByUsername = (username:string): MockUser | undefined => {
    console.log(username)
    return MOCK_USERS.filter((value) => value.username == username).pop()
}

const performLogin = (loginData: LoginRequestDTO): Promise<AuthResponseDTO> => {
    let user = findUserByUsername(loginData.username);
    console.log(user)
    if (user && user.password == loginData.password) {
        let token = (Math.floor(Math.random() * 10000) + 100).toString();
        let authData: AuthResponseDTO = {token, user};
        console.log(authData)
        return Promise.resolve(authData);
    }
    return Promise.reject("Check your credentials.");
}

const performRegister = (registerData: RegisterRequestDTO): Promise<AuthResponseDTO> => {
    let user: MockUser | undefined = findUserByUsername(registerData.username);
    if (!user) {
        let userId = MOCK_USERS[MOCK_USERS.length-1].userId++;
        let user: MockUser = {...registerData, userId}
        MOCK_USERS.push(user);
        let token = (Math.floor(Math.random() * 10000) + 100).toString();
        let authData: AuthResponseDTO = {token, user};
        return Promise.resolve(authData);
    }
    return Promise.reject("User already exists");
}

export const login = async (loginData: LoginRequestDTO): Promise<AuthResponseDTO> => {
    const response = await api.post<AuthResponseDTO>('/auth/login', loginData);
    return response.data;
    // return performLogin(loginData);
};

export const register = async (registerData: RegisterRequestDTO): Promise<AuthResponseDTO> => {
    const response = await api.post<AuthResponseDTO>('/auth/register', registerData);
    return response.data;
    // return performRegister(registerData);
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
};
