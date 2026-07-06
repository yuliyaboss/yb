import type { IngredientCategory, RecipeRole } from "@/types/ingredient";

export const ROLE_CATEGORY_MAP: Record<RecipeRole, IngredientCategory> = {
  base: "base",
  protein: "protein",
  fruitPrimary: "fruit",
  fruitSecondary: "fruit",
  vegetable: "vegetable",
  seedNut: "seedNut",
  booster: "booster",
};

/**
 * Slots that make up the base recipe, in display order. Booster is excluded —
 * boosters are opt-in add-ons surfaced separately via the booster picker.
 */
export const RECIPE_ROLES: RecipeRole[] = [
  "base",
  "protein",
  "fruitPrimary",
  "fruitSecondary",
  "vegetable",
  "seedNut",
];

export const SCORING_WEIGHTS = {
  goalWeight: 3,
  emphasisTagBonus: 4,
  inflammationPenaltyMultiplier: 1.5,
  highProteinBonus: 3,
  kidsFriendlyBonus: 5,
  kidsBitterPenalty: 4,
} as const;

export const PREPARATION_STEPS = [
  "Umieść wszystkie składniki płynne w blenderze jako pierwsze.",
  "Dodaj owoce, warzywa i nasiona.",
  "Blenduj przez 45–60 sekund, aż konsystencja będzie gładka.",
  "W razie potrzeby dolej odrobinę wody lub napoju roślinnego, aby dostosować gęstość.",
  "Przelej do szklanki i podawaj od razu.",
];
