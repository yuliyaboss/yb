import { NextResponse } from "next/server";

import { generateRecipeRequestSchema } from "@/lib/validation/schemas";
import { getGoalById } from "@/lib/data/goals";
import { generateRecipe } from "@/lib/engine/select-recipe";
import type { GoalId } from "@/types/goal";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = generateRecipeRequestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const goal = getGoalById(parsed.data.goalId as GoalId);
  if (!goal) {
    return NextResponse.json({ error: "unknown_goal" }, { status: 404 });
  }

  const recipe = generateRecipe(goal, parsed.data.preferences);
  return NextResponse.json(recipe);
}
