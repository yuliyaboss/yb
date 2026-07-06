"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

import type { Goal } from "@/types/goal";
import { resolveIcon } from "@/lib/icon-map";
import { cn } from "@/lib/utils";

const COLOR_TOKEN_CLASSES: Record<Goal["colorToken"], string> = {
  forest: "bg-forest/10 text-forest-deep",
  sand: "bg-sand text-secondary-foreground",
  graphite: "bg-graphite/10 text-graphite",
};

interface GoalCardProps {
  goal: Goal;
  href?: string;
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
}

function GoalCardInner({ goal, selected }: { goal: Goal; selected?: boolean }) {
  const Icon = resolveIcon(goal.iconName);

  return (
    <>
      <div
        className={cn(
          "flex size-11 items-center justify-center rounded-2xl",
          COLOR_TOKEN_CLASSES[goal.colorToken],
        )}
      >
        <Icon className="size-5" aria-hidden />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-display text-base font-medium">{goal.name}</span>
        <span className="text-muted-foreground text-sm">{goal.shortDescription}</span>
      </div>
      {selected && (
        <span className="bg-primary text-primary-foreground absolute top-3 right-3 flex size-5 items-center justify-center rounded-full">
          <Check className="size-3" />
        </span>
      )}
    </>
  );
}

function GoalCard({ goal, href, selected, onSelect, className }: GoalCardProps) {
  const sharedClassName = cn(
    "group relative flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4 text-left shadow-sm transition-all",
    "hover:border-primary/40 hover:shadow-md",
    selected && "border-primary ring-2 ring-primary/30",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={sharedClassName}>
        <GoalCardInner goal={goal} selected={selected} />
      </Link>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      className={sharedClassName}
      aria-pressed={selected}
    >
      <GoalCardInner goal={goal} selected={selected} />
    </motion.button>
  );
}

export { GoalCard };
