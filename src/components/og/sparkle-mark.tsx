/**
 * Inline SVG sparkle badge for OG image generation (next/og ImageResponse).
 * Deliberately avoids Unicode glyphs (e.g. "✦") — ImageResponse's Satori
 * renderer tries to fetch a fallback Google Font for unsupported glyphs at
 * build time, which fails in network-restricted environments.
 */
export function SparkleMark({ size = 72 }: { size?: number }) {
  return (
    <div
      style={{
        display: "flex",
        width: size,
        height: size,
        borderRadius: size / 3,
        backgroundColor: "#365643",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={size * 0.5}
        height={size * 0.5}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z"
          fill="#faf9f6"
        />
      </svg>
    </div>
  );
}
