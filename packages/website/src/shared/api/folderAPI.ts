import {httpClient} from '@/shared/api/httpClient.ts';
import {AxiosResponse} from 'axios';
import {
  CreateFolderPayload,
  FolderModel,
  FolderWithGrantedUsers,
  UpdateFolderPayload
} from '@/shared/models/folder.model.ts';
import {rootFolderIdLib} from '@/shared/lib/rootFolderIdLib.ts';

export const getAllFoldersApi = (search: string = ''): Promise<AxiosResponse<FolderWithGrantedUsers[]>> => {
  return httpClient.get('folders/all', {params: {name: search}});
};

export const getFoldersApi = (parentId?: string | null): Promise<AxiosResponse<FolderWithGrantedUsers[]>> => {
  return httpClient.get('folders', {params: {parentId}});
};

export const deleteFolderApi = (folderId: string): Promise<AxiosResponse<void>> => {
  return httpClient.delete(`folders/${folderId}`);
};

export const updateFolderApi = (folderId: string, payload: UpdateFolderPayload) => {
  return httpClient.put(`folders/${folderId}`, {...payload, parentId: rootFolderIdLib(payload.parentId)});
};

export const createFolderApi = (payload: CreateFolderPayload, parentId?: string): Promise<AxiosResponse<FolderModel>> => {
  return httpClient.post('folders', {
    ...payload,
    parentId
  });
};
