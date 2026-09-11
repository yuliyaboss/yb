#!/usr/bin/env python3
"""Printability gate for generated art.

The Visual Bible's rules are print-legibility rules, and the two an image
model breaks most often are measurable directly off the pixels:

  1. It sneaks in grey. Anti-aliasing is fine and unavoidable; large midtone
     AREAS mean shading, and shading cannot be colored.
  2. It sneaks in solid black fills, which eat colorable area.

This does not replace looking at the page. It catches the two failures that
are boring to spot by eye and fatal at print.

    python3 qa.py sheets/cast-sheet.png
"""
import sys, os
from PIL import Image, ImageFilter

# Tolerances. Anti-aliased edges of a 4px ink line at 2K are a few percent of
# the page; real shading is far more. 8% is comfortably between the two.
MAX_MIDTONE = 0.08
MAX_BLACK   = 0.14      # ink coverage above this reads as heavy/filled
MIN_WHITE   = 0.60      # the Bible asks >=30% white in the art band alone


def report(path):
    im = Image.open(path).convert("L")
    px = list(im.getdata())
    n = len(px)
    white = sum(1 for v in px if v >= 245) / n
    black = sum(1 for v in px if v <= 25) / n
    mid = 1.0 - white - black

    # Midtone that survives a median filter is an AREA, not an edge artefact.
    flat = im.filter(ImageFilter.MedianFilter(5))
    fpx = list(flat.getdata())
    solid_mid = sum(1 for v in fpx if 60 < v < 215) / n

    findings = []
    if solid_mid > MAX_MIDTONE:
        findings.append(f"HIGH  grey/shaded areas cover {solid_mid:.1%} "
                        f"(max {MAX_MIDTONE:.0%}) — regenerate, do not retouch")
    if black > MAX_BLACK:
        findings.append(f"HIGH  black coverage {black:.1%} (max {MAX_BLACK:.0%}) "
                        f"— likely solid fills eating colorable area")
    if white < MIN_WHITE:
        findings.append(f"WARN  only {white:.1%} white (min {MIN_WHITE:.0%}) — page reads busy")
    if im.width < 1500 or im.height < 1500:
        findings.append(f"WARN  {im.width}x{im.height} is below 300dpi for 8.5x11 "
                        f"(need 2550x3300) — draft resolution only")

    print(f"{os.path.basename(path)}  {im.width}x{im.height}")
    print(f"  white {white:6.1%}   black {black:6.1%}   midtone {mid:6.1%}   "
          f"flat-grey {solid_mid:6.1%}")
    for f in findings:
        print("  " + f)
    if not findings:
        print("  PASS  line art is clean, printable, and correctly sized")
    return findings


if __name__ == "__main__":
    bad = 0
    for p in sys.argv[1:]:
        if report(p):
            bad += 1
    sys.exit(1 if bad else 0)
