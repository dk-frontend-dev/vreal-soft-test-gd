import {httpClient} from '@/shared/api/httpClient.ts';
import {AxiosResponse} from 'axios';
import {User} from '@prisma/client';

export const getCurrentUserApi = (): Promise<AxiosResponse<User>> => {
  return httpClient.get('users');
};

export const getAllUsersApi = (): Promise<AxiosResponse<User[]>> => {
  return httpClient.get('users/all');
};
