"use client";

import { motion } from "framer-motion";

import { GOALS } from "@/lib/data/goals";
import { GoalCard } from "@/components/builder/goal-card";
import { useBuilderStore } from "@/hooks/use-builder-store";
import { useAnalytics } from "@/hooks/use-analytics";
import type { GoalId } from "@/types/goal";

function StepGoalSelect() {
  const goalId = useBuilderStore((state) => state.goalId);
  const selectGoal = useBuilderStore((state) => state.selectGoal);
  const setStep = useBuilderStore((state) => state.setStep);
  const { track } = useAnalytics();

  function handleSelect(id: GoalId) {
    selectGoal(id);
    track("goal_selected", { goalId: id });
    setStep("preferences");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-display text-3xl font-medium sm:text-4xl">
          Czego potrzebuje dziś Twoje ciało?
        </h1>
        <p className="text-muted-foreground">Wybierz cel, a resztę zrobi nasz silnik rekomendacji.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GOALS.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            selected={goalId === goal.id}
            onSelect={() => handleSelect(goal.id)}
          />
        ))}
      </div>
    </motion.div>
  );
}

export { StepGoalSelect };
