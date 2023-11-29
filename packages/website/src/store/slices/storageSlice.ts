import {StateCreator} from 'zustand';
import {File, Folder} from '@prisma/client';
import {FolderWithGrantedUsers} from '@/shared/models/folder.model.ts';

export interface StorageSlice {
  currentFolder: FolderWithGrantedUsers | null;
  files: File[] | null;
  folders: FolderWithGrantedUsers[] | null;
  allFolders: Folder[] | null;
  setFiles: (files: File[] | null) => void;
  setFolders: (folders: FolderWithGrantedUsers[] | null) => void;
  setAllFolders: (allFolders: Folder[] | null) => void;
  setCurrentFolder: (currentFolder: FolderWithGrantedUsers | null) => void;
}

export const createStorageSlice: StateCreator<StorageSlice, [], [], StorageSlice> = set => ({
  files: null,
  folders: null,
  allFolders: null,
  currentFolder: null,
  setFiles: (files: File[] | null) =>
    set(state => {
      return {
        ...state,
        files
      };
    }),
  setFolders: (folders: FolderWithGrantedUsers[] | null) =>
    set(state => {
      return {
        ...state,
        folders
      };
    }),
  setAllFolders: (allFolders: Folder[] | null) =>
    set(state => {
      return {
        ...state,
        allFolders
      };
    }),
  setCurrentFolder: (currentFolder: FolderWithGrantedUsers | null) =>
    set(state => {
      return {
        ...state,
        currentFolder
      };
    })
});
