import {StateCreator} from "zustand";

export interface BearSlice {
    bears: number
    addBear: () => void
}

export const createBearSlice: StateCreator<
    BearSlice,
    [],
    [],
    BearSlice
> = (set) => ({
    bears: 0,
    addBear: () => set((state: BearSlice) => ({ bears: state.bears + 1 })),
})
