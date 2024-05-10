import { post } from "@/configs/AxiosClient";

export interface LoginForm {
    username: string,
    password: string
}

export const login = async (req: LoginForm) => {
    const response = await post('auth/login', req);
    return response.data;
}