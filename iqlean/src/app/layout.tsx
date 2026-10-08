import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";

import "./globals.css";
import { site } from "@/config/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"], display: "swap" });
const serif = Cormorant_Garamond({
  variable: "--font-serif-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "I.Qlean · Sprzątanie po remoncie Warszawa",
    template: "%s · I.Qlean",
  },
  description: site.description,
  keywords: [
    "sprzątanie po remoncie Warszawa",
    "sprzątanie po budowie",
    "mycie okien po remoncie",
    "home staging Warszawa",
    "przygotowanie mieszkania do sprzedaży",
    "mycie paneli fotowoltaicznych",
    "mycie elewacji",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: site.url,
    siteName: site.name,
    title: "I.Qlean · Sprzątanie po remoncie Warszawa",
    description: site.description,
    images: [{ url: "/media/og.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HouseCleaningService",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  image: `${site.url}/media/og.jpg`,
  areaServed: { "@type": "City", name: "Warszawa" },
  priceRange: "15–25 zł/m²",
  sameAs: [site.instagram, site.facebook],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${inter.variable} ${serif.variable}`}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
