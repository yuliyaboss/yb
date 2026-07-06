import type { NutritionTotals } from "@/types/recipe";

interface NutritionSummaryProps {
  totals: NutritionTotals;
}

const STATS: { key: keyof NutritionTotals; label: string; unit: string }[] = [
  { key: "kcal", label: "Kalorie", unit: "kcal" },
  { key: "proteinG", label: "Białko", unit: "g" },
  { key: "carbsG", label: "Węglow.", unit: "g" },
  { key: "fatG", label: "Tłuszcz", unit: "g" },
  { key: "fiberG", label: "Błonnik", unit: "g" },
];

function NutritionSummary({ totals }: NutritionSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
      {STATS.map((stat) => (
        <div
          key={stat.key}
          className="border-border/60 bg-card flex flex-col items-center gap-1 rounded-2xl border py-4 text-center"
        >
          <span className="font-display text-xl font-medium">{totals[stat.key]}</span>
          <span className="text-muted-foreground text-[11px] tracking-wide uppercase">
            {stat.label} ({stat.unit})
          </span>
        </div>
      ))}
      <p className="text-muted-foreground col-span-3 mt-1 text-xs sm:col-span-5">
        Wartości orientacyjne, obliczone na podstawie ilości składników w recepturze.
      </p>
    </div>
  );
}

export { NutritionSummary };
