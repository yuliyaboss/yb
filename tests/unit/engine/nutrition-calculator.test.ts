import { describe, expect, it } from "vitest";

import { calculateNutrition } from "@/lib/engine/nutrition-calculator";
import { getIngredientById } from "@/lib/data/ingredients";
import type { RecipeIngredientEntry } from "@/types/recipe";

describe("calculateNutrition", () => {
  it("scales macros proportionally to the amount used", () => {
    const banana = getIngredientById("banan")!;
    const entry: RecipeIngredientEntry = {
      role: "fruitPrimary",
      ingredient: banana,
      amountG: 200, // double the reference 100 g
      explanation: "",
      isSwappable: true,
    };

    const totals = calculateNutrition([entry]);
    expect(totals.kcal).toBeCloseTo(banana.macrosPer100.kcal * 2, 0);
    expect(totals.proteinG).toBeCloseTo(banana.macrosPer100.proteinG * 2, 1);
  });

  it("sums macros across multiple entries", () => {
    const banana = getIngredientById("banan")!;
    const spinach = getIngredientById("szpinak")!;
    const entries: RecipeIngredientEntry[] = [
      { role: "fruitPrimary", ingredient: banana, amountG: 100, explanation: "", isSwappable: true },
      { role: "vegetable", ingredient: spinach, amountG: 30, explanation: "", isSwappable: true },
    ];

    const totals = calculateNutrition(entries);
    const expectedKcal = banana.macrosPer100.kcal + spinach.macrosPer100.kcal * 0.3;
    expect(totals.kcal).toBeCloseTo(expectedKcal, 0);
  });

  it("returns all-zero totals for an empty recipe", () => {
    const totals = calculateNutrition([]);
    expect(totals).toEqual({ kcal: 0, proteinG: 0, carbsG: 0, sugarG: 0, fatG: 0, fiberG: 0 });
  });
});
