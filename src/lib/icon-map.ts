import {
  Sparkles,
  Zap,
  Brain,
  Dumbbell,
  Droplets,
  Droplet,
  Activity,
  Sprout,
  Waves,
  Shield,
  Snowflake,
  Baby,
  Apple,
  Carrot,
  Wheat,
  FlaskConical,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import type { IngredientCategory } from "@/types/ingredient";

export const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Zap,
  Brain,
  Dumbbell,
  Droplets,
  Activity,
  Sprout,
  Waves,
  Shield,
  Snowflake,
  Baby,
};

export function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Sparkles;
}

export const CATEGORY_ICON_MAP: Record<IngredientCategory, LucideIcon> = {
  base: Droplet,
  protein: Dumbbell,
  fruit: Apple,
  vegetable: Carrot,
  seedNut: Wheat,
  booster: FlaskConical,
  spice: Leaf,
};

export function resolveCategoryIcon(category: IngredientCategory): LucideIcon {
  return CATEGORY_ICON_MAP[category] ?? Leaf;
}
