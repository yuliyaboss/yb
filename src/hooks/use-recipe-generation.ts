"use client";

import { useCallback, useState } from "react";

import { useBuilderStore } from "@/hooks/use-builder-store";
import { useAnalytics } from "@/hooks/use-analytics";
import { getGoalById } from "@/lib/data/goals";
import { generateRecipe } from "@/lib/engine/select-recipe";

/** Minimum time the "generating" step stays visible — lets the reveal animation breathe. */
const MIN_GENERATION_MS = 900;

export function useRecipeGeneration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const goalId = useBuilderStore((state) => state.goalId);
  const preferences = useBuilderStore((state) => state.preferences);
  const setRecipe = useBuilderStore((state) => state.setRecipe);
  const setStep = useBuilderStore((state) => state.setStep);
  const { track } = useAnalytics();

  const generate = useCallback(async () => {
    if (!goalId) return;
    const goal = getGoalById(goalId);
    if (!goal) return;

    setIsLoading(true);
    setError(null);
    const startedAt = Date.now();

    try {
      const recipe = generateRecipe(goal, preferences);
      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_GENERATION_MS) {
        await new Promise((resolve) => setTimeout(resolve, MIN_GENERATION_MS - elapsed));
      }
      setRecipe(recipe);
      track("recipe_generated", { goalId, ingredientCount: recipe.entries.length });
      setStep("result");
    } catch {
      setError("Nie udało się wygenerować przepisu. Spróbuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  }, [goalId, preferences, setRecipe, setStep, track]);

  return { generate, isLoading, error };
}
