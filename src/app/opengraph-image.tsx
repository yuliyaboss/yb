import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { SparkleMark } from "@/components/og/sparkle-mark";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
            gap: 20,
            marginBottom: 28,
          }}
        >
          <SparkleMark size={72} />
          <div style={{ fontSize: 44, fontWeight: 600, color: "#1c211d" }}>
            {siteConfig.name}
          </div>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 600,
            color: "#1c211d",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.15,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 26,
            color: "#5a5d58",
          }}
        >
          Inteligentny kreator smoothie
        </div>
      </div>
    ),
    { ...size },
  );
}
