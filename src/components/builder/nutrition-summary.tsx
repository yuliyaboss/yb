import { Flame, Dumbbell, Wheat, Droplet, Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { NutritionTotals } from "@/types/recipe";

interface NutritionSummaryProps {
  totals: NutritionTotals;
}

const STATS: { key: keyof NutritionTotals; label: string; unit: string; icon: LucideIcon }[] = [
  { key: "kcal", label: "Kalorie", unit: "kcal", icon: Flame },
  { key: "proteinG", label: "Białko", unit: "g", icon: Dumbbell },
  { key: "carbsG", label: "Węglow.", unit: "g", icon: Wheat },
  { key: "fatG", label: "Tłuszcz", unit: "g", icon: Droplet },
  { key: "fiberG", label: "Błonnik", unit: "g", icon: Sprout },
];

function NutritionSummary({ totals }: NutritionSummaryProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-muted-foreground text-xs font-semibold tracking-[0.15em] uppercase">
        Wartości odżywcze
      </span>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {STATS.map((stat) => (
          <div
            key={stat.key}
            className="bg-muted flex flex-col items-center gap-1.5 rounded-2xl py-4 text-center"
          >
            <stat.icon className="text-forest size-4" aria-hidden />
            <span className="font-display text-xl font-medium">{totals[stat.key]}</span>
            <span className="text-muted-foreground text-[11px] tracking-wide uppercase">
              {stat.label} ({stat.unit})
            </span>
          </div>
        ))}
      </div>
      <p className="text-muted-foreground text-xs">
        Wartości orientacyjne, obliczone na podstawie ilości składników w recepturze.
      </p>
    </div>
  );
}

export { NutritionSummary };
