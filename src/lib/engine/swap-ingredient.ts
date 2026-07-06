import type { Ingredient, RecipeRole } from "@/types/ingredient";
import type { Goal } from "@/types/goal";
import type { UserPreferences } from "@/types/preferences";
import type { Recipe } from "@/types/recipe";
import { INGREDIENTS, getIngredientById } from "@/lib/data/ingredients";
import { filterIngredients } from "@/lib/engine/filter-allergens";
import { scoreIngredients } from "@/lib/engine/score-ingredients";
import { ROLE_CATEGORY_MAP } from "@/lib/engine/rules";
import { buildExplanation, buildGoalExplanation } from "@/lib/engine/explainability";
import { calculateNutrition } from "@/lib/engine/nutrition-calculator";
import { buildShoppingList } from "@/lib/engine/shopping-list";

function candidatesForRole(
  recipe: Recipe,
  goal: Goal,
  preferences: UserPreferences,
  role: RecipeRole,
  excludeIds: string[] = [],
): { currentIngredientId: string; candidates: Ingredient[] } | undefined {
  const currentEntry = recipe.entries.find((entry) => entry.role === role);
  if (!currentEntry) return undefined;

  const usedIds = new Set(recipe.entries.map((entry) => entry.ingredient.id));
  const category = ROLE_CATEGORY_MAP[role];

  const eligible = filterIngredients(INGREDIENTS, preferences).filter(
    (ingredient) =>
      ingredient.category === category &&
      ingredient.id !== currentEntry.ingredient.id &&
      !usedIds.has(ingredient.id) &&
      !excludeIds.includes(ingredient.id),
  );

  return {
    currentIngredientId: currentEntry.ingredient.id,
    candidates: scoreIngredients(eligible, goal, preferences).map((entry) => entry.ingredient),
  };
}

/** Top alternatives for a role, ranked best-first — powers the swap sheet UI. */
export function getSwapCandidates(
  recipe: Recipe,
  goal: Goal,
  preferences: UserPreferences,
  role: RecipeRole,
  limit = 4,
): Ingredient[] {
  return candidatesForRole(recipe, goal, preferences, role)?.candidates.slice(0, limit) ?? [];
}

function applyIngredient(recipe: Recipe, goal: Goal, role: RecipeRole, next: Ingredient): Recipe {
  const entries = recipe.entries.map((entry) =>
    entry.role === role
      ? {
          ...entry,
          ingredient: next,
          amountG: next.defaultAmountG,
          explanation: buildExplanation(next, goal),
        }
      : entry,
  );

  return {
    ...recipe,
    entries,
    totals: calculateNutrition(entries),
    goalExplanation: buildGoalExplanation(goal, entries),
    shoppingList: buildShoppingList(entries),
  };
}

/** Swaps in a specific, user-chosen ingredient for the given role. */
export function swapToIngredient(
  recipe: Recipe,
  goal: Goal,
  role: RecipeRole,
  ingredientId: string,
): Recipe {
  const next = getIngredientById(ingredientId);
  if (!next) return recipe;
  return applyIngredient(recipe, goal, role, next);
}

/**
 * Replaces one ingredient in a recipe with the next-best fit for the same
 * role, respecting current preferences and avoiding ingredients already used
 * elsewhere in the recipe or previously swapped away in this session.
 */
export function swapIngredient(
  recipe: Recipe,
  goal: Goal,
  preferences: UserPreferences,
  role: RecipeRole,
  excludeIds: string[] = [],
): Recipe {
  const result = candidatesForRole(recipe, goal, preferences, role, excludeIds);
  if (!result) return recipe;

  const currentEntry = recipe.entries.find((entry) => entry.role === role)!;
  const preferredId = currentEntry.ingredient.swapCandidateIds.find((id) =>
    result.candidates.some((candidate) => candidate.id === id),
  );

  const nextIngredient = preferredId ? getIngredientById(preferredId) : result.candidates[0];
  if (!nextIngredient) return recipe;

  return applyIngredient(recipe, goal, role, nextIngredient);
}
