import { describe, expect, it } from "vitest";

import { scoreIngredients } from "@/lib/engine/score-ingredients";
import { INGREDIENTS, getIngredientById } from "@/lib/data/ingredients";
import { GOALS } from "@/lib/data/goals";
import { DEFAULT_PREFERENCES } from "@/types/preferences";

describe("scoreIngredients", () => {
  it("ranks ingredients with a higher goal weight above those with none", () => {
    const zelazoGoal = GOALS.find((g) => g.id === "zelazo")!;
    const scored = scoreIngredients(INGREDIENTS, zelazoGoal, DEFAULT_PREFERENCES);

    const spinachRank = scored.findIndex((entry) => entry.ingredient.id === "szpinak");
    const bananaRank = scored.findIndex((entry) => entry.ingredient.id === "banan");

    expect(spinachRank).toBeGreaterThanOrEqual(0);
    expect(bananaRank).toBeGreaterThanOrEqual(0);
    expect(spinachRank).toBeLessThan(bananaRank);
  });

  it("penalizes bitter ingredients and boosts kid-friendly ones when kids preference is set", () => {
    const goal = GOALS.find((g) => g.id === "dlaDzieci")!;
    const kurkuma = getIngredientById("kurkuma")!;
    const banan = getIngredientById("banan")!;

    const withoutKids = scoreIngredients([kurkuma, banan], goal, DEFAULT_PREFERENCES);
    const withKids = scoreIngredients([kurkuma, banan], goal, {
      ...DEFAULT_PREFERENCES,
      kids: true,
    });

    const kurkumaBefore = withoutKids.find((e) => e.ingredient.id === "kurkuma")!.score;
    const kurkumaAfter = withKids.find((e) => e.ingredient.id === "kurkuma")!.score;
    expect(kurkumaAfter).toBeLessThan(kurkumaBefore);

    const bananBefore = withoutKids.find((e) => e.ingredient.id === "banan")!.score;
    const bananAfter = withKids.find((e) => e.ingredient.id === "banan")!.score;
    expect(bananAfter).toBeGreaterThan(bananBefore);
  });

  it("penalizes pro-inflammatory ingredients more heavily for the anti-inflammatory goal", () => {
    const przeciwzapalny = GOALS.find((g) => g.id === "przeciwzapalny")!;
    const kurkuma = getIngredientById("kurkuma")!; // inflammationScore -3
    const jogurtNaturalny = getIngredientById("jogurt-naturalny")!; // inflammationScore -1

    const scored = scoreIngredients([kurkuma, jogurtNaturalny], przeciwzapalny, DEFAULT_PREFERENCES);
    const kurkumaScore = scored.find((e) => e.ingredient.id === "kurkuma")!.score;
    const jogurtScore = scored.find((e) => e.ingredient.id === "jogurt-naturalny")!.score;

    expect(kurkumaScore).toBeGreaterThan(jogurtScore);
  });
});
