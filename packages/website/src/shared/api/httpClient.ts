import axios from 'axios';
import {getItem} from '@/shared/lib/localStorageLib.ts';
import {ACCESS_TOKEN_KEY} from '@/shared/constants/commonConstants.ts';
import {envConfig} from "@/shared/constants/envConfig.ts";

const httpClient = axios.create();

httpClient.interceptors.request.use(config => {
  config.baseURL = envConfig.API_URL;
  config.headers.set('Authorization', `Bearer ${getItem(ACCESS_TOKEN_KEY)}`);
  return config;
});

export {httpClient};
