import { NextResponse } from "next/server";

import { emailSubscribeSchema } from "@/lib/validation/schemas";
import { sendMetaConversionEvent } from "@/lib/analytics/meta-conversions-api";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = emailSubscribeSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  // Integration point: connect an ESP (e.g. Resend, Mailchimp) here to persist the lead.
  // Intentionally not logging the raw email server-side beyond this request scope.

  await sendMetaConversionEvent({
    eventName: parsed.data.source === "builder" ? "CompleteRegistration" : "Lead",
    email: parsed.data.email,
    eventSourceUrl: request.headers.get("referer") ?? "https://primeera.pl",
  }).catch(() => undefined);

  return NextResponse.json({ ok: true });
}
