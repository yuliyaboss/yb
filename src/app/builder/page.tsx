import type { Metadata } from "next";

import { BuilderWizard } from "@/components/builder/builder-wizard";
import { SiteHeader } from "@/components/landing/site-header";
import { getGoalBySlug } from "@/lib/data/goals";

export const metadata: Metadata = {
  title: "Kreator smoothie",
  description:
    "Wybierz cel, ustaw preferencje i otrzymaj spersonalizowany przepis na smoothie w mniej niż minutę.",
  alternates: { canonical: "/builder" },
  robots: { index: false, follow: true },
};

interface BuilderPageProps {
  searchParams: Promise<{ goal?: string }>;
}

export default async function BuilderPage({ searchParams }: BuilderPageProps) {
  const { goal: goalSlug } = await searchParams;
  const preselectedGoal = goalSlug ? getGoalBySlug(goalSlug) : undefined;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <BuilderWizard preselectedGoalId={preselectedGoal?.id ?? null} />
      </main>
    </>
  );
}
