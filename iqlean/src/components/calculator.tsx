"use client";

import clsx from "clsx";
import { Mail, MessageCircle } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";

import { mailtoLink, whatsappLink } from "@/config/site";
import { AIR_WASHER_PRICE, PROPERTY_TYPES, ROOMS, calculate, formatPLN, type Meble, type Pakiet } from "@/lib/pricing";
import { AnimatedPrice } from "./animated-number";
import { ButtonLink } from "./button";
import { Reveal } from "./reveal";

function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; hint?: string }[];
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-[15px] font-medium">{label}</legend>
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-soft p-1.5">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={clsx(
              "rounded-xl px-4 py-3 text-left transition-all duration-300",
              value === o.value ? "bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]" : "text-mute hover:text-ink",
            )}
          >
            <span className="block text-[16px] font-semibold">{o.label}</span>
            {o.hint && <span className="block text-[12px] text-mute">{o.hint}</span>}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function NumberField({
  label,
  value,
  onChange,
  placeholder,
  suffix = "m²",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  suffix?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-3 block text-[15px] font-medium">
        {label}
      </label>
      <div className="flex items-center rounded-2xl border border-line bg-white px-4 transition-colors focus-within:border-ink">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          step={1}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="h-14 w-full bg-transparent focus-visible:outline-none text-[20px] font-semibold tracking-tight outline-none placeholder:font-normal placeholder:text-line"
        />
        <span className="text-mute">{suffix}</span>
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: ReactNode }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-3 block text-[15px] font-medium">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-14 w-full appearance-none rounded-2xl border border-line bg-white bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22><path d=%22M1 1l5 5 5-5%22 stroke=%22%236e6e73%22 stroke-width=%221.5%22 fill=%22none%22/></svg>')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat px-4 text-[17px] outline-none focus:border-ink"
      >
        {children}
      </select>
    </div>
  );
}

