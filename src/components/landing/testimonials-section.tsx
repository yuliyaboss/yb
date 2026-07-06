import { Sparkles } from "lucide-react";

import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { GlassPanel } from "@/components/shared/glass-panel";

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <AnimatedReveal>
        <GlassPanel className="bg-card/70 flex flex-col items-center gap-3 p-8 text-center sm:flex-row sm:gap-5 sm:text-left">
          <div className="bg-primary/10 text-forest flex size-12 shrink-0 items-center justify-center rounded-2xl">
            <Sparkles className="size-5" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-lg font-medium">
              Prime Era dopiero startuje
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Budujemy społeczność od zera — pierwsze historie i opinie pojawią się tutaj wraz z
              pierwszymi użytkowniczkami i użytkownikami. Dołącz teraz i bądź jedną z tych osób.
            </p>
          </div>
        </GlassPanel>
      </AnimatedReveal>
    </section>
  );
}
