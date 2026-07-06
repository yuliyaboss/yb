/** The 9 user preferences from PRD section 8. */
export interface UserPreferences {
  vegan: boolean;
  vegetarian: boolean;
  noBanana: boolean;
  noNuts: boolean;
  noSoy: boolean;
  highProtein: boolean;
  kids: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
}

export type PreferenceKey = keyof UserPreferences;

export const DEFAULT_PREFERENCES: UserPreferences = {
  vegan: false,
  vegetarian: false,
  noBanana: false,
  noNuts: false,
  noSoy: false,
  highProtein: false,
  kids: false,
  glutenFree: false,
  dairyFree: false,
};

export type PreferenceGroup = "diet" | "allergens" | "priorities";

export interface PreferenceOption {
  key: PreferenceKey;
  label: string;
  description: string;
  group: PreferenceGroup;
}
