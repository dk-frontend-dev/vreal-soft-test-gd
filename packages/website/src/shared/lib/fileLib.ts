import {envConfig} from "@/shared/constants/envConfig.ts";

export const getFileNameLib = (name: string, extension: string): string => {
  return `${name}${extension}`;
};

export const getFilePathLib = (filename: string) => {
  return `${envConfig.API_URL}/files/file/${filename}`;
}
