"use client";

import { useCallback, useEffect, useState } from "react";
import type { ConsentState } from "@/types/analytics";

const STORAGE_KEY = "prime-era-consent";

const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  decidedAt: null,
};

function readConsent(): ConsentState {
  if (typeof window === "undefined") return DEFAULT_CONSENT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;
    return { ...DEFAULT_CONSENT, ...(JSON.parse(raw) as Partial<ConsentState>) };
  } catch {
    return DEFAULT_CONSENT;
  }
}

/**
 * RODO/ePrivacy-compliant consent gate: analytics and marketing scripts stay
 * off until the user explicitly decides, and the decision persists locally.
 */
export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setHydrated(true);
  }, []);

  const updateConsent = useCallback(
    (next: Partial<Omit<ConsentState, "necessary" | "decidedAt">>) => {
      setConsent((prev) => {
        const merged: ConsentState = {
          ...prev,
          ...next,
          necessary: true,
          decidedAt: new Date().toISOString(),
        };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        return merged;
      });
    },
    [],
  );

  const acceptAll = useCallback(
    () => updateConsent({ analytics: true, marketing: true }),
    [updateConsent],
  );
  const rejectAll = useCallback(
    () => updateConsent({ analytics: false, marketing: false }),
    [updateConsent],
  );

  return { consent, hydrated, updateConsent, acceptAll, rejectAll };
}
