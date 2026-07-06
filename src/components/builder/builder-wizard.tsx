"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";

import { useBuilderStore } from "@/hooks/use-builder-store";
import { useAnalytics } from "@/hooks/use-analytics";
import { BuilderProgress } from "@/components/builder/builder-progress";
import { StepGoalSelect } from "@/components/builder/steps/step-goal-select";
import { StepPreferences } from "@/components/builder/steps/step-preferences";
import { StepGenerating } from "@/components/builder/steps/step-generating";
import { StepRecipeResult } from "@/components/builder/steps/step-recipe-result";
import { StepEmailCapture } from "@/components/builder/steps/step-email-capture";
import type { GoalId } from "@/types/goal";

interface BuilderWizardProps {
  preselectedGoalId?: GoalId | null;
}

function BuilderWizard({ preselectedGoalId }: BuilderWizardProps) {
  const step = useBuilderStore((state) => state.step);
  const goalId = useBuilderStore((state) => state.goalId);
  const selectGoal = useBuilderStore((state) => state.selectGoal);
  const setStep = useBuilderStore((state) => state.setStep);
  const { track } = useAnalytics();
  const hasTrackedStart = useRef(false);
  const hasAppliedPreselect = useRef(false);

  useEffect(() => {
    if (!hasTrackedStart.current) {
      track("builder_start", {});
      hasTrackedStart.current = true;
    }
  }, [track]);

  useEffect(() => {
    if (preselectedGoalId && !goalId && !hasAppliedPreselect.current) {
      hasAppliedPreselect.current = true;
      selectGoal(preselectedGoalId);
      track("goal_selected", { goalId: preselectedGoalId });
      setStep("preferences");
    }
  }, [preselectedGoalId, goalId, selectGoal, setStep, track]);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
      <BuilderProgress step={step} />

      <AnimatePresence mode="wait">
        {step === "goal" && <StepGoalSelect key="goal" />}
        {step === "preferences" && <StepPreferences key="preferences" />}
        {step === "generating" && <StepGenerating key="generating" />}
        {step === "result" && <StepRecipeResult key="result" />}
        {step === "email" && <StepEmailCapture key="email" />}
      </AnimatePresence>
    </div>
  );
}

export { BuilderWizard };
