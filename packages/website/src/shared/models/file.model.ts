import {AccessType} from '@prisma/client';

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
