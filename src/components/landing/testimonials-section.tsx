import { Quote } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { Badge } from "@/components/ui/badge";

const PLACEHOLDER_QUOTES = [
  {
    quote: "Miejsce na pierwszą opinię naszej społeczności Prime Era.",
    name: "Wkrótce",
  },
  {
    quote: "Tutaj pojawi się historia jednej z naszych użytkowniczek.",
    name: "Wkrótce",
  },
  {
    quote: "Zbieramy pierwsze doświadczenia — wróć tu niebawem.",
    name: "Wkrótce",
  },
];

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-col items-center gap-3">
        <SectionHeading eyebrow="Opinie" title="Głos naszej społeczności" />
        <Badge variant="soft">Sekcja w budowie</Badge>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {PLACEHOLDER_QUOTES.map((item, index) => (
          <AnimatedReveal key={item.quote} delay={index * 0.08}>
            <div className="border-border/60 bg-card flex h-full flex-col gap-4 rounded-2xl border p-6">
              <Quote className="text-forest-light size-6" />
              <p className="text-muted-foreground text-sm leading-relaxed italic">
                {item.quote}
              </p>
              <span className="mt-auto text-sm font-medium">{item.name}</span>
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
