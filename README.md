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

## Roadmap i punkty rozszerzeń (nie zaimplementowane)

MVP jest celowo bezstanowe/anonimowe — cały stan buildera żyje w Zustand po
stronie klienta, bez kont użytkowników ani bazy danych. To był świadomy
wybór dla szybkiego, lekkiego MVP, ale **każdy z poniższych przyszłych modułów
wymaga najpierw jednej wspólnej fundacji: kont użytkowników + bazy danych +
warstwy auth.** To największa pojedyncza inwestycja architektoniczna przed
kolejnym etapem — nic w obecnym kodzie jej nie blokuje, ale też nic jej dziś
nie zapewnia.

Rekomendowany, nieinwazyjny sposób dołożenia tej fundacji, gdy przyjdzie czas:
- Auth: Auth.js (NextAuth) lub Clerk — sesja jako middleware, bez ingerencji
  w istniejące publiczne strony.
- Baza danych: Postgres (Neon/Supabase) + Drizzle lub Prisma jako ORM.
- Nowa grupa tras (np. `app/(app)/...` jako Next.js route group) chroniona
  middleware, całkowicie oddzielona od dzisiejszych publicznych stron —
  nie wymaga przenoszenia ani zmiany istniejących tras.

Jak wpięłyby się poszczególne moduły:

| Moduł | Co dodać | Co już jest gotowe |
|---|---|---|
| **Personalizowane plany posiłków** | Warstwa "plan" komponująca wiele receptur w tydzień + zapis planu do konta użytkownika | `lib/engine` już generuje pojedyncze receptury z czystych funkcji — bezpośrednio wielokrotnego użytku, zero przepisywania |
| **AI Coach** | Endpoint czatu (server-side wywołanie LLM), historia rozmów w bazie, `lib/engine` wystawiony jako "tool" wywoływany przez model | Typowany katalog składników/celów to gotowy kontekst/tool-schema dla LLM |
| **Habit Tracker** | Model dziennych wpisów per użytkownik, `app/(app)/habits/` | Brak konfliktu — zupełnie nowy, niezależny moduł |
| **Women's Cycle** | Model danych cyklu — uwaga: dane szczególnej kategorii wg art. 9 RODO, wymagają wyraźnej zgody i dodatkowych zabezpieczeń dostępu | Ton copy i wzorzec zgody (`use-cookie-consent`) już zgodne z restrykcyjnym podejściem do zgód |
| **Subskrypcja** | Integracja Stripe (checkout + webhook `app/api/webhooks/stripe/`), model planu/uprawnień, middleware bramkujące funkcje premium | Struktura API routes (`app/api/...`) już ustanawia wzorzec dla nowych endpointów |

Żaden z powyższych modułów nie został zaimplementowany w tym MVP — powyższe to
świadomie udokumentowane punkty rozszerzeń, nie kod.
