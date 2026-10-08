"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { Reveal } from "./reveal";

const scope = [
  { title: "Pył budowlany", text: "Ściany, sufity, podłogi, parapety, ramy drzwi, gniazdka i włączniki.", img: "/media/hero.jpg" },
  { title: "Przeszklenia", text: "Okna z obu stron, ramy, wnęki, lustra i szklane przegrody.", img: "/media/detail-window.jpg" },
  { title: "Łazienka", text: "Płytki, fugi, szkło i armatura. Bez kamienia i bez zacieków.", img: "/media/bath.jpg" },
  { title: "Kuchnia", text: "Fronty, blaty, AGD z zewnątrz i w środku.", img: "/media/detail-kitchen.jpg" },
  { title: "Ślady materiałów", text: "Farba, cement, klej, silikon i fuga. Usuwamy tak, żeby nie zarysować.", img: "/media/detail-glass.jpg" },
  { title: "Detale i technika", text: "Listwy, oświetlenie, kratki wentylacyjne, skrzynki i inne instalacje.", img: "/media/detail-tech.jpg" },
  { title: "Balkon i taras", text: "Podłoga, balustrady i przeszklenia.", img: "/media/balcony.jpg" },
] as const;

export function Scope() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section className="overflow-hidden bg-soft py-24 md:py-32">
      <div className="mx-auto max-w-[1080px] px-5">
        <Reveal>
          <h2 className="h-section max-w-[18ch]">Co dokładnie sprzątamy.</h2>
          <p className="lead mt-5 max-w-[52ch] text-mute">
            Każdy remont jest inny, więc zakres ustalamy pod konkretne wnętrze. Tak wygląda standard.
          </p>
        </Reveal>
      </div>
      <div
        ref={track}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 md:px-[max(20px,calc((100vw-1080px)/2+20px))]"
      >
        {scope.map((s, i) => (
          <article
            key={s.title}
            className="relative h-[480px] w-[78vw] max-w-[360px] shrink-0 snap-start overflow-hidden rounded-[28px] bg-white"
          >
            <Image src={s.img} alt="" fill sizes="360px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
              <span className="text-[13px] font-semibold text-white/60">0{i + 1}</span>
              <h3 className="mt-1 text-[24px] font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-snug text-white/80">{s.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mx-auto mt-6 flex max-w-[1080px] justify-end gap-3 px-5">
        <button onClick={() => scroll(-1)} aria-label="Poprzednie" className="grid h-10 w-10 place-items-center rounded-full bg-black/8 hover:bg-black/12">
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => scroll(1)} aria-label="Następne" className="grid h-10 w-10 place-items-center rounded-full bg-black/8 hover:bg-black/12">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
