export type Pakiet = "Express" | "Ultimate";
export type Meble = "bez" | "z";

export const RATES: Record<Pakiet, { baseBez: number; baseZ: number; okna: number; balkon: number }> = {
  Express: { baseBez: 15, baseZ: 20, okna: 35, balkon: 35 },
  Ultimate: { baseBez: 20, baseZ: 25, okna: 50, balkon: 50 },
};

export const AIR_WASHER_PRICE = 200;

export const PROPERTY_TYPES = [
  { value: "apartament", label: "Apartament" },
  { value: "dom", label: "Dom" },
  { value: "lokal", label: "Lokal" },
  { value: "biuro", label: "Biuro" },
] as const;

export const ROOMS = ["1", "2", "3", "4", "5+"] as const;

export type CalcInput = {
  pakiet: Pakiet;
  meble: Meble;
  airWasher: boolean;
  metraz: number;
  okna: number;
  balkon: number;
};

export type CalcLine = { label: string; amount: number };

function clean(n: number) {
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function calculate(input: CalcInput): { lines: CalcLine[]; total: number } {
  const r = RATES[input.pakiet];
  const m = clean(input.metraz);
  const ok = clean(input.okna);
  const b = clean(input.balkon);
  const baseRate = input.meble === "bez" ? r.baseBez : r.baseZ;

  const lines: CalcLine[] = [
    { label: `Sprzątanie ${input.meble === "bez" ? "bez mebli" : "z meblami"} · ${m} m² × ${baseRate} zł`, amount: baseRate * m },
  ];
  if (ok > 0) lines.push({ label: `Przeszklenia · ${ok} m² × ${r.okna} zł`, amount: r.okna * ok });
  if (b > 0) lines.push({ label: `Balkon / taras · ${b} m² × ${r.balkon} zł`, amount: r.balkon * b });
  if (input.airWasher) lines.push({ label: "Mycie powietrza (Air Washer)", amount: AIR_WASHER_PRICE });

  // Without a floor area there is nothing to quote, add-ons alone don't make an order.
  const total = m > 0 ? lines.reduce((s, l) => s + l.amount, 0) : 0;
  return { lines, total };
}

export const formatPLN = (n: number) =>
  new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 }).format(n);
