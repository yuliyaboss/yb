import { Check, Minus } from "lucide-react";

import { RATES } from "@/lib/pricing";
import { ButtonLink } from "./button";
import { Reveal } from "./reveal";

type Cell = boolean | string;

const rows: { label: string; express: Cell; ultimate: Cell }[] = [
  { label: "Pył budowlany ze ścian i sufitów", express: false, ultimate: true },
  { label: "Podłogi, parapety, gniazdka, włączniki", express: true, ultimate: true },
  { label: "Detale: listwy, meble, oświetlenie, AGD", express: "podstawowe", ultimate: true },
  { label: "Materiały delikatne: kamień, drewno, szkło", express: "podstawowe", ultimate: true },
  { label: "Mycie okien i przeszkleń", express: "2 etapy", ultimate: "5 etapów" },
  { label: "Ślady farby, cementu, fugi", express: "podstawowe", ultimate: true },
  { label: "Łazienka i kuchnia", express: "podstawowe", ultimate: true },
  { label: "Elementy techniczne: skrzynki, wentylacja", express: "podstawowe", ultimate: true },
  { label: "Balkon / taras", express: "podstawowe", ultimate: true },
  { label: "Mycie powietrza (Air Washer)", express: "opcja", ultimate: "opcja" },
  { label: "Czas realizacji", express: "4–10 godzin", ultimate: "od 1 dnia" },
];

function CellView({ v }: { v: Cell }) {
  if (v === true) return <Check size={18} className="mx-auto text-ink" aria-label="tak" />;
  if (v === false) return <Minus size={18} className="mx-auto text-line" aria-label="nie" />;
  return <span className="text-[12px] text-mute sm:text-[14px]">{v}</span>;
}

const plans = [
  {
    key: "Express" as const,
    tag: "Szybki porządek",
    who: "Dla tych, którzy chcą się szybko wprowadzić.",
    dark: false,
  },
  {
    key: "Ultimate" as const,
    tag: "Perfekcyjna czystość",
    who: "Dla wymagających. Każdy detal, każda fuga.",
    dark: true,
  },
];

export function Packages() {
  return (
    <section id="pakiety" className="bg-white px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1080px]">
        <Reveal className="mb-14 text-center">
          <p className="eyebrow mb-4 text-gold">Dwa poziomy perfekcji</p>
          <h2 className="h-section mx-auto max-w-[16ch]">Wybierz pakiet. Cena za metr, bez niespodzianek.</h2>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {plans.map((p, i) => {
            const r = RATES[p.key];
            return (
              <Reveal key={p.key} delay={i * 0.08}>
                <div className={`flex h-full flex-col rounded-[28px] p-8 md:p-10 ${p.dark ? "bg-ink text-white" : "bg-soft"}`}>
                  <p className={`eyebrow ${p.dark ? "text-gold" : "text-mute"}`}>{p.tag}</p>
                  <h3 className="mt-2 text-[44px] font-semibold tracking-[-0.03em]">{p.key}</h3>
                  <p className={`mt-1 text-[17px] ${p.dark ? "text-white/70" : "text-mute"}`}>{p.who}</p>
                  <dl className={`mt-8 divide-y ${p.dark ? "divide-white/10" : "divide-black/8"}`}>
                    {[
                      ["Bez mebli", r.baseBez],
                      ["Z meblami", r.baseZ],
                      ["Przeszklenia", r.okna],
                      ["Balkon / taras", r.balkon],
                    ].map(([label, price]) => (
                      <div key={label} className="flex items-baseline justify-between py-3">
                        <dt className={p.dark ? "text-white/80" : "text-ink/80"}>{label}</dt>
                        <dd>
                          <span className="text-[22px] font-semibold tracking-tight">{price} zł</span>
                          <span className={`ml-1 text-[13px] ${p.dark ? "text-white/50" : "text-mute"}`}>/ m²</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <ButtonLink href="#kalkulator" variant={p.dark ? "light" : "primary"} className="mt-8 self-start">
                    Policz {p.key}
                  </ButtonLink>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-4 text-center text-[13px] text-mute">Ceny brutto. Mycie powietrza Air Washer: +200 zł za zlecenie.</p>

        <Reveal className="mt-20">
          <h3 className="h-card mb-6 px-1">Porównanie pakietów</h3>
          <div className="overflow-hidden rounded-[28px] border border-black/8">
            <table className="w-full text-left text-[13px] sm:text-[15px]">
              <thead>
                <tr className="border-b border-black/8 bg-soft">
                  <th className="px-4 py-4 font-medium text-mute sm:px-6">Zakres</th>
                  <th className="w-[24%] px-2 py-4 text-center font-semibold sm:px-4">Express</th>
                  <th className="w-[24%] px-2 py-4 text-center font-semibold sm:px-4">Ultimate</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-black/5 last:border-0">
                    <td className="px-4 py-4 sm:px-6">{row.label}</td>
                    <td className="px-2 py-4 text-center sm:px-4"><CellView v={row.express} /></td>
                    <td className="px-2 py-4 text-center sm:px-4"><CellView v={row.ultimate} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
