"use client";

import { RefreshCw } from "lucide-react";

import type { RecipeIngredientEntry } from "@/types/recipe";
import { resolveCategoryIcon } from "@/lib/icon-map";
import { Button } from "@/components/ui/button";

interface IngredientRowProps {
  entry: RecipeIngredientEntry;
  onRequestSwap: () => void;
}

function IngredientRow({ entry, onRequestSwap }: IngredientRowProps) {
  const Icon = resolveCategoryIcon(entry.ingredient.category);

  return (
    <div className="border-border/60 flex items-start gap-4 border-b py-4 last:border-b-0">
      <div className="bg-primary/10 text-forest flex size-10 shrink-0 items-center justify-center rounded-xl">
        <Icon className="size-4.5" aria-hidden />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium">{entry.ingredient.name}</span>
          <span className="text-muted-foreground text-xs whitespace-nowrap">
            {entry.ingredient.unitLabel}
          </span>
        </div>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{entry.explanation}</p>
      </div>
      {entry.isSwappable && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={onRequestSwap}
          aria-label={`Zamień składnik: ${entry.ingredient.name}`}
        >
          <RefreshCw className="size-4" />
        </Button>
      )}
    </div>
  );
}

export { IngredientRow };
