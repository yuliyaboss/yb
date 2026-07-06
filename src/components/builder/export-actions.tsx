"use client";

import { useState } from "react";
import { Copy, Download, Printer, Share2, Check } from "lucide-react";
import { toast } from "sonner";

import type { Recipe } from "@/types/recipe";
import type { Goal } from "@/types/goal";
import { Button } from "@/components/ui/button";
import { usePdfExport } from "@/hooks/use-pdf-export";
import { useAnalytics } from "@/hooks/use-analytics";

interface ExportActionsProps {
  recipe: Recipe;
  goal: Goal;
}

function buildRecipeText(recipe: Recipe, goal: Goal): string {
  const lines = [
    `Prime Era — koktajl: ${goal.name}`,
    "",
    "Składniki:",
    ...recipe.entries.map((entry) => `• ${entry.ingredient.name} — ${entry.ingredient.unitLabel}`),
    "",
    "Przygotowanie:",
    ...recipe.preparationSteps.map((step, index) => `${index + 1}. ${step}`),
  ];
  return lines.join("\n");
}

function ExportActions({ recipe, goal }: ExportActionsProps) {
  const { exportPdf, isExporting } = usePdfExport();
  const { track } = useAnalytics();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(buildRecipeText(recipe, goal));
    setCopied(true);
    toast.success("Przepis skopiowany do schowka");
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleShare() {
    const text = buildRecipeText(recipe, goal);
    const canWebShare = typeof navigator.share === "function";
    track("share", { goalId: goal.id, channel: canWebShare ? "web-share" : "clipboard" });
    if (canWebShare) {
      try {
        await navigator.share({ title: `Prime Era — ${goal.name}`, text });
      } catch {
        // user cancelled — no-op
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast.success("Przepis skopiowany — możesz go teraz wkleić i udostępnić");
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={() => exportPdf()} disabled={isExporting}>
        <Download className="size-4" />
        {isExporting ? "Generowanie…" : "Pobierz PDF"}
      </Button>
      <Button variant="outline" size="sm" onClick={() => window.print()}>
        <Printer className="size-4" />
        Drukuj
      </Button>
      <Button variant="outline" size="sm" onClick={handleCopy}>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        Kopiuj
      </Button>
      <Button variant="outline" size="sm" onClick={handleShare}>
        <Share2 className="size-4" />
        Udostępnij
      </Button>
    </div>
  );
}

export { ExportActions };
