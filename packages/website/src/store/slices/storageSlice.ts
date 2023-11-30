import {StateCreator} from 'zustand';
import {FolderModel, FolderWithGrantedUsers} from '@/shared/models/folder.model.ts';
import {FileModel} from "@/shared/models/file.model.ts";

export interface StorageSlice {
  currentFolder: FolderWithGrantedUsers | null;
  files: FileModel[] | null;
  folders: FolderWithGrantedUsers[] | null;
  allFolders: FolderModel[] | null;
  setFiles: (files: FileModel[] | null) => void;
  setFolders: (folders: FolderWithGrantedUsers[] | null) => void;
  setAllFolders: (allFolders: FolderModel[] | null) => void;
  setCurrentFolder: (currentFolder: FolderWithGrantedUsers | null) => void;
}

export const createStorageSlice: StateCreator<StorageSlice, [], [], StorageSlice> = set => ({
  files: null,
  folders: null,
  allFolders: null,
  currentFolder: null,
  setFiles: (files: FileModel[] | null) =>
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
  setAllFolders: (allFolders: FolderModel[] | null) =>
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
