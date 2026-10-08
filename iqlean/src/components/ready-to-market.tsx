import { ArrowRight, Hammer, PaintRoller, Sofa, Sparkles, Camera, Layers } from "lucide-react";

import { whatsappLink } from "@/config/site";
import { BeforeAfter } from "./before-after";
import { ButtonLink } from "./button";
import { Reveal } from "./reveal";

const scope = [
  { icon: Hammer, title: "Drobny remont", text: "Naprawy, wymiana gniazdek, klamek, silikonów, listew." },
  { icon: PaintRoller, title: "Ściany", text: "Szpachlowanie i malowanie na jasne, neutralne kolory." },
  { icon: Layers, title: "Podłogi", text: "Odświeżenie, cyklinowanie albo nowa wykładzina." },
  { icon: Sofa, title: "Meble i home staging", text: "Wywóz starych mebli, aranżacja pod kupującego." },
  { icon: Sparkles, title: "Sprzątanie generalne", text: "Na koniec nasz standard Ultimate." },
  { icon: Camera, title: "Gotowe do zdjęć", text: "Przygotowanie wnętrza pod sesję i prezentacje." },
];

const steps = [
  ["Oględziny", "Przyjeżdżamy, oglądamy i spisujemy, co warto zmienić, a czego nie ruszać."],
  ["Plan i wycena", "Dostajesz listę prac, termin i jedną cenę za całość."],
  ["Realizacja", "Koordynujemy wszystkie prace. Ty nie szukasz pięciu ekip."],
  ["Odbiór", "Oddajemy klucze do mieszkania gotowego na pierwsze oglądanie."],
];

export function ReadyToMarket() {
  return (
    <section id="ready-to-market" className="bg-white px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1080px]">
        <Reveal className="mb-12 text-center md:mb-16">
          <p className="eyebrow mb-4 inline-flex items-center gap-2 text-gold">
            <span className="rounded-full bg-gold px-2.5 py-0.5 text-[11px] text-white">Nowość</span> Ready to Market
          </p>
          <h2 className="h-section mx-auto max-w-[17ch]">Mieszkanie gotowe na pierwsze oglądanie.</h2>
          <p className="lead mx-auto mt-5 max-w-[56ch] text-mute">
            Przygotowujemy nieruchomość do sprzedaży lub najmu. Jeden kontakt zamiast kilku ekip: remont, ściany, podłogi,
            meble i sprzątanie. Zakres nie ma sztywnych granic, a cenę ustalamy indywidualnie.
          </p>
        </Reveal>

        <Reveal>
          <BeforeAfter
            before="/media/rtm-before.jpg"
            after="/media/rtm-after.jpg"
            beforeLabel="Dziś"
            afterLabel="Na sprzedaż"
            alt="Mieszkanie przygotowane do sprzedaży"
          />
        </Reveal>
        <p className="mt-4 text-center text-[13px] text-mute">Wizualizacja poglądowa.</p>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scope.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.06}>
              <div className="h-full rounded-[24px] bg-soft p-7">
                <s.icon size={26} strokeWidth={1.6} className="text-gold" />
                <h3 className="mt-5 text-[20px] font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-snug text-mute">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <Reveal>
            <h3 className="h-card max-w-[14ch]">Dla właścicieli, agentów i inwestorów.</h3>
            <p className="mt-4 text-[17px] leading-relaxed text-mute">
              Sprzedajesz mieszkanie po rodzicach, szykujesz lokal pod najem albo prowadzisz flip. Mówisz, na kiedy ma być gotowe,
              a my układamy resztę.
            </p>
            <ButtonLink
              href={whatsappLink("Dzień dobry, interesuje mnie usługa Ready to Market. Chcę umówić oględziny. Adres / dzielnica: ")}
              target="_blank"
              rel="noopener"
              className="mt-8"
            >
              Umów oględziny <ArrowRight size={16} />
            </ButtonLink>
          </Reveal>
          <ol className="space-y-0">
            {steps.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06}>
                <li className="flex gap-6 border-t border-black/8 py-6">
                  <span className="text-[15px] font-semibold text-gold tabular-nums">0{i + 1}</span>
                  <div>
                    <p className="text-[19px] font-semibold tracking-tight">{t}</p>
                    <p className="mt-1 text-[15px] text-mute">{d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
