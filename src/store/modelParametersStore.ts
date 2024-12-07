// src/store/modelParametersStore.ts
import { create } from 'zustand';

interface ModelParameters {
  inputImageResolution: number;
  foveaRadius: number;
  foveaX: number;
  foveaY: number;
  peripheralConeCells: number;
  foveaRodCells: number;
  isPeripheralBlurEnabled: boolean;
  kernelValue: string;
  peripheralSigma: number;
  isPeripheralGrayscale: boolean;
  foveationType: string;
  retinalWarp: boolean;
  setParameter: (key: keyof ModelParameters, value: number | boolean | string) => void;
  resetParameters: () => void;
}

export const useModelParametersStore = create<ModelParameters>((set) => ({
  inputImageResolution: 256,
  foveaRadius: 15,
  foveaX: 128,
  foveaY: 128,
  peripheralConeCells: 0,
  foveaRodCells: 0,
  isPeripheralBlurEnabled: false,
  kernelValue: '(3, 3)',
  peripheralSigma: 0,
  isPeripheralGrayscale: false,
  foveationType: 'static',
  retinalWarp: false,
  setParameter: (key, value) => set((state) => ({ ...state, [key]: value })),
  resetParameters: () =>
    set(() => ({
      inputImageResolution: 0,
      foveaRadius: 0,
      foveaX: 0,
      foveaY: 0,
      peripheralConeCells: 0,
      foveaRodCells: 0,
      isPeripheralBlurEnabled: false,
      kernelValue: '(3, 3)',
      peripheralSigma: 0,
      isPeripheralGrayscale: false,
      foveationType: 'static',
      retinalWarp: false,
    })),
}));