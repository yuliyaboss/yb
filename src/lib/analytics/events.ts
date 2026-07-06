import type { AnalyticsEventName, AnalyticsEventPayloads } from "@/types/analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Typed event catalog fan-out (PRD section 18). Silently no-ops when GA4 /
 * Meta Pixel haven't loaded yet — which, under the consent gate, is the
 * expected state until the user opts in.
 */
export function trackEvent<K extends AnalyticsEventName>(
  name: K,
  payload: AnalyticsEventPayloads[K],
): void {
  if (typeof window === "undefined") return;

  window.gtag?.("event", name, payload as Record<string, unknown>);
  window.fbq?.("trackCustom", name, payload as Record<string, unknown>);

  if (process.env.NODE_ENV === "development") {
     
    console.debug("[analytics]", name, payload);
  }
}
