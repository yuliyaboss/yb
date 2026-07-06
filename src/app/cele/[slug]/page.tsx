import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

import { GOALS, getGoalBySlug } from "@/lib/data/goals";
import { INGREDIENTS } from "@/lib/data/ingredients";
import { filterIngredients } from "@/lib/engine/filter-allergens";
import { scoreIngredients } from "@/lib/engine/score-ingredients";
import { DEFAULT_PREFERENCES } from "@/types/preferences";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildGoalPageSchema } from "@/lib/seo/schema-org";
import { resolveIcon, resolveCategoryIcon } from "@/lib/icon-map";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { CtaButton } from "@/components/shared/cta-button";

interface GoalPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return GOALS.map((goal) => ({ slug: goal.slug }));
}

export async function generateMetadata({ params }: GoalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const goal = getGoalBySlug(slug);
  if (!goal) return {};

  return buildMetadata({
    title: goal.seo.title,
    description: goal.seo.description,
    path: `/cele/${goal.slug}`,
  });
}

export default async function GoalPage({ params }: GoalPageProps) {
  const { slug } = await params;
  const goal = getGoalBySlug(slug);
  if (!goal) notFound();

  const Icon = resolveIcon(goal.iconName);
  const topIngredients = scoreIngredients(
    filterIngredients(INGREDIENTS, DEFAULT_PREFERENCES),
    goal,
    DEFAULT_PREFERENCES,
  )
    .slice(0, 6)
    .map((entry) => entry.ingredient);

  const otherGoals = GOALS.filter((g) => g.id !== goal.id);
  const schema = buildGoalPageSchema(goal, topIngredients);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <div className="bg-primary/10 text-forest mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl">
            <Icon className="size-6" />
          </div>
          <h1 className="font-display text-balance text-4xl font-medium tracking-tight sm:text-5xl">
            {goal.heroQuestion}
          </h1>
          <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
            {goal.explainerIntro}
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton href={`/builder?goal=${goal.slug}`}>
              Stwórz koktajl {goal.name}
            </CtaButton>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16">
          <SectionHeading
            eyebrow="Kluczowe składniki"
            title={`Co znajdziesz w koktajlu na ${goal.name.toLowerCase()}`}
            description="Nasz silnik rekomendacji wybiera z tych składników w zależności od Twoich preferencji."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topIngredients.map((ingredient, index) => {
              const CategoryIcon = resolveCategoryIcon(ingredient.category);
              return (
                <AnimatedReveal key={ingredient.id} delay={(index % 6) * 0.05}>
                  <div className="border-border/60 bg-card flex h-full flex-col gap-3 rounded-2xl border p-5">
                    <div className="bg-primary/10 text-forest flex size-10 items-center justify-center rounded-xl">
                      <CategoryIcon className="size-4.5" />
                    </div>
                    <span className="font-medium">{ingredient.name}</span>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {ingredient.benefitCopy}
                    </p>
                  </div>
                </AnimatedReveal>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16">
          <SectionHeading eyebrow="Inne cele" title="Zobacz pozostałe kreatory" />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {otherGoals.map((other) => (
              <Link
                key={other.id}
                href={`/cele/${other.slug}`}
                className="border-border/60 hover:border-primary/40 hover:bg-muted rounded-full border px-4 py-2 text-sm font-medium transition-colors"
              >
                {other.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
