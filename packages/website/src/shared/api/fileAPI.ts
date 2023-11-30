import {httpClient} from '@/shared/api/httpClient.ts';
import {AxiosResponse} from 'axios';
import {CreateFilePayload, EditFilePayload, FileModel} from '@/shared/models/file.model.ts';
import {rootFolderIdLib} from '@/shared/lib/rootFolderIdLib.ts';

export const getFilesApi = (folderId?: string | null): Promise<AxiosResponse<FileModel[]>> => {
  return httpClient.get('files', {params: {folderId}});
};

export const getAllFilesApi = (search: string): Promise<AxiosResponse<FileModel[]>> => {
  return httpClient.get('files/all', {params: {name: search}})
}

export const deleteFileApi = (fileId: string): Promise<AxiosResponse<void>> => {
  return httpClient.delete(`files/${fileId}`);
};

export const updateFileApi = (fileId: string, payload: EditFilePayload): Promise<AxiosResponse<FileModel>> => {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('type', payload.type);

  if (payload.file) {
    formData.append('file', payload.file[0]);
  }

  return httpClient.put(`files/${fileId}`, formData, {params: {folderId: rootFolderIdLib(payload.folderId)}});
};

export const createFileApi = (payload: CreateFilePayload, currentFolderId?: string): Promise<AxiosResponse<FileModel>> => {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('type', payload.type);
  formData.append('file', payload.file[0]);

  return httpClient.post('files', formData, {params: {folderId: currentFolderId}});
};
