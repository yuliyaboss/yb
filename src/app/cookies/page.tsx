import type { Metadata } from "next";

import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Polityka cookies",
  description: "Informacje o plikach cookie używanych w serwisie Prime Era.",
  path: "/cookies",
});

const COOKIE_CATEGORIES = [
  {
    name: "Niezbędne",
    always: true,
    description:
      "Zapewniają podstawowe działanie serwisu (np. zapamiętanie Twojej decyzji dotyczącej cookies, stan kreatora smoothie). Nie można ich wyłączyć.",
  },
  {
    name: "Analityczne",
    always: false,
    description:
      "Google Analytics 4 — pomagają zrozumieć, jak korzystasz z serwisu, abyśmy mogli go ulepszać. Uruchamiane wyłącznie po wyrażeniu zgody.",
  },
  {
    name: "Marketingowe",
    always: false,
    description:
      "Meta Pixel — pozwalają mierzyć skuteczność kampanii reklamowych. Uruchamiane wyłącznie po wyrażeniu zgody.",
  },
];

export default function CookiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto max-w-2xl px-6 py-20">
          <h1 className="font-display text-4xl font-medium">Polityka cookies</h1>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            Zgodnie z Dyrektywą ePrivacy oraz RODO, pliki cookie inne niż niezbędne uruchamiamy
            wyłącznie po Twojej zgodzie wyrażonej w banerze widocznym na stronie. W każdej chwili
            możesz zmienić swoją decyzję, czyszcząc dane strony w ustawieniach przeglądarki.
          </p>

          <div className="mt-10 flex flex-col gap-6">
            {COOKIE_CATEGORIES.map((category) => (
              <div key={category.name} className="border-border/60 rounded-2xl border p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-medium">{category.name}</h2>
                  <span className="text-muted-foreground text-xs">
                    {category.always ? "Zawsze aktywne" : "Wymaga zgody"}
                  </span>
                </div>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
