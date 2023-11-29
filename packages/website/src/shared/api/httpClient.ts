import axios from 'axios';
import {getItem} from '@/shared/lib/localStorageLib.ts';
import {ACCESS_TOKEN_KEY} from '@/shared/constants/commonConstants.ts';

const httpClient = axios.create();

httpClient.interceptors.request.use(config => {
  config.baseURL = 'http://localhost:3000';
  config.headers.set('Authorization', `Bearer ${getItem(ACCESS_TOKEN_KEY)}`);
  return config;
});

export {httpClient};
