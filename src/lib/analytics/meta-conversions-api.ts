import "server-only";
import { createHash } from "node:crypto";

const META_PIXEL_ID = process.env.META_PIXEL_ID ?? "";
const META_ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN ?? "";
const GRAPH_API_VERSION = "v21.0";

export const isMetaConversionsApiConfigured =
  META_PIXEL_ID.length > 0 && META_ACCESS_TOKEN.length > 0;

function hashValue(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export interface MetaConversionEvent {
  eventName: "Lead" | "CompleteRegistration" | "Contact";
  email?: string;
  eventSourceUrl: string;
  actionSource?: "website";
}

/**
 * Server-side relay to the Meta Conversions API (PRD section 18). This is an
 * integration point: without META_PIXEL_ID / META_CONVERSIONS_API_TOKEN
 * configured it safely no-ops so local/dev/staging never call out.
 */
export async function sendMetaConversionEvent(
  event: MetaConversionEvent,
): Promise<{ sent: boolean; reason?: string }> {
  if (!isMetaConversionsApiConfigured) {
    return { sent: false, reason: "not_configured" };
  }

  const payload = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: event.actionSource ?? "website",
        event_source_url: event.eventSourceUrl,
        user_data: {
          em: event.email ? [hashValue(event.email)] : undefined,
        },
      },
    ],
  };

  const response = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  return { sent: response.ok, reason: response.ok ? undefined : `http_${response.status}` };
}
