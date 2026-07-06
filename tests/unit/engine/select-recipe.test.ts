import { describe, expect, it } from "vitest";

import { GOALS } from "@/lib/data/goals";
import { DEFAULT_PREFERENCES } from "@/types/preferences";
import { generateRecipe, suggestBoosters } from "@/lib/engine/select-recipe";
import { RECIPE_ROLES } from "@/lib/engine/rules";

describe("generateRecipe", () => {
  it.each(GOALS)(
    "produces a complete, balanced recipe for goal $id",
    (goal) => {
      const recipe = generateRecipe(goal, DEFAULT_PREFERENCES);

      expect(recipe.goalId).toBe(goal.id);
      expect(recipe.entries).toHaveLength(RECIPE_ROLES.length);

      const roles = recipe.entries.map((entry) => entry.role);
      expect(new Set(roles).size).toBe(roles.length); // no duplicate roles

      const ingredientIds = recipe.entries.map((entry) => entry.ingredient.id);
      expect(new Set(ingredientIds).size).toBe(ingredientIds.length); // no duplicate ingredients

      const tags = new Set(recipe.entries.flatMap((entry) => entry.ingredient.tags));
      expect(tags.has("highFiber") || tags.has("gutHealth")).toBe(true);
      expect(tags.has("highAntioxidant")).toBe(true);
      expect(recipe.entries.some((entry) => entry.role === "protein")).toBe(true);

      expect(recipe.totals.kcal).toBeGreaterThan(0);
      expect(recipe.shoppingList).toHaveLength(recipe.entries.length);
    },
  );

  it("never proposes a medical claim in the generated explanations", () => {
    const forbiddenWords = ["leczy", "lekarstwo", "detoks", "wyleczy", "terapia"];
    for (const goal of GOALS) {
      const recipe = generateRecipe(goal, DEFAULT_PREFERENCES);
      const allText = [recipe.goalExplanation, ...recipe.entries.map((e) => e.explanation)]
        .join(" ")
        .toLowerCase();
      for (const word of forbiddenWords) {
        expect(allText).not.toContain(word);
      }
    }
  });

  it("respects the kids preference — only kid-safe ingredients, all roles still filled", () => {
    const goal = GOALS.find((g) => g.id === "dlaDzieci")!;
    const preferences = { ...DEFAULT_PREFERENCES, kids: true, noNuts: true };
    const recipe = generateRecipe(goal, preferences);

    expect(recipe.entries).toHaveLength(RECIPE_ROLES.length);
    expect(recipe.entries.every((entry) => entry.ingredient.dietFlags.includes("kidsSafe"))).toBe(
      true,
    );
    expect(recipe.entries.every((entry) => !entry.ingredient.allergens.includes("nuts"))).toBe(
      true,
    );
  });

  it("respects vegan + noSoy combined restrictions", () => {
    const goal = GOALS.find((g) => g.id === "bialko")!;
    const preferences = { ...DEFAULT_PREFERENCES, vegan: true, noSoy: true };
    const recipe = generateRecipe(goal, preferences);

    expect(recipe.entries.every((entry) => entry.ingredient.dietFlags.includes("vegan"))).toBe(
      true,
    );
    expect(recipe.entries.every((entry) => !entry.ingredient.allergens.includes("soy"))).toBe(
      true,
    );
  });

  it("excludes ingredients passed via excludeIds", () => {
    const goal = GOALS.find((g) => g.id === "energia")!;
    const first = generateRecipe(goal, DEFAULT_PREFERENCES);
    const bananaEntry = first.entries.find((e) => e.ingredient.id === "banan");
    if (!bananaEntry) return; // banana wasn't picked this time, nothing to assert

    const second = generateRecipe(goal, DEFAULT_PREFERENCES, { excludeIds: ["banan"] });
    expect(second.entries.some((entry) => entry.ingredient.id === "banan")).toBe(false);
  });
});

describe("suggestBoosters", () => {
  it("returns only booster-category ingredients relevant to the goal", () => {
    const goal = GOALS.find((g) => g.id === "jelita")!;
    const boosters = suggestBoosters(goal, DEFAULT_PREFERENCES);
    expect(boosters.length).toBeGreaterThan(0);
    expect(boosters.every((ingredient) => ingredient.category === "booster")).toBe(true);
  });
});
