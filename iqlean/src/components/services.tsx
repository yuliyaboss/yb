import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Reveal } from "./reveal";

const items = [
  {
    title: "Sprzątanie po remoncie",
    text: "Express albo Ultimate. Od pyłu na suficie po fugi w łazience.",
    href: "#pakiety",
    cta: "Pakiety i ceny",
    img: "/media/hero.jpg",
    dark: false,
    span: "md:col-span-2",
  },
  {
    title: "Air Washer",
    text: "Mycie powietrza po pracach pylących. Drobny pył przestaje osiadać na świeżo umytych powierzchniach.",
    href: "#kalkulator",
    cta: "Dodaj do wyceny",
    img: "/media/air.jpg",
    dark: false,
    span: "",
  },
  {
    title: "Ready to Market",
    text: "Mieszkanie gotowe do sprzedaży lub najmu. Remont, malowanie, meble i sprzątanie w jednych rękach.",
    href: "#ready-to-market",
    cta: "Jak to działa",
    img: "/media/rtm-after.jpg",
    dark: true,
    span: "",
    badge: "Nowość",
  },
  {
    title: "Elewacje, okna, fotowoltaika",
    text: "Mycie wodą demineralizowaną z poziomu ziemi, bez rusztowań. Szkło i panele schną bez smug.",
    href: "#wkrotce",
    cta: "Zapisz się",
    img: "/media/soon-pv.jpg",
    dark: true,
    span: "md:col-span-2",
    badge: "Wkrótce",
  },
] as const;

export function Services() {
  return (
    <section id="uslugi" className="bg-soft px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1080px]">
        <Reveal className="mb-12 px-1 md:mb-16">
          <h2 className="h-section max-w-[16ch]">Jedna firma. Cały porządek po remoncie.</h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className={item.span}>
              <a
                href={item.href}
                className="group relative flex h-[440px] flex-col overflow-hidden rounded-[28px] bg-white md:h-[520px]"
              >
                <Image
                  src={item.img}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
                />
                <div
                  className={`absolute inset-0 ${
                    item.dark
                      ? "bg-gradient-to-t from-black/80 via-black/25 to-black/10"
                      : "bg-gradient-to-b from-white/90 via-white/30 to-transparent"
                  }`}
                />
                <div className={`relative z-10 p-8 md:p-10 ${item.dark ? "mt-auto text-white" : "text-ink"}`}>
                  {"badge" in item && (
                    <span
                      className={`mb-3 inline-block rounded-full px-3 py-1 text-[12px] font-semibold ${
                        item.badge === "Wkrótce" ? "bg-white/15 text-white backdrop-blur" : "bg-gold text-white"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  <h3 className="h-card">{item.title}</h3>
                  <p className={`mt-3 max-w-[40ch] text-[17px] leading-snug ${item.dark ? "text-white/80" : "text-mute"}`}>
                    {item.text}
                  </p>
                  <span className={`mt-5 inline-flex items-center gap-1 text-[15px] font-medium ${item.dark ? "text-white" : "text-[#0071e3]"}`}>
                    {item.cta}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
