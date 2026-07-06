import { ListChecks, Sparkles, FlaskConical, ShoppingBag } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

const STEPS = [
  {
    icon: ListChecks,
    title: "Wybierz cel",
    description: "Energia, odporność, regeneracja po treningu — zaczynasz od tego, czego dziś potrzebujesz.",
  },
  {
    icon: Sparkles,
    title: "Ustal preferencje",
    description: "Wegańskie, bez orzechów, wysokobiałkowe — dopasowujemy się do Twojej diety.",
  },
  {
    icon: FlaskConical,
    title: "Otrzymaj przepis",
    description: "Silnik rekomendacji dobiera składniki i wyjaśnia, dlaczego znalazły się w Twoim koktajlu.",
  },
  {
    icon: ShoppingBag,
    title: "Zapisz i działaj",
    description: "Lista zakupów, PDF do pobrania i możliwość podmiany dowolnego składnika.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="jak-to-dziala" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Jak to działa"
        title="Od celu do przepisu w cztery kroki"
        description="Żadnych sztywnych przepisów — każdy koktajl powstaje na bazie Twojego celu i preferencji."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <AnimatedReveal key={step.title} delay={index * 0.08}>
            <div className="border-border/60 bg-card relative flex h-full flex-col gap-4 rounded-2xl border p-6">
              <span className="font-display text-muted-foreground/50 absolute top-4 right-5 text-4xl font-medium">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="bg-primary/10 text-forest flex size-11 items-center justify-center rounded-2xl">
                <step.icon className="size-5" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-lg font-medium">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
