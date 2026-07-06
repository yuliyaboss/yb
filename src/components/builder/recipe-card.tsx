"use client";

import { useState } from "react";

import type { Recipe } from "@/types/recipe";
import type { Goal } from "@/types/goal";
import type { RecipeRole } from "@/types/ingredient";
import { IngredientRow } from "@/components/builder/ingredient-row";
import { IngredientSwapSheet } from "@/components/builder/ingredient-swap-sheet";
import { useIngredientSwap } from "@/hooks/use-ingredient-swap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecipeCardProps {
  recipe: Recipe;
  goal: Goal;
}

function RecipeCard({ recipe, goal }: RecipeCardProps) {
  const [activeRole, setActiveRole] = useState<RecipeRole | null>(null);
  const { getCandidates, swapTo } = useIngredientSwap();

  const activeEntry = recipe.entries.find((entry) => entry.role === activeRole);

  return (
    <Card className="p-0">
      <CardHeader className="border-border/60 flex-row items-center justify-between border-b p-6">
        <CardTitle>Twój koktajl</CardTitle>
        <Badge>{goal.name}</Badge>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-2 text-sm leading-relaxed">
          {recipe.goalExplanation}
        </p>
        <div>
          {recipe.entries.map((entry) => (
            <IngredientRow
              key={entry.role}
              entry={entry}
              onRequestSwap={() => setActiveRole(entry.role)}
            />
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
