import {httpClient} from '@/shared/api/httpClient.ts';
import {AxiosResponse} from 'axios';
import {UserModel} from "@/shared/models/user.model.ts";

export const getCurrentUserApi = (): Promise<AxiosResponse<UserModel>> => {
  return httpClient.get('users');
};

export const getAllUsersApi = (): Promise<AxiosResponse<UserModel[]>> => {
  return httpClient.get('users/all');
};
