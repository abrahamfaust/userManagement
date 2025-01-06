import { baseService } from './baseService';
export const loginService = async (username: string, password: string) => {
    return await baseService('api/auth/login', 'POST', { username, password });
}