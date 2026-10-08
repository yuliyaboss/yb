# I.Qlean · iqlean.pl

Strona I.Qlean: sprzątanie po remoncie w Warszawie, Ready to Market, mycie wodą demineralizowaną (wkrótce).

Next.js 15 (App Router) · Tailwind CSS 4 · Framer Motion. Strona jest w pełni statyczna.

## Uruchomienie

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build produkcyjny
npm test           # testy kalkulatora
```

## Gdzie co zmieniać

| Co | Plik |
| --- | --- |
| Kontakt, telefon, e-mail, linki | `src/config/site.ts` |
| Stawki kalkulatora, Air Washer | `src/lib/pricing.ts` |
| Opinie klientów (sekcja pojawi się sama) | `src/config/reviews.ts` |
| FAQ | `src/components/faq.tsx` |
| Zdjęcia i wideo | `public/media/` |

Zdjęcia i wideo w `public/media` są wygenerowane (AI) i oznaczone na stronie jako wizualizacje poglądowe tam, gdzie pokazują efekt „przed/po”.

## Deploy (Vercel)

Projekt Vercel z **Root Directory = `iqlean`**. Framework: Next.js, bez zmiennych środowiskowych.
