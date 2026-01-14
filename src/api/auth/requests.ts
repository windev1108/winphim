import { server } from "../server";
import { ILoginParams, ILoginResponse, ILogoutResponse, IRegisterParams, IRegisterResponse, IUser } from "./types";


export const getProfileRequest = async (): Promise<IUser> => {
    const { data } = await server({
        url: '/auth/me',
        method: 'GET',
    });
    return data
};


export const registerRequest = async (params: IRegisterParams): Promise<IRegisterResponse> => {
    const { data } = await server({
        url: '/auth/register',
        method: 'POST',
        data: params
    });
    return data
};

export const loginRequest = async (params: ILoginParams): Promise<ILoginResponse> => {
    const { data } = await server({
        url: '/auth/login',
        method: 'POST',
        data: params
    });
    return data
};

export const logoutRequest = async (): Promise<ILogoutResponse> => {
    const { data } = await server({
        url: '/auth/logout',
        method: 'POST',
    });
    return data
};

