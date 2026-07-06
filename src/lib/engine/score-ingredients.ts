import type { Ingredient } from "@/types/ingredient";
import type { Goal } from "@/types/goal";
import type { UserPreferences } from "@/types/preferences";
import { SCORING_WEIGHTS } from "@/lib/engine/rules";

export interface ScoredIngredient {
  ingredient: Ingredient;
  score: number;
}

/**
 * Rule-based scoring layer (PRD section 9/12): goal relevance and emphasis
 * tags drive the base score, inflammation and preference signals adjust it.
 * No hardcoded recipes — every ranking is derived from ingredient metadata.
 */
export function scoreIngredients(
  ingredients: Ingredient[],
  goal: Goal,
  preferences: UserPreferences,
): ScoredIngredient[] {
  return ingredients
    .map((ingredient) => {
      let score = (ingredient.goalWeights[goal.id] ?? 0) * SCORING_WEIGHTS.goalWeight;

      const emphasisMatches = ingredient.tags.filter((tag) =>
        goal.emphasisTags.includes(tag),
      ).length;
      score += emphasisMatches * SCORING_WEIGHTS.emphasisTagBonus;

      if (goal.id === "przeciwzapalny") {
        score -= ingredient.inflammationScore * SCORING_WEIGHTS.inflammationPenaltyMultiplier * 2;
      } else {
        score -=
          Math.max(ingredient.inflammationScore, 0) *
          SCORING_WEIGHTS.inflammationPenaltyMultiplier;
      }

      if (preferences.highProtein && ingredient.macrosPer100.proteinG > 15) {
        score += SCORING_WEIGHTS.highProteinBonus;
      }

      if (preferences.kids) {
        if (ingredient.tags.includes("kidsFriendly")) {
          score += SCORING_WEIGHTS.kidsFriendlyBonus;
        }
        if (ingredient.flavor.includes("bitter")) {
          score -= SCORING_WEIGHTS.kidsBitterPenalty;
        }
      }

      return { ingredient, score };
    })
    .sort((a, b) => b.score - a.score);
}
