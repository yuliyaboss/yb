export const site = {
  name: "I.Qlean",
  url: "https://iqlean.pl",
  tagline: "Sprzątanie po remoncie. Warszawa i okolice.",
  description:
    "Premium sprzątanie po remoncie w Warszawie. Pakiety Express i Ultimate, mycie powietrza Air Washer, przygotowanie mieszkania do sprzedaży (Ready to Market). Wycena online w minutę.",
  email: "hello.iqlean@gmail.com",
  phone: "+48 575 271 241",
  phoneHref: "tel:+48575271241",
  whatsapp: "48575271241",
  instagram: "https://www.instagram.com/i.qlean",
  facebook: "https://www.facebook.com/iqleanpl/",
  area: "Warszawa i okolice",
} as const;

export const nav = [
  { href: "#uslugi", label: "Usługi" },
  { href: "#pakiety", label: "Pakiety" },
  { href: "#kalkulator", label: "Kalkulator" },
  { href: "#ready-to-market", label: "Ready to Market" },
  { href: "#wkrotce", label: "Wkrótce" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export function whatsappLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function mailtoLink(subject: string, body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
