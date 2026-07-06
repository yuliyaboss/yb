"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";

import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/shared/glass-panel";

export function ConsentBanner() {
  const { consent, hydrated, acceptAll, rejectAll } = useCookieConsent();

  const shouldShow = hydrated && consent.decidedAt === null;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-2xl sm:inset-x-0"
          role="dialog"
          aria-live="polite"
          aria-label="Ustawienia plików cookie"
        >
          <GlassPanel className="bg-card/95 flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <Cookie className="text-forest hidden size-6 shrink-0 sm:block" aria-hidden />
            <p className="text-muted-foreground flex-1 text-sm">
              Używamy plików cookie, aby analizować ruch i dostosować treści. Niezbędne pliki
              cookie są zawsze aktywne. Więcej informacji znajdziesz w{" "}
              <Link href="/cookies" className="text-forest underline underline-offset-2">
                polityce cookies
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <Button variant="outline" size="sm" onClick={rejectAll}>
                Tylko niezbędne
              </Button>
              <Button size="sm" onClick={acceptAll}>
                Akceptuj wszystkie
              </Button>
            </div>
          </GlassPanel>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
