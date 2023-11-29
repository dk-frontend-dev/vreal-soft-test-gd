import {StateCreator} from "zustand";
import {File} from "@prisma/client";
import {FolderWithGrantedUsers} from "@/shared/models/folder.model.ts";

export interface StorageSlice {
    currentFolder: FolderWithGrantedUsers | null;
    files: File[] | null;
    folders: FolderWithGrantedUsers[] | null;
    setFiles: (files: File[] | null) => void;
    setFolders: (folders: FolderWithGrantedUsers[] | null) => void;
    setCurrentFolder: (currentFolder: FolderWithGrantedUsers | null) => void;
}

export const createStorageSlice: StateCreator<
    StorageSlice,
    [],
    [],
    StorageSlice
> = (set) => ({
    files: null,
    folders: null,
    currentFolder: null,
    setFiles: (files: File[] | null) => set((state) => {
        return {
            ...state,
            files
        }
    }),
    setFolders: (folders: FolderWithGrantedUsers[] | null) => set((state) => {
        return {
            ...state,
            folders
        }
    }),
    setCurrentFolder: (currentFolder: FolderWithGrantedUsers | null) => set((state) => {
        return {
            ...state,
            currentFolder
        }
    }),
})
