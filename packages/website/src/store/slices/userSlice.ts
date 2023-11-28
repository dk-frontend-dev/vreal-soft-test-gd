import {StateCreator} from "zustand";
import {User} from '@prisma/client';

export interface UserSlice {
    currentUser: User | null;
    setCurrentUser: (currentUser: User | null) => void;
    allUsers: User[] | [];
    setAllUsers: (users: User[]) => void;
}

export const createUserSlice: StateCreator<
    UserSlice,
    [],
    [],
    UserSlice
> = (set) => ({
    currentUser: null,
    allUsers: [],
    setCurrentUser: (currentUser: User | null) => set((state: UserSlice) => {
        return {
            ...state,
            currentUser
        }
    }),
    setAllUsers: (allUsers: User[]) => set((state: UserSlice) => {
        return {
            ...state,
            allUsers
        }
    }),
})
