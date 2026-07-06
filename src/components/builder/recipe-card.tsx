"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import type { Recipe } from "@/types/recipe";
import type { Goal } from "@/types/goal";
import type { RecipeRole } from "@/types/ingredient";
import { resolveIcon } from "@/lib/icon-map";
import { IngredientRow } from "@/components/builder/ingredient-row";
import { IngredientSwapSheet } from "@/components/builder/ingredient-swap-sheet";
import { useIngredientSwap } from "@/hooks/use-ingredient-swap";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RecipeCardProps {
  recipe: Recipe;
  goal: Goal;
}

const HEADER_TREATMENTS: Record<Goal["colorToken"], string> = {
  forest: "bg-gradient-to-br from-forest to-forest-deep text-cream",
  sand: "bg-gradient-to-br from-sand-dark to-sand text-graphite",
  graphite: "bg-gradient-to-br from-graphite to-graphite-soft text-cream",
};

const HEADER_ICON_TREATMENTS: Record<Goal["colorToken"], string> = {
  forest: "bg-white/15 text-cream",
  sand: "bg-white/40 text-graphite",
  graphite: "bg-white/10 text-cream",
};

function RecipeCard({ recipe, goal }: RecipeCardProps) {
  const [activeRole, setActiveRole] = useState<RecipeRole | null>(null);
  const { getCandidates, swapTo } = useIngredientSwap();

  const activeEntry = recipe.entries.find((entry) => entry.role === activeRole);
  const GoalIcon = resolveIcon(goal.iconName);

  return (
    <Card className="overflow-hidden p-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn("relative flex items-center gap-4 overflow-hidden p-7", HEADER_TREATMENTS[goal.colorToken])}
      >
        <div
          aria-hidden
          className="absolute -top-10 -right-10 size-40 rounded-full bg-white/10 blur-2xl"
        />
        <div
          className={cn(
            "flex size-14 shrink-0 items-center justify-center rounded-2xl",
            HEADER_ICON_TREATMENTS[goal.colorToken],
          )}
        >
          <GoalIcon className="size-7" />
        </div>
        <div className="relative flex flex-col gap-0.5">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase opacity-80">
            Twój koktajl
          </span>
          <h2 className="font-display text-2xl font-medium">{goal.name}</h2>
        </div>
      </motion.div>

      <CardContent className="p-6">
        <p className="text-muted-foreground mb-2 text-sm leading-relaxed">
          {recipe.goalExplanation}
        </p>
        <div>
          {recipe.entries.map((entry, index) => (
            <motion.div
              key={entry.role}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 + index * 0.06 }}
            >
              <IngredientRow entry={entry} onRequestSwap={() => setActiveRole(entry.role)} />
            </motion.div>
          ))}
        </div>
      </CardContent>

      <IngredientSwapSheet
        open={activeRole !== null}
        onOpenChange={(open) => !open && setActiveRole(null)}
        role={activeRole}
        currentIngredientId={activeEntry?.ingredient.id}
        candidates={activeRole ? getCandidates(activeRole) : []}
        onSelect={(ingredientId) => activeRole && swapTo(activeRole, ingredientId)}
      />
    </Card>
  );
}

export { RecipeCard };
