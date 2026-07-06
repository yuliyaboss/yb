import type { Goal } from "@/types/goal";
import type { Ingredient } from "@/types/ingredient";
import { siteConfig } from "@/config/site";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/opengraph-image`,
    sameAs: [siteConfig.links.instagram],
    description: siteConfig.description,
  };
}

export function buildGoalPageSchema(goal: Goal, ingredients: Ingredient[]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: goal.seo.title,
    description: goal.seo.description,
    url: `${siteConfig.url}/cele/${goal.slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      "@type": "Thing",
      name: goal.name,
      description: goal.explainerIntro,
    },
    mentions: ingredients.map((ingredient) => ({
      "@type": "Thing",
      name: ingredient.name,
    })),
  };
}

export function buildFaqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
