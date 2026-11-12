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
node insert.js          # -> Протокол 108 — моя карта (вкладыш).pdf
cp "Карта 108.jpg" "Карта 108 — заставка.jpg" "Протокол 108 — моя карта (вкладыш).pdf" ../output/
echo "Готово: output/"
