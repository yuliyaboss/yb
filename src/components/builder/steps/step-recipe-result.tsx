"use client";

import { motion } from "framer-motion";

import { useBuilderStore } from "@/hooks/use-builder-store";
import { getGoalById } from "@/lib/data/goals";
import { RecipeCard } from "@/components/builder/recipe-card";
import { NutritionSummary } from "@/components/builder/nutrition-summary";
import { BoosterPicker } from "@/components/builder/booster-picker";
import { ShoppingList } from "@/components/builder/shopping-list";
import { ExportActions } from "@/components/builder/export-actions";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CtaButton } from "@/components/shared/cta-button";

function StepRecipeResult() {
  const recipe = useBuilderStore((state) => state.recipe);
  const goalId = useBuilderStore((state) => state.goalId);
  const setStep = useBuilderStore((state) => state.setStep);

  const goal = goalId ? getGoalById(goalId) : undefined;

  if (!recipe || !goal) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-muted-foreground">Najpierw wybierz cel i preferencje.</p>
        <CtaButton onClick={() => setStep("goal")} showIcon={false}>
          Zacznij od nowa
        </CtaButton>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex max-w-2xl flex-col gap-6"
    >
      <RecipeCard recipe={recipe} goal={goal} />

      <Card>
        <CardContent className="flex flex-col gap-6 p-0">
          <NutritionSummary totals={recipe.totals} />
          <Separator />
          <BoosterPicker />
          <Separator />
          <ShoppingList items={recipe.shoppingList} />
          <Separator />
          <ExportActions recipe={recipe} goal={goal} />
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <CtaButton onClick={() => setStep("email")}>Zapisz przepis na e-mail</CtaButton>
      </div>
    </motion.div>
  );
}

export { StepRecipeResult };
