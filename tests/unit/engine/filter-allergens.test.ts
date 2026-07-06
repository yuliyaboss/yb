import { describe, expect, it } from "vitest";

import { filterIngredients } from "@/lib/engine/filter-allergens";
import { INGREDIENTS } from "@/lib/data/ingredients";
import { DEFAULT_PREFERENCES } from "@/types/preferences";

describe("filterIngredients", () => {
  it("returns everything when no restrictive preference is set", () => {
    const result = filterIngredients(INGREDIENTS, DEFAULT_PREFERENCES);
    expect(result.length).toBe(INGREDIENTS.length);
  });

  it("excludes ingredients containing nuts when noNuts is set", () => {
    const result = filterIngredients(INGREDIENTS, { ...DEFAULT_PREFERENCES, noNuts: true });
    expect(result.every((ingredient) => !ingredient.allergens.includes("nuts"))).toBe(true);
    expect(result.length).toBeLessThan(INGREDIENTS.length);
  });

  it("excludes ingredients containing soy when noSoy is set", () => {
    const result = filterIngredients(INGREDIENTS, { ...DEFAULT_PREFERENCES, noSoy: true });
    expect(result.every((ingredient) => !ingredient.allergens.includes("soy"))).toBe(true);
  });

  it("excludes banana when noBanana is set", () => {
    const result = filterIngredients(INGREDIENTS, { ...DEFAULT_PREFERENCES, noBanana: true });
    expect(result.every((ingredient) => !ingredient.allergens.includes("banana"))).toBe(true);
  });

  it("keeps only vegan ingredients when vegan is set", () => {
    const result = filterIngredients(INGREDIENTS, { ...DEFAULT_PREFERENCES, vegan: true });
    expect(result.every((ingredient) => ingredient.dietFlags.includes("vegan"))).toBe(true);
  });

  it("keeps only kids-safe ingredients when kids is set, and every role stays fillable", () => {
    const result = filterIngredients(INGREDIENTS, { ...DEFAULT_PREFERENCES, kids: true });
    expect(result.every((ingredient) => ingredient.dietFlags.includes("kidsSafe"))).toBe(true);

    const categories = new Set(result.map((ingredient) => ingredient.category));
    expect(categories.has("base")).toBe(true);
    expect(categories.has("protein")).toBe(true);
    expect(categories.has("fruit")).toBe(true);
    expect(categories.has("vegetable")).toBe(true);
    expect(categories.has("seedNut")).toBe(true);
  });
});
