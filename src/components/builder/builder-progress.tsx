import type { BuilderStep } from "@/types/builder";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const VISIBLE_STEPS: { step: BuilderStep; label: string }[] = [
  { step: "goal", label: "Cel" },
  { step: "preferences", label: "Preferencje" },
  { step: "result", label: "Przepis" },
  { step: "email", label: "Zapisz" },
];

function stepProgress(step: BuilderStep): number {
  const index = VISIBLE_STEPS.findIndex((item) => item.step === step);
  if (step === "generating") {
    const resultIndex = VISIBLE_STEPS.findIndex((item) => item.step === "result");
    return ((resultIndex - 0.5) / (VISIBLE_STEPS.length - 1)) * 100;
  }
  return (index / (VISIBLE_STEPS.length - 1)) * 100;
}

function BuilderProgress({ step }: { step: BuilderStep }) {
  const activeIndex = VISIBLE_STEPS.findIndex((item) => item.step === step);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
      <Progress value={stepProgress(step)} />
      <div className="flex justify-between">
        {VISIBLE_STEPS.map((item, index) => (
          <span
            key={item.step}
            className={cn(
              "text-xs font-medium",
              index <= activeIndex || (step === "generating" && item.step === "result")
                ? "text-forest"
                : "text-muted-foreground/60",
            )}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export { BuilderProgress };
