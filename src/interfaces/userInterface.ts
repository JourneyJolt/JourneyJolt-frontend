import {ERole} from "../enums";

export interface IUser {
    id: string,
    username: string,
    email: string,
    roles: ERole[],
    enabled: boolean
}

export interface JwtResponse extends IUser {
    token: string,
    type: string
}

export interface SignInRequest {
    username: string,
    password: string
}

export interface SignUpRequest {
    username: string,
    email: string,
    password: string,
    re_password: string
}