export const siteConfig = {
  name: "Prime Era",
  tagline: "Czego potrzebuje dziś Twoje ciało?",
  description:
    "Prime Era to inteligentny kreator smoothie. Wybierz swój cel, a nasz silnik rekomendacji dobierze składniki, wyjaśni każdy wybór i przygotuje Twoją listę zakupów.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://primeera.pl",
  locale: "pl_PL",
  keywords: [
    "smoothie",
    "kreator smoothie",
    "zdrowe odżywianie",
    "wellness",
    "koktajl na energię",
    "koktajl na odporność",
    "prime era",
  ],
  links: {
    instagram: "https://instagram.com/primeera",
  },
  contactEmail: "hello@primeera.pl",
} as const;

export type SiteConfig = typeof siteConfig;
