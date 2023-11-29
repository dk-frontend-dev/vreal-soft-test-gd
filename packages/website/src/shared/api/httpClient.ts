import axios, {HttpStatusCode} from 'axios';
import {getItem} from '@/shared/lib/localStorageLib.ts';
import {ACCESS_TOKEN_KEY} from '@/shared/constants/commonConstants.ts';
import {envConfig} from "@/shared/constants/envConfig.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import {Routes} from "@/shared/constants/routeConstants.ts";

const httpClient = axios.create();

export const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    httpClient.interceptors.request.use(config => {
      config.baseURL = envConfig.API_URL;
      config.headers.set('Authorization', `Bearer ${getItem(ACCESS_TOKEN_KEY)}`);
      return config;
    });

    httpClient.interceptors.response.use(
        null,
        (error) => {

          if (error.response.status === HttpStatusCode.Unauthorized) {
            navigate(Routes.LOGIN);
          }

          return Promise.reject(error);
        }
    );
  }, [])
}

export {httpClient};
