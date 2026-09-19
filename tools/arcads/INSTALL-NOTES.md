# Arcads skill pack: co zostało zainstalowane

Źródło: https://github.com/krusemediallc/arcads-claude-code (MIT)

## Różnice względem upstreamu

- `references/` (119 MB zdjęć referencyjnych) pominięte. Pobierz z repozytorium
  źródłowego, jeśli będą potrzebne do spójności postaci.
- `.claude/settings.json` z hookiem `SessionStart` usunięty. Hook uruchamiał
  `sync-skill.sh` i `check-context.sh` przy starcie każdej sesji.
- `.claude/skills/` jest tu wersjonowane (upstream je ignoruje), żeby umiejętności
  były dostępne w sesjach webowych bez uruchamiania synchronizacji.
- `.cursor/` i `logs/` pominięte.

## Zanim to zadziała

Potrzebny jest klucz API z konta Arcads: https://app.arcads.ai/settings/api

```bash
cd tools/arcads
cp .env.example .env   # wpisz ARCADS_BASIC_AUTH
./scripts/check-arcads-env.sh
```

Bez klucza żadna z umiejętności nie wykona wywołania.

## Meta

Umiejętność `meta-ad-builder` publikuje kreacje przez Meta Marketing API i wymaga
osobnego tokenu. Nie jest potrzebna: konto reklamowe jest już podłączone przez
oficjalny konektor Meta Ads.
