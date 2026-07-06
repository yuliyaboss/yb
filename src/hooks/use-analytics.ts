"use client";

import { useCallback } from "react";
import { trackEvent } from "@/lib/analytics/events";
import type { AnalyticsEventName, AnalyticsEventPayloads } from "@/types/analytics";

export function useAnalytics() {
  const track = useCallback(
    <K extends AnalyticsEventName>(name: K, payload: AnalyticsEventPayloads[K]) => {
      trackEvent(name, payload);
    },
    [],
  );

  return { track };
}
