// src/store/processedImageStore.ts
import { create } from 'zustand';

interface ProcessedImageStore {
  processedImages: File[];
  addProcessedImage: (image: File) => void;
  clearProcessedImages: () => void;
}

export const useProcessedImageStore = create<ProcessedImageStore>((set) => ({
  processedImages: [],
  addProcessedImage: (image) => set((state) => ({ processedImages: [...state.processedImages, image] })),
  clearProcessedImages: () => set({ processedImages: [] }),
}));