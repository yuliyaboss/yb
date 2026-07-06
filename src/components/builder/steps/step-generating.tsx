"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Droplet, Apple, Carrot, Wheat, FlaskConical } from "lucide-react";

import { useRecipeGeneration } from "@/hooks/use-recipe-generation";
import { useBuilderStore } from "@/hooks/use-builder-store";
import { getGoalById } from "@/lib/data/goals";
import { resolveIcon } from "@/lib/icon-map";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const PHASES = [
  "Analizujemy Twój cel…",
  "Filtrujemy składniki pod preferencje…",
  "Dobieramy białko, błonnik i antyoksydanty…",
  "Sprawdzamy zgodność smakową…",
];

const ORBIT_ICONS = [Droplet, Apple, Carrot, Wheat, FlaskConical];
const ORBIT_RADIUS = 96;
const ORBIT_DURATION = 10;

function StepGenerating() {
  const { generate, error } = useRecipeGeneration();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const goalId = useBuilderStore((state) => state.goalId);
  const goal = goalId ? getGoalById(goalId) : undefined;
  const GoalIcon = resolveIcon(goal?.iconName ?? "Sparkles");

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % PHASES.length);
    }, 750);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-destructive">{error}</p>
        <Button onClick={() => generate()}>Spróbuj ponownie</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-10 py-20 text-center">
      <div className="relative flex size-56 items-center justify-center">
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
        >
          {ORBIT_ICONS.map((Icon, index) => {
            const angle = (360 / ORBIT_ICONS.length) * index;
            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 size-10"
                style={{
                  transform: `rotate(${angle}deg) translateY(-${ORBIT_RADIUS}px)`,
                }}
              >
                <motion.div
                  className="bg-card text-forest border-border/60 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm"
                  animate={{ rotate: -360 }}
                  transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
                >
                  <Icon className="size-4.5" />
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="bg-primary/10 text-forest flex size-24 items-center justify-center rounded-full"
        >
          <GoalIcon className="size-9" />
        </motion.div>
      </div>

      <div className="flex w-full max-w-xs flex-col items-center gap-4">
        <Progress value={((phaseIndex + 1) / PHASES.length) * 100} className="w-full" />
        <AnimatePresence mode="wait">
          <motion.p
            key={phaseIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-muted-foreground text-base"
          >
            {PHASES[phaseIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export { StepGenerating };
