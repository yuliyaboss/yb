import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { GoalCard } from "@/components/builder/goal-card";
import { GOALS } from "@/lib/data/goals";

export function GoalsPreviewSection() {
  return (
    <section id="cele" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="11 celów"
        title="Zacznij od tego, czego potrzebujesz"
        description="Każdy cel ma własną logikę doboru składników — od Prime Era po wersję dla dzieci."
      />

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GOALS.map((goal, index) => (
          <AnimatedReveal key={goal.id} delay={(index % 6) * 0.05}>
            <GoalCard goal={goal} href={`/builder?goal=${goal.slug}`} />
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
