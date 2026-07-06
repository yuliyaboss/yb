import type { Ingredient } from "@/types/ingredient";
import type { Goal } from "@/types/goal";
import type { RecipeIngredientEntry } from "@/types/recipe";

/**
 * Generates a soft, compliance-friendly Polish explanation for a single
 * ingredient choice. Never uses medical claim language (PRD section 4) —
 * only "wspiera" / "pomaga utrzymać" style phrasing.
 */
export function buildExplanation(ingredient: Ingredient, goal: Goal): string {
  const isCoreMatch = (ingredient.goalWeights[goal.id] ?? 0) >= 6;
  const prefix = isCoreMatch
    ? `Wybrano ze względu na cel „${goal.name}”: `
    : "Dodano, aby dopełnić recepturę: ";
  return `${prefix}${ingredient.benefitCopy}`;
}

function joinPolish(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} i ${items[items.length - 1]}`;
}

export function buildGoalExplanation(
  goal: Goal,
  entries: RecipeIngredientEntry[],
): string {
  const names = entries.map((entry) => entry.ingredient.name.toLowerCase());
  return `${goal.explainerIntro} W tej recepturze znajdziesz: ${joinPolish(names)}.`;
}
