import { describe, expect, it } from "vitest";

import { GOALS } from "@/lib/data/goals";
import { DEFAULT_PREFERENCES } from "@/types/preferences";
import { generateRecipe } from "@/lib/engine/select-recipe";
import { getSwapCandidates, swapIngredient, swapToIngredient } from "@/lib/engine/swap-ingredient";

describe("swapIngredient", () => {
  it("replaces the ingredient for the given role with a different one of the same category", () => {
    const goal = GOALS.find((g) => g.id === "odpornosc")!;
    const recipe = generateRecipe(goal, DEFAULT_PREFERENCES);
    const before = recipe.entries.find((e) => e.role === "fruitPrimary")!;

    const swapped = swapIngredient(recipe, goal, DEFAULT_PREFERENCES, "fruitPrimary");
    const after = swapped.entries.find((e) => e.role === "fruitPrimary")!;

    expect(after.ingredient.category).toBe(before.ingredient.category);
    expect(after.ingredient.id).not.toBe(before.ingredient.id);
    expect(swapped.totals.kcal).toBeGreaterThan(0);
  });

  it("recomputes nutrition totals and shopping list after a swap", () => {
    const goal = GOALS.find((g) => g.id === "energia")!;
    const recipe = generateRecipe(goal, DEFAULT_PREFERENCES);
    const swapped = swapIngredient(recipe, goal, DEFAULT_PREFERENCES, "vegetable");

    expect(swapped.shoppingList.map((item) => item.ingredientId)).toEqual(
      swapped.entries.map((entry) => entry.ingredient.id),
    );
  });
});

describe("getSwapCandidates / swapToIngredient", () => {
  it("lists alternatives excluding the currently used ingredients, and allows picking one explicitly", () => {
    const goal = GOALS.find((g) => g.id === "jelita")!;
    const recipe = generateRecipe(goal, DEFAULT_PREFERENCES);
    const usedIds = new Set(recipe.entries.map((e) => e.ingredient.id));

    const candidates = getSwapCandidates(recipe, goal, DEFAULT_PREFERENCES, "base");
    expect(candidates.length).toBeGreaterThan(0);
    expect(candidates.every((c) => !usedIds.has(c.id))).toBe(true);

    const chosen = candidates[0];
    const updated = swapToIngredient(recipe, goal, "base", chosen.id);
    expect(updated.entries.find((e) => e.role === "base")?.ingredient.id).toBe(chosen.id);
  });
});
