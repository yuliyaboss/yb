#!/usr/bin/env bash
# Пересборка Карты 108 и вкладыша. Запуск: ./build.sh
set -e
cd "$(dirname "$0")"
B=build; mkdir -p $B/cells $B/tiles
cp src/* $B/
cp assets/fonts/*.ttf assets/photos/* $B/
cp assets/cells/*.png $B/cells/
cp assets/*.jpg assets/*.png $B/
cp assets/photos/bb7ff5b6-image.jpg $B/src.jpg
cd $B
python3 map.py          # -> Карта 108.jpg + заставка
python3 tiles.py        # -> tiles/*.jpg для вкладыша
node insert.js          # -> вкладыш (старый)
node i8.js              # -> I.8 — рабочая тетрадь.pdf + I.8 — дни 1–108.pdf
cp "Карта I.8.jpg" "Карта I.8 — заставка.jpg" I.8*.pdf ../output/
echo "Готово: output/"
