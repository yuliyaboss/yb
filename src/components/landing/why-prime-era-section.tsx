import { Layers, MessageCircleHeart, ShieldCheck, Wand2 } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

const REASONS = [
  {
    icon: Wand2,
    title: "Nie przepis — dopasowanie",
    description:
      "Żadnych sztywnych receptur. Każdy koktajl powstaje dynamicznie na bazie bazy składników i Twojego celu.",
  },
  {
    icon: MessageCircleHeart,
    title: "Zawsze wiesz, dlaczego",
    description:
      "Do każdego składnika dopisujemy krótkie wyjaśnienie — bez żargonu i bez pustych obietnic.",
  },
  {
    icon: Layers,
    title: "Elastyczność bez kompromisów",
    description:
      "Podmieniaj składniki, dodawaj boostery, dopasuj recepturę do alergii i preferencji w jednym kliknięciu.",
  },
  {
    icon: ShieldCheck,
    title: "Spokojny, rzetelny ton",
    description:
      "Mówimy „wspiera” i „pomaga utrzymać” — bez obietnic leczenia, zgodnie z dobrymi praktykami UE.",
  },
];

export function WhyPrimeEraSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Dlaczego Prime Era"
        title="Zbudowane na logice, nie na przypadku"
        description="Prime Era to coś więcej niż lista przepisów — to system, który rozumie składniki."
      />

      <div className="mt-16 grid gap-8 sm:grid-cols-2">
        {REASONS.map((reason, index) => (
          <AnimatedReveal key={reason.title} delay={index * 0.08}>
            <div className="group flex gap-4">
              <div className="bg-primary/10 text-forest flex size-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15">
                <reason.icon className="size-5" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-lg font-medium">{reason.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
