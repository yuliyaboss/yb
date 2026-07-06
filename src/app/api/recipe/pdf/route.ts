import { NextResponse } from "next/server";

import { pdfRequestSchema } from "@/lib/validation/schemas";
import { getGoalById } from "@/lib/data/goals";
import { generateRecipePdf } from "@/lib/pdf/generate-recipe-pdf";
import type { GoalId } from "@/types/goal";
import type { Recipe } from "@/types/recipe";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = pdfRequestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const goal = getGoalById(parsed.data.goalId as GoalId);
  if (!goal) {
    return NextResponse.json({ error: "unknown_goal" }, { status: 404 });
  }

  const recipe = parsed.data.recipe as unknown as Recipe;
  const pdfBytes = await generateRecipePdf(recipe, goal);

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="prime-era-${goal.slug}.pdf"`,
    },
  });
}
