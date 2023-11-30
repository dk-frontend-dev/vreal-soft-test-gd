import {StateCreator} from 'zustand';
import {UserModel} from "@/shared/models/user.model.ts";

export interface UserSlice {
  currentUser: UserModel | null;
  setCurrentUser: (currentUser: UserModel | null) => void;
  allUsers: UserModel[] | [];
  setAllUsers: (users: UserModel[]) => void;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = set => ({
  currentUser: null,
  allUsers: [],
  setCurrentUser: (currentUser: UserModel | null) =>
    set((state: UserSlice) => {
      return {
        ...state,
        currentUser
      };
    }),
  setAllUsers: (allUsers: UserModel[]) =>
    set((state: UserSlice) => {
      return {
        ...state,
        allUsers
      };
    })
});
