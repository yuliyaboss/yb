import type { GoalId } from "@/types/goal";
import type { UserPreferences } from "@/types/preferences";
import type { Recipe } from "@/types/recipe";

export type BuilderStep =
  | "goal"
  | "preferences"
  | "generating"
  | "result"
  | "email";

export const BUILDER_STEPS: BuilderStep[] = [
  "goal",
  "preferences",
  "generating",
  "result",
  "email",
];

export interface BuilderState {
  step: BuilderStep;
  goalId: GoalId | null;
  preferences: UserPreferences;
  recipe: Recipe | null;
  /** Ingredient ids already used per role during this session, to avoid immediate repeats on swap. */
  swapHistory: Partial<Record<string, string[]>>;
  email: string | null;
  emailConsent: boolean;
  emailSubmitted: boolean;
}
