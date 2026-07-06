"use client";

import { useMemo } from "react";
import { Plus, X } from "lucide-react";

import { useBuilderStore } from "@/hooks/use-builder-store";
import { useAnalytics } from "@/hooks/use-analytics";
import { getGoalById } from "@/lib/data/goals";
import { suggestBoosters, addBoosterToRecipe, removeBoosterFromRecipe } from "@/lib/engine/select-recipe";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function BoosterPicker() {
  const recipe = useBuilderStore((state) => state.recipe);
  const goalId = useBuilderStore((state) => state.goalId);
  const preferences = useBuilderStore((state) => state.preferences);
  const setRecipe = useBuilderStore((state) => state.setRecipe);
  const { track } = useAnalytics();

  const goal = goalId ? getGoalById(goalId) : undefined;

  const activeBoosterIds = useMemo(
    () => new Set(recipe?.entries.filter((e) => e.role === "booster").map((e) => e.ingredient.id)),
    [recipe],
  );

  const suggestions = useMemo(() => {
    if (!goal) return [];
    return suggestBoosters(goal, preferences, [], 6);
  }, [goal, preferences]);

  if (!recipe || !goal || suggestions.length === 0) return null;

  function handleToggle(boosterId: string) {
    if (!recipe || !goal) return;
    if (activeBoosterIds.has(boosterId)) {
      setRecipe(removeBoosterFromRecipe(recipe, goal, boosterId));
    } else {
      setRecipe(addBoosterToRecipe(recipe, goal, boosterId));
      track("booster_add", { goalId: goal.id, boosterId });
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="text-muted-foreground text-xs font-semibold tracking-[0.15em] uppercase">
        Boostery (opcjonalnie)
      </span>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((booster) => {
          const active = activeBoosterIds.has(booster.id);
          return (
            <button
              key={booster.id}
              type="button"
              onClick={() => handleToggle(booster.id)}
              className="focus-visible:ring-ring rounded-full outline-none focus-visible:ring-2"
            >
              <Badge
                variant={active ? "default" : "outline"}
                className={cn("cursor-pointer gap-1 py-1.5 pr-3 pl-2.5 text-xs", active && "pr-2.5")}
              >
                {active ? <X className="size-3" /> : <Plus className="size-3" />}
                {booster.name}
              </Badge>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { BoosterPicker };
