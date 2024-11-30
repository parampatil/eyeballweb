// src/store/imageStore.ts
import { create } from "zustand";

interface ImageStore {
  inputImages: File[];
  addInputImage: (image: File) => void;
  removeInputImage: (index: number) => void;
  clearInputImages: () => void;
}

export const useInputImageStore = create<ImageStore>((set) => ({
  inputImages: [],
  addInputImage: (image) => set((state) => ({ inputImages: [...state.inputImages, image] })),
  removeInputImage: (index) =>
    set((state) => ({
      inputImages: state.inputImages.filter((_, i) => i !== index),
    })),
  clearInputImages: () => set({ inputImages: [] }),
}));
