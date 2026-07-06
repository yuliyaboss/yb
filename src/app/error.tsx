"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

import { SiteHeader } from "@/components/landing/site-header";
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/shared/cta-button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
     
    console.error(error);
  }, [error]);

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="bg-destructive/10 text-destructive flex size-14 items-center justify-center rounded-2xl">
            <AlertTriangle className="size-6" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-display text-3xl font-medium sm:text-4xl">Coś poszło nie tak</h1>
            <p className="text-muted-foreground max-w-md">
              Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę — jeśli problem się powtórzy,
              wróć do nas za chwilę.
            </p>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button onClick={() => reset()}>Spróbuj ponownie</Button>
            <CtaButton href="/" showIcon={false} variant="outline">
              Strona główna
            </CtaButton>
          </div>
        </div>
      </main>
    </>
  );
}
