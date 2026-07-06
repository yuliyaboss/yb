"use client";

import Script from "next/script";

import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { GA4_MEASUREMENT_ID, isGA4Configured } from "@/lib/analytics/ga4";

export function GA4Script() {
  const { consent, hydrated } = useCookieConsent();

  if (!hydrated || !consent.analytics || !isGA4Configured) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_MEASUREMENT_ID}', { anonymize_ip: true });
          window.gtag = gtag;
        `}
      </Script>
    </>
  );
}
