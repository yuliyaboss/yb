import Image from "next/image";
import { Bell, Droplets, Sun, Building2, Store, Home } from "lucide-react";

import { mailtoLink, whatsappLink } from "@/config/site";
import { ButtonLink } from "./button";
import { Reveal } from "./reveal";

const uses = [
  { icon: Sun, title: "Panele fotowoltaiczne", text: "Kurz, pyłki i ptasie ślady obniżają produkcję prądu. Myjemy delikatnie, bez detergentów." },
  { icon: Building2, title: "Elewacje i fasady szklane", text: "Biurowce, apartamentowce, domy z dużymi przeszkleniami." },
  { icon: Home, title: "Okna na wysokości", text: "Antresole, salony z antresolą, okna dachowe. Z poziomu ziemi, bez rusztowań." },
  { icon: Store, title: "Witryny i lokale", text: "Sklepy, showroomy, restauracje. Regularnie, zanim przyjdą klienci." },
];

export function ComingSoon() {
  const notify = "Dzień dobry, proszę o informację, gdy ruszy mycie paneli / elewacji wodą demineralizowaną. Obiekt: ";
  return (
    <section id="wkrotce" className="relative overflow-hidden bg-black text-white">
      <div className="relative h-[80svh] min-h-[560px]">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          src="/media/pv.mp4"
          poster="/media/pv-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1080px] flex-col justify-end px-5 pb-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[12px] font-semibold backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" /> Wkrótce
            </span>
            <h2 className="h-display mt-5 max-w-[13ch]">Czysta woda. Nic więcej.</h2>
            <p className="lead mt-5 max-w-[50ch] text-white/75">
              Wprowadzamy mycie wodą demineralizowaną. System podwójnej osmozy usuwa z wody wapń, magnez i sole, więc szkło
              i panele wysychają bez smug i zacieków. Myjemy z ziemi, teleskopowym kijem ze szczotką.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1080px] px-5 pb-24 md:pb-32">
        <div className="grid gap-4 md:grid-cols-2">
          {uses.map((u, i) => (
            <Reveal key={u.title} delay={(i % 2) * 0.06}>
              <div className="h-full rounded-[24px] bg-white/[0.06] p-7 ring-1 ring-white/10 backdrop-blur">
                <u.icon size={24} strokeWidth={1.6} className="text-gold" />
                <h3 className="mt-5 text-[20px] font-semibold tracking-tight">{u.title}</h3>
                <p className="mt-2 text-[15px] leading-snug text-white/65">{u.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="relative h-[360px] overflow-hidden rounded-[24px]">
              <Image src="/media/soon-facade.jpg" alt="Mycie szklanej elewacji wodą demineralizowaną" fill sizes="(min-width:768px) 600px, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="flex h-full flex-col justify-between rounded-[24px] bg-white p-8 text-ink">
              <div>
                <Droplets size={26} strokeWidth={1.6} className="text-gold" />
                <h3 className="h-card mt-5">Bądź pierwszy na liście.</h3>
                <p className="mt-3 text-[15px] text-mute">
                  Startujemy w ciągu najbliższych miesięcy. Zapisani klienci dostaną pierwsze terminy i cenę startową.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={whatsappLink(notify)} target="_blank" rel="noopener">
                  <Bell size={16} /> Zapisz mnie
                </ButtonLink>
                <ButtonLink href={mailtoLink("Lista oczekujących · mycie paneli i elewacji", notify)} variant="secondary">
                  E-mail
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
