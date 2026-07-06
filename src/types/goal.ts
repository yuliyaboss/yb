import type { FunctionalTag } from "@/types/ingredient";

/** The 11 builder goals defined in the PRD (section 6). */
export type GoalId =
  | "primeEra"
  | "energia"
  | "koncentracja"
  | "bialko"
  | "zelazo"
  | "poTreningu"
  | "jelita"
  | "ukladNerwowy"
  | "odpornosc"
  | "przeciwzapalny"
  | "dlaDzieci";

export type GoalColorToken = "forest" | "sand" | "graphite";

export interface Goal {
  id: GoalId;
  slug: string;
  name: string;
  shortDescription: string;
  heroQuestion: string;
  /** Name of a Lucide icon component, resolved via the GOAL_ICONS map. */
  iconName: string;
  colorToken: GoalColorToken;
  /** Tags this goal favors most heavily during scoring (Załącznik A). */
  emphasisTags: FunctionalTag[];
  /** Longer paragraph used on the recipe card + /cele/[slug] landing. */
  explainerIntro: string;
  seo: {
    title: string;
    description: string;
  };
}
