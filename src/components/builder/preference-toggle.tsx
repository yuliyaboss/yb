"use client";

import type { PreferenceOption } from "@/types/preferences";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PreferenceToggleProps {
  option: PreferenceOption;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function PreferenceToggle({ option, checked, onCheckedChange }: PreferenceToggleProps) {
  return (
    <div
      className={cn(
        "border-border/60 bg-card flex items-center justify-between gap-4 rounded-2xl border p-4 transition-colors",
        checked && "border-primary/40 bg-primary/5",
      )}
    >
      <div className="flex flex-col gap-0.5">
        <Label htmlFor={`pref-${option.key}`} className="text-sm font-medium">
          {option.label}
        </Label>
        <span className="text-muted-foreground text-xs">{option.description}</span>
      </div>
      <Switch id={`pref-${option.key}`} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

export { PreferenceToggle };
