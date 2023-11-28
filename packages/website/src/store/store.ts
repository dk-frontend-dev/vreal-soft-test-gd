import { create } from 'zustand'
import {UserSlice, createUserSlice} from "@/store/slices/userSlice.ts";
import {createStorageSlice, StorageSlice} from "@/store/slices/storageSlice.ts";

export const useStore = create<UserSlice & StorageSlice>()((...params) => ({
    ...createUserSlice(...params),
    ...createStorageSlice(...params)
}))
