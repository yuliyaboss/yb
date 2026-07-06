"use client";

import { useCallback, useState } from "react";

import { useBuilderStore } from "@/hooks/use-builder-store";
import { useAnalytics } from "@/hooks/use-analytics";

export function useEmailCapture() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const goalId = useBuilderStore((state) => state.goalId);
  const recipe = useBuilderStore((state) => state.recipe);
  const markEmailSubmitted = useBuilderStore((state) => state.markEmailSubmitted);
  const setEmail = useBuilderStore((state) => state.setEmail);
  const { track } = useAnalytics();

  const submit = useCallback(
    async (email: string) => {
      setIsSubmitting(true);
      setError(null);
      track("email_submit", { goalId });
      try {
        const response = await fetch("/api/email/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            consent: true,
            source: "builder",
            goalId: goalId ?? undefined,
            recipeId: recipe?.id,
          }),
        });
        if (!response.ok) throw new Error("subscribe_failed");
        setEmail(email);
        markEmailSubmitted();
        track("email_success", { goalId });
        return true;
      } catch {
        setError("Nie udało się zapisać adresu e-mail. Spróbuj ponownie.");
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [goalId, recipe?.id, setEmail, markEmailSubmitted, track],
  );

  return { submit, isSubmitting, error };
}
