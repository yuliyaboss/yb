import type { Ingredient } from "@/types/ingredient";
import type { UserPreferences } from "@/types/preferences";

/**
 * Removes ingredients that violate a hard user preference. This runs before
 * scoring — allergen and diet exclusions are never something the scoring
 * layer should merely discourage.
 */
export function filterIngredients(
  ingredients: Ingredient[],
  preferences: UserPreferences,
): Ingredient[] {
  return ingredients.filter((ingredient) => {
    if (preferences.vegan && !ingredient.dietFlags.includes("vegan")) return false;
    if (preferences.vegetarian && !ingredient.dietFlags.includes("vegetarian")) return false;
    if (preferences.glutenFree && !ingredient.dietFlags.includes("glutenFree")) return false;
    if (preferences.dairyFree && !ingredient.dietFlags.includes("dairyFree")) return false;
    if (preferences.noBanana && ingredient.allergens.includes("banana")) return false;
    if (preferences.noNuts && ingredient.allergens.includes("nuts")) return false;
    if (preferences.noSoy && ingredient.allergens.includes("soy")) return false;
    if (preferences.kids && !ingredient.dietFlags.includes("kidsSafe")) return false;
    return true;
  });
}
