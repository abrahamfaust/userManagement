import { IUser } from '../store/usersSlice';
import { baseService } from './baseService';

export const getAllUsers = async () => {
    return await baseService('api/users', 'get');
}

export const getUserById = async (userId: string) => {
    return await baseService(`api/users/${userId}`, 'get');
}

export const addUser = async (user: IUser) => {
    return await baseService('api/users', 'POST', user);
}

export const DeleteUserById = async (userId: string) => {
    return await baseService(`api/users/${userId}`, 'delete');
}
export const EditUserById = async ( user: IUser) => {
    return await baseService(`api/users/${user._id}`, 'put', user);
}