export function Calculator() {
  const [pakiet, setPakiet] = useState<Pakiet>("Express");
  const [meble, setMeble] = useState<Meble>("bez");
  const [air, setAir] = useState<"nie" | "tak">("nie");
  const [metraz, setMetraz] = useState("");
  const [okna, setOkna] = useState("");
  const [balkon, setBalkon] = useState("");
  const [typ, setTyp] = useState<string>(PROPERTY_TYPES[0].value);
  const [pokoje, setPokoje] = useState<string>(ROOMS[1]);

  const { lines, total } = useMemo(
    () =>
      calculate({
        pakiet,
        meble,
        airWasher: air === "tak",
        metraz: parseFloat(metraz),
        okna: parseFloat(okna),
        balkon: parseFloat(balkon),
      }),
    [pakiet, meble, air, metraz, okna, balkon],
  );

  const typLabel = PROPERTY_TYPES.find((t) => t.value === typ)?.label ?? typ;
  const summary = `PAKIET
Pakiet: ${pakiet}
Meble: ${meble === "bez" ? "Bez mebli" : "Z meblami"}
Mycie powietrza (Air Washer): ${air === "tak" ? "Tak" : "Nie"}

PARAMETRY OBIEKTU
Metraż: ${metraz || 0} m²
Przeszklenia / okna: ${okna || 0} m²
Balkon / taras: ${balkon || 0} m²
Typ nieruchomości: ${typLabel}
Liczba pokoi: ${pokoje}

SZACUNKOWA WYCENA
~ ${formatPLN(total)}`;

  const mailBody = `Dzień dobry,

proszę o kontakt w sprawie rezerwacji terminu sprzątania po remoncie.

${summary}

DANE DO UZUPEŁNIENIA
Preferowany termin:
Adres:
Imię:
Telefon:
Dodatkowe informacje:

Dziękuję.`;

  const waText = `Dzień dobry, chcę zarezerwować sprzątanie po remoncie.\n\n${summary}\n\nPreferowany termin: `;
  const ready = total > 0;

  // Mobile: the price card sits below the form, so mirror the total in a bottom bar while the form is on screen.
  const formRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [asideVisible, setAsideVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === formRef.current) setFormVisible(e.isIntersecting);
        if (e.target === asideRef.current) setAsideVisible(e.isIntersecting);
      }
    });
    if (formRef.current) io.observe(formRef.current);
    if (asideRef.current) io.observe(asideRef.current);
    return () => io.disconnect();
  }, []);
  const showBar = formVisible && !asideVisible;

  return (
    <section id="kalkulator" className="bg-soft px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1080px]">
        <Reveal className="mb-12 text-center md:mb-16">
          <p className="eyebrow mb-4 text-gold">Kalkulator</p>
          <h2 className="h-section mx-auto max-w-[16ch]">Wycena w minutę.</h2>
          <p className="lead mx-auto mt-5 max-w-[50ch] text-mute">
            Cena orientacyjna. Ostateczną ofertę potwierdzamy po oględzinach, bo pod pyłem czasem kryje się więcej niż widać.
          </p>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div ref={formRef} className="space-y-8 rounded-[28px] bg-white p-6 md:p-10">
            <div className="grid gap-6 md:grid-cols-2">
              <Segmented
                label="Pakiet"
                value={pakiet}
                onChange={setPakiet}
                options={[
                  { value: "Express", label: "Express", hint: "szybki porządek" },
                  { value: "Ultimate", label: "Ultimate", hint: "perfekcyjna czystość" },
                ]}
              />
              <Segmented
                label="Meble"
                value={meble}
                onChange={setMeble}
                options={[
                  { value: "bez", label: "Bez mebli" },
                  { value: "z", label: "Z meblami" },
                ]}
              />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <NumberField label="Metraż" value={metraz} onChange={setMetraz} placeholder="np. 50" />
              <NumberField label="Przeszklenia" value={okna} onChange={setOkna} placeholder="0" />
              <NumberField label="Balkon / taras" value={balkon} onChange={setBalkon} placeholder="0" />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <SelectField label="Typ nieruchomości" value={typ} onChange={setTyp}>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </SelectField>
              <SelectField label="Liczba pokoi" value={pokoje} onChange={setPokoje}>
                {ROOMS.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </SelectField>
            </div>
            <Segmented
              label={`Mycie powietrza Air Washer (+${AIR_WASHER_PRICE} zł)`}
              value={air}
              onChange={setAir}
              options={[
                { value: "nie", label: "Nie" },
                { value: "tak", label: "Tak", hint: "polecamy po szlifowaniu" },
              ]}
            />
          </div>

          <aside ref={asideRef} id="wycena-podsumowanie" className="flex flex-col rounded-[28px] bg-ink p-6 text-white md:p-10 lg:sticky lg:top-20 lg:self-start">
            <p className="text-[15px] text-white/60">Szacunkowa wycena · {pakiet}</p>
            <p className="mt-2 text-[56px] font-semibold leading-none tracking-[-0.04em]" aria-live="polite">
              ~ <AnimatedPrice value={total} />
            </p>
            <ul className="mt-8 space-y-3 border-t border-white/10 pt-6 text-[14px]">
              {ready ? (
                lines.map((l) => (
                  <li key={l.label} className="flex justify-between gap-4">
                    <span className="text-white/65">{l.label}</span>
                    <span className="shrink-0 tabular-nums">{formatPLN(l.amount)}</span>
                  </li>
                ))
              ) : (
                <li className="text-white/50">Wpisz metraż, żeby zobaczyć cenę.</li>
              )}
            </ul>
            <div className="mt-10 grid gap-3">
              <ButtonLink
                href={ready ? whatsappLink(waText) : undefined}
                target="_blank"
                rel="noopener"
                variant="light"
                aria-disabled={!ready}
                className={clsx(!ready && "pointer-events-none opacity-40")}
              >
                <MessageCircle size={18} /> Zarezerwuj przez WhatsApp
              </ButtonLink>
              <ButtonLink
                href={ready ? mailtoLink("Rezerwacja terminu · I.Qlean", mailBody) : undefined}
                aria-disabled={!ready}
                className={clsx("border border-white/30 bg-transparent hover:bg-white/10", !ready && "pointer-events-none opacity-40")}
              >
                <Mail size={18} /> Wyślij e-mailem
              </ButtonLink>
            </div>
            <p className="mt-5 text-[12px] leading-relaxed text-white/45">
              Wycena otwiera się w WhatsApp lub poczcie z gotowym opisem. Dopisz termin i adres.
            </p>
          </aside>
        </div>
      </div>

      <div
        aria-hidden={!showBar}
        className={clsx(
          "fixed inset-x-3 bottom-3 z-40 flex items-center justify-between rounded-2xl bg-ink/95 px-5 py-3 text-white shadow-2xl backdrop-blur transition-all duration-500 lg:hidden",
          showBar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0",
        )}
      >
        <div>
          <p className="text-[11px] text-white/55">{pakiet} · szacunkowo</p>
          <p className="text-[22px] font-semibold tracking-tight">
            ~ <AnimatedPrice value={total} />
          </p>
        </div>
        <a href="#wycena-podsumowanie" tabIndex={showBar ? 0 : -1} className="rounded-full bg-white px-4 py-2 text-[14px] font-medium text-ink">
          Rezerwuj
        </a>
      </div>
    </section>
  );
}
