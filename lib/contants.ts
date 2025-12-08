export const ERROR_MESSAGE = {
  // General Info Form
  INGREDIENT_NAME_REQUIRED: "Ingredient name is required",
  SCIENTIFIC_NAME_REQUIRED: "Scientific name is required",
  SANSKRIT_NAME_REQUIRED: "Sanskrit name is required",
  DESCRIPTION_REQUIRED: "Description is required",
  DESCRIPTION_MIN_LENGTH: "Description must be at least 10 characters",
  IMAGE_REQUIRED: "Image is required",

  // Prakriti Impact
  PRAKRITI_IMPACT_REQUIRED: "Prakriti impact is required",
  //Properties
  RASA_REQUIRED: "Rase cannot be empty",
  VEERYA_REQUIRED: "Veerya cannot be empty",
  GUNA_REQUIRED: "Guna cannot be empty",
  VIPAKA_REQUIRED: "Vipaka cannot be empty",
  // Others
  PLANT_PART_REQUIRED: "Plant part is required",
  BEST_COMBINED_WITH_REQUIRED: "Best combined with is required",
  GEOGRAPHICAL_LOCATIONS_REQUIRED: "Geographical locations is required",
};
export const IMPACT_OPTIONS = [
  "Balanced",
  "Mildly Increasing",
  "Unbalanced",
  "Agravate",
];

export const PLANT_PARTS_OPTIONS = [
  "Leaf",
  "Root",
  "Root Bark",
  "Bark",
  "Fruits",
  "Juice/Extract",
  "Pulp",
];

export const INGREDIENT_IMAGES = [
  "/images/khus.png",
  "/images/chandan.png",
  "/images/bhasm.png",
  "/images/giloy.png",
  "/images/bhringraj.png",
];

export const INGREDIENT_NAMES = [
  "Khus Khus",
  "Rakta Chandan",
  "Swarn Bhashm",
  "Giloy",
  "Bhringraj",
];

export const MOCK_INGREDIENTS = Array.from({ length: 50 }, (_, i) => {
  const ingredientIndex = i % INGREDIENT_NAMES.length;
  const occurrenceNumber = Math.floor(i / INGREDIENT_NAMES.length);
  const ingredientName = INGREDIENT_NAMES[ingredientIndex];

  return {
    id: i + 1,
    name: `${ingredientName} ${occurrenceNumber > 0 ? occurrenceNumber : ""}`,
    image: INGREDIENT_IMAGES[ingredientIndex],
    description: `This is a description for ${ingredientName}. It contains beneficial properties.`,
    status: "Active",
  };
});
