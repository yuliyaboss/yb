import type { NutritionTotals, RecipeIngredientEntry } from "@/types/recipe";

export function calculateNutrition(
  entries: RecipeIngredientEntry[],
): NutritionTotals {
  const raw = entries.reduce<NutritionTotals>(
    (totals, entry) => {
      const factor = entry.amountG / 100;
      const macros = entry.ingredient.macrosPer100;
      return {
        kcal: totals.kcal + macros.kcal * factor,
        proteinG: totals.proteinG + macros.proteinG * factor,
        carbsG: totals.carbsG + macros.carbsG * factor,
        sugarG: totals.sugarG + macros.sugarG * factor,
        fatG: totals.fatG + macros.fatG * factor,
        fiberG: totals.fiberG + macros.fiberG * factor,
      };
    },
    { kcal: 0, proteinG: 0, carbsG: 0, sugarG: 0, fatG: 0, fiberG: 0 },
  );

  return {
    kcal: Math.round(raw.kcal),
    proteinG: Math.round(raw.proteinG * 10) / 10,
    carbsG: Math.round(raw.carbsG * 10) / 10,
    sugarG: Math.round(raw.sugarG * 10) / 10,
    fatG: Math.round(raw.fatG * 10) / 10,
    fiberG: Math.round(raw.fiberG * 10) / 10,
  };
}
