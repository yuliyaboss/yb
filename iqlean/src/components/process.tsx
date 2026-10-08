import { Reveal } from "./reveal";

const steps = [
  { n: "01", t: "Wycena", d: "Liczysz w kalkulatorze albo wysyłasz kilka zdjęć na WhatsApp." },
  { n: "02", t: "Potwierdzenie", d: "Ustalamy termin i zakres. Przy większych obiektach przyjeżdżamy na oględziny." },
  { n: "03", t: "Sprzątanie", d: "Przyjeżdżamy z własnym sprzętem i środkami. Pracujemy cicho i po kolei, od góry do dołu." },
  { n: "04", t: "Odbiór", d: "Sprawdzasz efekt razem z nami. Jeśli coś zostało, poprawiamy od razu." },
];

export function Process() {
  return (
    <section className="bg-white px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1080px]">
        <Reveal className="mb-14 px-1">
          <h2 className="h-section max-w-[14ch]">Jak pracujemy.</h2>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-[28px] bg-black/8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="bg-soft">
              <Reveal delay={i * 0.06} className="h-full p-8">
                <p className="text-[48px] font-semibold leading-none tracking-[-0.04em] text-black/12">{s.n}</p>
                <h3 className="mt-8 text-[21px] font-semibold tracking-tight">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-snug text-mute">{s.d}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
