export enum AccessType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

export interface FileModel {
  id: string
  name: string
  extension: string
  storedFileName: string
  type: AccessType
  folderId: string | null
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface EditFilePayload {
  name: string;
  type: AccessType;
  file: File[];
  folderId: string;
}

export interface CreateFilePayload {
  name: string;
  type: AccessType;
  file: File[];
}
