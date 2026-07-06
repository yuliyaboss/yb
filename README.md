# Prime Era

Inteligentny kreator smoothie — premium interactive landing page z dynamicznym
silnikiem rekomendacji (Next.js 15, React 19, TypeScript, Tailwind CSS, Framer
Motion). Zbudowane wg PRD Prime Era: 11 celów, baza składników z wagami per
cel, rule-based recommendation engine (bez hardkodowanych przepisów),
wyjaśnialność wyboru składników, zamienniki, shopping list, eksport PDF,
email capture, SEO i RODO/GDPR compliance.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
shadcn-style UI (Radix + cva) · Framer Motion · Zustand · React Hook Form +
Zod · pdf-lib · Vitest · Playwright

## Uruchomienie

```bash
npm install
npm run dev       # http://localhost:3000
```

Inne skrypty:

```bash
npm run build      # production build
npm run start       # serve production build
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
npm test             # vitest (unit — recommendation engine)
npm run test:e2e     # playwright (e2e — pełny happy path buildera)
```

## Zmienne środowiskowe

Skopiuj `.env.example` do `.env.local` i uzupełnij w razie potrzeby —
wszystkie są opcjonalne, analytics pozostaje wyłączony dopóki ID nie zostaną
podane (patrz `.env.example`).

## Architektura

```
src/
├── app/                 # App Router: landing, /builder, /cele/[slug], strony prawne, API routes
├── components/
│   ├── ui/              # shadcn-style prymitywy (Radix + cva)
│   ├── landing/         # sekcje strony głównej
│   ├── builder/         # kreator: kroki, karta przepisu, swap, shopping list, boostery
│   ├── shared/          # glass panel, nagłówki sekcji, CTA, animacje
│   └── analytics/       # GA4 / Meta Pixel, gated by cookie consent
├── lib/
│   ├── engine/          # rule + scoring recommendation engine (czyste funkcje)
│   ├── data/             # baza składników, 11 celów, preferencje
│   ├── pdf/               # generator PDF (pdf-lib, embedded Roboto z polskimi znakami)
│   ├── analytics/       # typed event catalog, GA4/Meta CAPI integration points
│   ├── seo/              # metadata + JSON-LD builders
│   └── validation/       # zod schemas
├── hooks/                # use-builder-store (zustand), use-recipe-generation, use-ingredient-swap, ...
└── types/                 # Ingredient, Goal, Recipe, Preferences, Builder, Analytics
```

Silnik rekomendacji (`lib/engine`) jest w pełni oddzielony od UI: filtruje
składniki wg alergenów/diety, ocenia je wg wag celu i tagów, gwarantuje
obecność białka/błonnika/antyoksydantu w każdej recepturze, generuje
wyjaśnienia w miękkim, compliance-friendly tonie (bez oświadczeń
zdrowotnych/medycznych) i obsługuje zamienniki składników.

## Testy

- `tests/unit/engine/*` — Vitest, pokrywają filtrowanie, scoring, generację
  receptury dla wszystkich 11 celów, zamienniki i kalkulację wartości
  odżywczych.
- `tests/e2e/builder-flow.spec.ts` — Playwright, pełny happy path: landing →
  wybór celu → preferencje → generacja → zamiana składnika → lista zakupów →
  email capture.
