import type { RecipeIngredientEntry, ShoppingListItem } from "@/types/recipe";

export function buildShoppingList(
  entries: RecipeIngredientEntry[],
): ShoppingListItem[] {
  return entries.map((entry) => ({
    ingredientId: entry.ingredient.id,
    name: entry.ingredient.name,
    amountLabel: entry.ingredient.unitLabel,
    category: entry.ingredient.category,
    checked: false,
  }));
}
