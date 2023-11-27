import { create } from 'zustand'
import {BearSlice, createBearSlice} from "@/store/slices/userSlice.ts";
import {createFishSlice, FishSlice} from "@/store/slices/homeSlice.ts";

export const useStore = create<BearSlice & FishSlice>()((...params) => ({
    ...createBearSlice(...params),
    ...createFishSlice(...params),
}))
