import { NextResponse } from "next/server";

import { swapIngredientRequestSchema } from "@/lib/validation/schemas";
import { getGoalById } from "@/lib/data/goals";
import { swapIngredient } from "@/lib/engine/swap-ingredient";
import type { GoalId } from "@/types/goal";
import type { Recipe } from "@/types/recipe";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = swapIngredientRequestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const goal = getGoalById(parsed.data.goalId as GoalId);
  if (!goal) {
    return NextResponse.json({ error: "unknown_goal" }, { status: 404 });
  }

  const recipe = parsed.data.recipe as unknown as Recipe;
  const nextRecipe = swapIngredient(
    recipe,
    goal,
    parsed.data.preferences,
    parsed.data.role,
    parsed.data.excludeIds ?? [],
  );

  return NextResponse.json(nextRecipe);
}
