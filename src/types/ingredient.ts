import type { GoalId } from "@/types/goal";

export type IngredientCategory =
  | "base"
  | "protein"
  | "fruit"
  | "vegetable"
  | "seedNut"
  | "booster"
  | "spice";

export interface MacroProfile {
  kcal: number;
  proteinG: number;
  carbsG: number;
  sugarG: number;
  fatG: number;
  fiberG: number;
}

export interface Micronutrient {
  /** Polish display name, e.g. "Witamina C", "Żelazo", "Magnez". */
  name: string;
  /** Display-only approximation, e.g. "12 mg". Not a medical dosage claim. */
  amountLabel: string;
}

export type Flavor =
  | "sweet"
  | "tart"
  | "earthy"
  | "creamy"
  | "neutral"
  | "tropical"
  | "bitter"
  | "spiced";

export type Texture = "smooth" | "thick" | "watery" | "fibrous" | "seedy";

/**
 * Functional tags used by the recommendation engine to match ingredients to
 * goals, and by the copy layer to build explanations. Kept in a soft,
 * non-medical vocabulary per PRD tone-of-voice (section 4).
 */
export type FunctionalTag =
  | "highProtein"
  | "highFiber"
  | "highIron"
  | "highAntioxidant"
  | "antiInflammatory"
  | "energy"
  | "focus"
  | "gutHealth"
  | "nervousSystem"
  | "immunity"
  | "postWorkout"
  | "kidsFriendly"
  | "skinHairBalance"
  | "hydration"
  | "healthyFat"
  | "vitaminC"
  | "calming";

export type DietFlag =
  | "vegan"
  | "vegetarian"
  | "glutenFree"
  | "dairyFree"
  | "kidsSafe";

export type Allergen = "nuts" | "soy" | "gluten" | "dairy" | "banana";

export type RecipeRole =
  | "base"
  | "protein"
  | "fruitPrimary"
  | "fruitSecondary"
  | "vegetable"
  | "seedNut"
  | "booster";

export interface Ingredient {
  id: string;
  slug: string;
  /** Polish display name. */
  name: string;
  category: IngredientCategory;
  /** Optional illustration path; falls back to a category placeholder. */
  image?: string;
  defaultAmountG: number;
  /** Human display unit, e.g. "1 łyżka (10 g)", "1 szklanka (240 ml)". */
  unitLabel: string;
  macrosPer100: MacroProfile;
  micronutrients: Micronutrient[];
  flavor: Flavor[];
  texture: Texture;
  tags: FunctionalTag[];
  /** Relevance score 0-10 per goal; absent goals are treated as 0. */
  goalWeights: Partial<Record<GoalId, number>>;
  dietFlags: DietFlag[];
  allergens: Allergen[];
  /** -3 (strongly anti-inflammatory) .. +3 (pro-inflammatory), used in scoring. */
  inflammationScore: number;
  isBooster: boolean;
  /** Ids of preferred substitutes, same role, ranked best-first. */
  swapCandidateIds: string[];
  /** Short PL seed sentence used by the explainability layer, soft tone only. */
  benefitCopy: string;
}
