"use client";

import { Check } from "lucide-react";

import type { Ingredient, RecipeRole } from "@/types/ingredient";
import { resolveCategoryIcon } from "@/lib/icon-map";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface IngredientSwapSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: RecipeRole | null;
  currentIngredientId?: string;
  candidates: Ingredient[];
  onSelect: (ingredientId: string) => void;
}

function IngredientSwapSheet({
  open,
  onOpenChange,
  currentIngredientId,
  candidates,
  onSelect,
}: IngredientSwapSheetProps) {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={isDesktop ? "right" : "bottom"}>
        <SheetHeader>
          <SheetTitle>Wybierz zamiennik</SheetTitle>
          <SheetDescription>
            Propozycje dopasowane do Twojego celu i preferencji.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-2 overflow-y-auto">
          {candidates.length === 0 && (
            <p className="text-muted-foreground text-sm">
              Brak dostępnych zamienników dla bieżących preferencji.
            </p>
          )}
          {candidates.map((ingredient) => {
            const Icon = resolveCategoryIcon(ingredient.category);
            const isCurrent = ingredient.id === currentIngredientId;
            return (
              <button
                key={ingredient.id}
                type="button"
                onClick={() => {
                  onSelect(ingredient.id);
                  onOpenChange(false);
                }}
                className={cn(
                  "border-border/60 hover:border-primary/40 hover:bg-muted flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors",
                  isCurrent && "border-primary/40 bg-primary/5",
                )}
              >
                <div className="bg-primary/10 text-forest flex size-9 shrink-0 items-center justify-center rounded-xl">
                  <Icon className="size-4" />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium">{ingredient.name}</span>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {ingredient.benefitCopy}
                  </p>
                </div>
                {isCurrent && <Check className="text-forest size-4 shrink-0" />}
              </button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { IngredientSwapSheet };
