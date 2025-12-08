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
  ingredient: {
    ingredientName: "",
    scientificName: "",
    sanskritName: "",
    description: "",
    image: "",
    whyToUse: [{ description: "" }],
    prakritiImpact: {
      vata: "",
      vataReason: "",
      pitta: "",
      pittaReason: "",
      kapha: "",
      kaphaReason: "",
    },
    benefits: [{ image: "", description: "" }],
    plantParts: [],
    bestCombinedWith: "",
    geographicalLocations: "",
    therapeuticUses: [{ description: "" }],
    ayurvedicProperties: {
      rasa: "",
      veerya: "",
      guna: "",
      vipaka: "",
    },
    importantFormulations: [{ image: "", description: "" }],
  },
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
