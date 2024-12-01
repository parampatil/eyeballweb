// src/store/modelParametersStore.ts
import { create } from 'zustand';

interface ModelParameters {
  inputImageResolution: number;
  foveaX: number;
  foveaY: number;
  foveaRadius: number;
  peripheralConeCells: number;
  foveaRodCells: number;
  isPeripheralBlurEnabled: boolean;
  kernelValue: string;
  peripheralSigma: number;
  isPeripheralGrayscale: boolean;
  setParameter: (key: keyof ModelParameters, value: number | boolean | string) => void;
}

export const useModelParametersStore = create<ModelParameters>((set) => ({
  inputImageResolution: 300,
  foveaX: 0,
  foveaY: 0,
  foveaRadius: 0,
  peripheralConeCells: 0,
  foveaRodCells: 0,
  isPeripheralBlurEnabled: false,
  kernelValue: '(3, 3)',
  peripheralSigma: 0,
  isPeripheralGrayscale: false,
  setParameter: (key, value) => set((state) => ({ ...state, [key]: value })),
}));