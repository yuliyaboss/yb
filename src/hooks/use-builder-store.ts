"use client";

import { create } from "zustand";

import type { BuilderState, BuilderStep } from "@/types/builder";
import type { GoalId } from "@/types/goal";
import { DEFAULT_PREFERENCES, type UserPreferences } from "@/types/preferences";
import type { Recipe } from "@/types/recipe";

interface BuilderActions {
  setStep: (step: BuilderStep) => void;
  selectGoal: (goalId: GoalId) => void;
  setPreferences: (preferences: UserPreferences) => void;
  togglePreference: (key: keyof UserPreferences) => void;
  setRecipe: (recipe: Recipe) => void;
  recordSwap: (role: string, previousIngredientId: string) => void;
  setEmail: (email: string) => void;
  setEmailConsent: (consent: boolean) => void;
  markEmailSubmitted: () => void;
  reset: () => void;
}

const initialState: BuilderState = {
  step: "goal",
  goalId: null,
  preferences: DEFAULT_PREFERENCES,
  recipe: null,
  swapHistory: {},
  email: null,
  emailConsent: false,
  emailSubmitted: false,
};

export const useBuilderStore = create<BuilderState & BuilderActions>((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  selectGoal: (goalId) => set({ goalId }),
  setPreferences: (preferences) => set({ preferences }),
  togglePreference: (key) =>
    set((state) => ({
      preferences: { ...state.preferences, [key]: !state.preferences[key] },
    })),
  setRecipe: (recipe) => set({ recipe }),
  recordSwap: (role, previousIngredientId) =>
    set((state) => ({
      swapHistory: {
        ...state.swapHistory,
        [role]: [...(state.swapHistory[role] ?? []), previousIngredientId],
      },
    })),
  setEmail: (email) => set({ email }),
  setEmailConsent: (emailConsent) => set({ emailConsent }),
  markEmailSubmitted: () => set({ emailSubmitted: true }),
  reset: () => set(initialState),
}));
