"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

import { useBuilderStore } from "@/hooks/use-builder-store";
import { useAnalytics } from "@/hooks/use-analytics";

export function usePdfExport() {
  const [isExporting, setIsExporting] = useState(false);
  const recipe = useBuilderStore((state) => state.recipe);
  const goalId = useBuilderStore((state) => state.goalId);
  const { track } = useAnalytics();

  const exportPdf = useCallback(async () => {
    if (!recipe || !goalId) return;
    setIsExporting(true);
    try {
      const response = await fetch("/api/recipe/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipe, goalId }),
      });
      if (!response.ok) {
        toast.error("Nie udało się wygenerować PDF. Spróbuj ponownie.");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `prime-era-${goalId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      track("pdf_export", { goalId });
    } catch {
      toast.error("Nie udało się wygenerować PDF. Sprawdź połączenie i spróbuj ponownie.");
    } finally {
      setIsExporting(false);
    }
  }, [recipe, goalId, track]);

  return { exportPdf, isExporting };
}
