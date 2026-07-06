import { ImageResponse } from "next/og";

import { getGoalBySlug } from "@/lib/data/goals";
import { siteConfig } from "@/config/site";
import { SparkleMark } from "@/components/og/sparkle-mark";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const goal = getGoalBySlug(slug);
  const title = goal?.name ?? siteConfig.name;
  const subtitle = goal?.shortDescription ?? siteConfig.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#faf9f6",
          backgroundImage:
            "radial-gradient(circle at 25% 15%, rgba(90,140,110,0.28), transparent 45%), radial-gradient(circle at 85% 85%, rgba(201,184,150,0.35), transparent 45%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 32,
            fontSize: 30,
            color: "#365643",
            fontWeight: 600,
          }}
        >
          <SparkleMark size={44} />
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            color: "#1c211d",
            textAlign: "center",
            maxWidth: 960,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 28,
            color: "#5a5d58",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    { ...size },
  );
}
