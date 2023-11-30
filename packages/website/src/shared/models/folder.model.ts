export interface FolderModel {
  id: string
  name: string
  parentId: string | null
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface FolderAccess {
  id: string
  folderId: string
  userEmail: string
}

export interface FolderWithGrantedUsers extends FolderModel {
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
