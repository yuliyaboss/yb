import { Calculator } from "@/components/calculator";
import { ComingSoon } from "@/components/coming-soon";
import { Contact } from "@/components/contact";
import { Faq, faqItems } from "@/components/faq";
import { Hero } from "@/components/hero";
import { Manifest } from "@/components/manifest";
import { Packages } from "@/components/packages";
import { Process } from "@/components/process";
import { ReadyToMarket } from "@/components/ready-to-market";
import { Scope } from "@/components/scope";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Testimonials } from "@/components/testimonials";
import { Transformation } from "@/components/transformation";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SiteNav />
      <main>
        <Hero />
        <Manifest />
        <Services />
        <Transformation />
        <Scope />
        <Packages />
        <Calculator />
        <ReadyToMarket />
        <ComingSoon />
        <Process />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
