import { create } from "zustand";
import { OverviewFormData } from "@/components/add-ingredient-steps/overview";
import { useMulti } from "@/hooks/useMulti";

interface IngredientState {
  ingredient: Partial<OverviewFormData>;
  setIngredient: (ingredient: Partial<OverviewFormData>) => void;
  updateIngredient: (data: Partial<OverviewFormData>) => void;
  clearIngredient: () => void;
}

export const useIngredientStore = create<IngredientState>((set) => ({
  ingredient: {},
  setIngredient: (ingredient) => set({ ingredient }),
  updateIngredient: (data) =>
    set((state) => ({
      ingredient: { ...state.ingredient, ...data },
    })),
  clearIngredient: () => set({ ingredient: {} }),
}));
export const useIngredientStoreSelector = <K extends keyof IngredientState>(
  ...keys: K[]
): Pick<IngredientState, K> => {
  return useMulti(useIngredientStore, ...keys);
};
