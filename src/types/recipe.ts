import type { GoalId } from "@/types/goal";
import type { Ingredient, IngredientCategory, RecipeRole } from "@/types/ingredient";

export interface RecipeIngredientEntry {
  role: RecipeRole;
  ingredient: Ingredient;
  amountG: number;
  /** Generated Polish explanation for why this ingredient was picked. */
  explanation: string;
  isSwappable: boolean;
}

export interface NutritionTotals {
  kcal: number;
  proteinG: number;
  carbsG: number;
  sugarG: number;
  fatG: number;
  fiberG: number;
}

export interface ShoppingListItem {
  ingredientId: string;
  name: string;
  amountLabel: string;
  category: IngredientCategory;
  checked: boolean;
}

export interface Recipe {
  id: string;
  goalId: GoalId;
  createdAt: string;
  entries: RecipeIngredientEntry[];
  totals: NutritionTotals;
  preparationSteps: string[];
  /** Overall "why this recipe" paragraph, soft compliance-friendly tone. */
  goalExplanation: string;
  shoppingList: ShoppingListItem[];
}
