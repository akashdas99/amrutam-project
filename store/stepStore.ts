import { create } from "zustand";
import { useMulti } from "@/hooks/useMulti";

interface StepState {
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}

export const useStepStore = create<StepState>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
  resetStep: () => set({ step: 1 }),
}));

export const useStepStoreSelector = <K extends keyof StepState>(
  ...keys: K[]
): Pick<StepState, K> => {
  return useMulti(useStepStore, ...keys);
};
