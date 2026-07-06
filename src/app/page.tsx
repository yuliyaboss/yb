import type { Metadata } from "next";

import { SiteHeader } from "@/components/landing/site-header";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { GoalsPreviewSection } from "@/components/landing/goals-preview-section";
import { WhyPrimeEraSection } from "@/components/landing/why-prime-era-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FaqSection } from "@/components/landing/faq-section";
import { NewsletterSection } from "@/components/landing/newsletter-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <GoalsPreviewSection />
        <WhyPrimeEraSection />
        <TestimonialsSection />
        <FaqSection />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </>
  );
}
