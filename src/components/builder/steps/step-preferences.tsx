"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { PREFERENCE_OPTIONS } from "@/lib/data/preferences";
import { PreferenceToggle } from "@/components/builder/preference-toggle";
import { useBuilderStore } from "@/hooks/use-builder-store";
import { useAnalytics } from "@/hooks/use-analytics";
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/shared/cta-button";

function StepPreferences() {
  const preferences = useBuilderStore((state) => state.preferences);
  const togglePreference = useBuilderStore((state) => state.togglePreference);
  const setStep = useBuilderStore((state) => state.setStep);
  const { track } = useAnalytics();

  function handleContinue() {
    track("preferences_set", { preferences });
    setStep("generating");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-display text-3xl font-medium sm:text-4xl">Twoje preferencje</h1>
        <p className="text-muted-foreground">
          Zaznacz to, co jest dla Ciebie ważne — dopasujemy recepturę.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {PREFERENCE_OPTIONS.map((option) => (
          <PreferenceToggle
            key={option.key}
            option={option}
            checked={preferences[option.key]}
            onCheckedChange={() => togglePreference(option.key)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => setStep("goal")}>
          <ChevronLeft className="size-4" />
          Wróć
        </Button>
        <CtaButton onClick={handleContinue}>Wygeneruj przepis</CtaButton>
      </div>
    </motion.div>
  );
}

export { StepPreferences };
