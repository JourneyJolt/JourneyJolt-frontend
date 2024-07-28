import {IMessage, IUser, JwtResponse, SignInRequest, SignUpRequest} from "../interfaces";
import {IRes} from "../types";
import {axiosService} from "./axiosService";
import {urls} from "../constants";

const authService = {
    signIn: (user: SignInRequest): IRes<JwtResponse> => axiosService.post(urls.auth.signIn, user),
    signUp: (user: SignUpRequest): IRes<IMessage> => axiosService.post(urls.auth.signUp, user),
    getMe: (): IRes<IUser> => axiosService.get(urls.auth.me),

    setToken: (token: string) => localStorage.setItem('token', token),
    getToken: () => localStorage.getItem('token'),
    deleteToken: () => localStorage.removeItem('token')
}

export {
    authService
}