"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import { useRecipeGeneration } from "@/hooks/use-recipe-generation";
import { Button } from "@/components/ui/button";

const PHASES = [
  "Analizujemy Twój cel…",
  "Filtrujemy składniki pod preferencje…",
  "Dobieramy białko, błonnik i antyoksydanty…",
  "Sprawdzamy zgodność smakową…",
];

function StepGenerating() {
  const { generate, isLoading, error } = useRecipeGeneration();
  const [phaseIndex, setPhaseIndex] = useState(0);

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
    <div className="flex flex-col items-center gap-6 py-24 text-center">
      <motion.div
        animate={{ rotate: isLoading ? 360 : 0 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        className="bg-primary/10 text-forest flex size-16 items-center justify-center rounded-full"
      >
        <Loader2 className="size-7" />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.p
          key={phaseIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="text-muted-foreground text-lg"
        >
          {PHASES[phaseIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export { StepGenerating };
