import Link from "next/link";
import { Compass } from "lucide-react";

import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { CtaButton } from "@/components/shared/cta-button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="bg-primary/10 text-forest flex size-14 items-center justify-center rounded-2xl">
            <Compass className="size-6" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-display text-3xl font-medium sm:text-4xl">
              Nie znaleźliśmy tej strony
            </h1>
            <p className="text-muted-foreground max-w-md">
              Strona mogła zostać przeniesiona albo nie istnieje. Wróć na stronę główną albo
              stwórz swój koktajl.
            </p>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <CtaButton href="/" showIcon={false}>
              Strona główna
            </CtaButton>
            <Link
              href="/builder"
              className="text-muted-foreground hover:text-forest text-sm font-medium underline underline-offset-4"
            >
              Przejdź do kreatora
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
