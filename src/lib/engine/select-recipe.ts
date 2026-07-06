import type { FunctionalTag, Ingredient, RecipeRole } from "@/types/ingredient";
import type { Goal } from "@/types/goal";
import type { UserPreferences } from "@/types/preferences";
import type { Recipe, RecipeIngredientEntry } from "@/types/recipe";
import { INGREDIENTS } from "@/lib/data/ingredients";
import { filterIngredients } from "@/lib/engine/filter-allergens";
import { scoreIngredients, type ScoredIngredient } from "@/lib/engine/score-ingredients";
import { ROLE_CATEGORY_MAP, RECIPE_ROLES, PREPARATION_STEPS } from "@/lib/engine/rules";
import { buildExplanation, buildGoalExplanation } from "@/lib/engine/explainability";
import { calculateNutrition } from "@/lib/engine/nutrition-calculator";
import { buildShoppingList } from "@/lib/engine/shopping-list";

function pickForRole(
  category: Ingredient["category"],
  scored: ScoredIngredient[],
  usedIds: Set<string>,
): Ingredient | undefined {
  return scored.find(
    (entry) => entry.ingredient.category === category && !usedIds.has(entry.ingredient.id),
  )?.ingredient;
}

/**
 * Guarantees the recipe covers the mandatory building blocks from PRD
 * section 12 (protein, fiber, antioxidant, goal focus) even when the raw
 * per-role greedy pick misses one — swaps the least goal-critical role
 * (vegetable, then seedNut) for the best candidate carrying the missing tag.
 */
function ensureCoreRequirements(
  picks: Map<RecipeRole, Ingredient>,
  scored: ScoredIngredient[],
  usedIds: Set<string>,
): void {
  const hasTag = (tag: FunctionalTag) =>
    Array.from(picks.values()).some((ingredient) => ingredient.tags.includes(tag));

  const requirements: { tags: FunctionalTag[]; fallbackRole: RecipeRole }[] = [
    { tags: ["highAntioxidant"], fallbackRole: "fruitSecondary" },
    { tags: ["highFiber", "gutHealth"], fallbackRole: "seedNut" },
  ];

  for (const requirement of requirements) {
    if (requirement.tags.some(hasTag)) continue;

    const category = ROLE_CATEGORY_MAP[requirement.fallbackRole];
    const replacement = scored.find(
      (entry) =>
        entry.ingredient.category === category &&
        requirement.tags.some((tag) => entry.ingredient.tags.includes(tag)) &&
        !usedIds.has(entry.ingredient.id),
    );

    if (replacement) {
      const previous = picks.get(requirement.fallbackRole);
      if (previous) usedIds.delete(previous.id);
      picks.set(requirement.fallbackRole, replacement.ingredient);
      usedIds.add(replacement.ingredient.id);
    }
  }
}

export interface GenerateRecipeOptions {
  excludeIds?: string[];
}

export function generateRecipe(
  goal: Goal,
  preferences: UserPreferences,
  options: GenerateRecipeOptions = {},
): Recipe {
  const available = filterIngredients(INGREDIENTS, preferences).filter(
    (ingredient) => !options.excludeIds?.includes(ingredient.id),
  );
  const scored = scoreIngredients(available, goal, preferences);

  const usedIds = new Set<string>();
  const picks = new Map<RecipeRole, Ingredient>();

  for (const role of RECIPE_ROLES) {
    const ingredient = pickForRole(ROLE_CATEGORY_MAP[role], scored, usedIds);
    if (ingredient) {
      picks.set(role, ingredient);
      usedIds.add(ingredient.id);
    }
  }

  ensureCoreRequirements(picks, scored, usedIds);

  const entries: RecipeIngredientEntry[] = RECIPE_ROLES.filter((role) => picks.has(role)).map(
    (role) => {
      const ingredient = picks.get(role)!;
      return {
        role,
        ingredient,
        amountG: ingredient.defaultAmountG,
        explanation: buildExplanation(ingredient, goal),
        isSwappable: true,
      };
    },
  );

  const totals = calculateNutrition(entries);

  return {
    id: crypto.randomUUID(),
    goalId: goal.id,
    createdAt: new Date().toISOString(),
    entries,
    totals,
    preparationSteps: PREPARATION_STEPS,
    goalExplanation: buildGoalExplanation(goal, entries),
    shoppingList: buildShoppingList(entries),
  };
}

/** Top booster candidates for the opt-in booster picker, ranked by goal fit. */
export function suggestBoosters(
  goal: Goal,
  preferences: UserPreferences,
  excludeIds: string[] = [],
  limit = 4,
): Ingredient[] {
  const boosters = filterIngredients(
    INGREDIENTS.filter((ingredient) => ingredient.category === "booster"),
    preferences,
  ).filter((ingredient) => !excludeIds.includes(ingredient.id));

  return scoreIngredients(boosters, goal, preferences)
    .slice(0, limit)
    .map((entry) => entry.ingredient);
}

/** Adds an opt-in booster as an extra entry (does not replace an existing role). */
export function addBoosterToRecipe(recipe: Recipe, goal: Goal, boosterId: string): Recipe {
  const booster = INGREDIENTS.find((ingredient) => ingredient.id === boosterId);
  if (!booster || recipe.entries.some((entry) => entry.ingredient.id === boosterId)) {
    return recipe;
  }

  const entries: RecipeIngredientEntry[] = [
    ...recipe.entries,
    {
      role: "booster",
      ingredient: booster,
      amountG: booster.defaultAmountG,
      explanation: buildExplanation(booster, goal),
      isSwappable: false,
    },
  ];

  return {
    ...recipe,
    entries,
    totals: calculateNutrition(entries),
    goalExplanation: buildGoalExplanation(goal, entries),
    shoppingList: buildShoppingList(entries),
  };
}

export function removeBoosterFromRecipe(recipe: Recipe, goal: Goal, boosterId: string): Recipe {
  const entries = recipe.entries.filter((entry) => entry.ingredient.id !== boosterId);

  return {
    ...recipe,
    entries,
    totals: calculateNutrition(entries),
    goalExplanation: buildGoalExplanation(goal, entries),
    shoppingList: buildShoppingList(entries),
  };
}
