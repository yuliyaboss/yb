"use client";

import { useCallback } from "react";

import { useBuilderStore } from "@/hooks/use-builder-store";
import { useAnalytics } from "@/hooks/use-analytics";
import { getGoalById } from "@/lib/data/goals";
import { getSwapCandidates, swapToIngredient } from "@/lib/engine/swap-ingredient";
import type { RecipeRole } from "@/types/ingredient";

export function useIngredientSwap() {
  const recipe = useBuilderStore((state) => state.recipe);
  const goalId = useBuilderStore((state) => state.goalId);
  const preferences = useBuilderStore((state) => state.preferences);
  const setRecipe = useBuilderStore((state) => state.setRecipe);
  const recordSwap = useBuilderStore((state) => state.recordSwap);
  const { track } = useAnalytics();

  const getCandidates = useCallback(
    (role: RecipeRole, limit = 4) => {
      const goal = goalId ? getGoalById(goalId) : undefined;
      if (!recipe || !goal) return [];
      return getSwapCandidates(recipe, goal, preferences, role, limit);
    },
    [recipe, goalId, preferences],
  );

  const swapTo = useCallback(
    (role: RecipeRole, ingredientId: string) => {
      const goal = goalId ? getGoalById(goalId) : undefined;
      if (!recipe || !goal) return;

      const fromIngredient = recipe.entries.find((entry) => entry.role === role)?.ingredient;
      const nextRecipe = swapToIngredient(recipe, goal, role, ingredientId);
      setRecipe(nextRecipe);

      if (fromIngredient && fromIngredient.id !== ingredientId) {
        recordSwap(role, fromIngredient.id);
        track("ingredient_swap", {
          goalId: goal.id,
          fromIngredientId: fromIngredient.id,
          toIngredientId: ingredientId,
        });
      }
    },
    [recipe, goalId, setRecipe, recordSwap, track],
  );

  return { getCandidates, swapTo };
}
