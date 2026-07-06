import type { GoalId } from "@/types/goal";
import type { UserPreferences } from "@/types/preferences";

/** Event catalog from PRD section 18 (Analityka). */
export type AnalyticsEventName =
  | "hero_cta_click"
  | "builder_start"
  | "goal_selected"
  | "preferences_set"
  | "recipe_generated"
  | "ingredient_swap"
  | "booster_add"
  | "email_submit"
  | "email_success"
  | "pdf_export"
  | "share";

export interface AnalyticsEventPayloads {
  hero_cta_click: { location: "hero" | "nav" | "goals_preview" };
  builder_start: Record<string, never>;
  goal_selected: { goalId: GoalId };
  preferences_set: { preferences: UserPreferences };
  recipe_generated: { goalId: GoalId; ingredientCount: number };
  ingredient_swap: {
    goalId: GoalId;
    fromIngredientId: string;
    toIngredientId: string;
  };
  booster_add: { goalId: GoalId; boosterId: string };
  email_submit: { goalId: GoalId | null };
  email_success: { goalId: GoalId | null };
  pdf_export: { goalId: GoalId | null };
  share: { goalId: GoalId | null; channel: string };
}

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string | null;
}
