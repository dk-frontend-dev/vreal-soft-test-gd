import {Folder, FolderAccess} from '@prisma/client';

export interface FolderWithGrantedUsers extends Folder {
  access: FolderAccess[];
}

export interface UpdateFolderPayload {
  name: string;
  userEmails: string[];
  parentId: string | null;
}

export interface CreateFolderPayload {
  name: string;
  userEmails: string[];
}
