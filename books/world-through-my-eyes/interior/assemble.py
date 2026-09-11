#!/usr/bin/env python3
"""Assemble the KDP interior for THE WORLD THROUGH MY EYES.

Source-agnostic on purpose: it takes 40 finished art files (PNG or SVG, in
page order) and lays them into the 84-page block, whatever produced them.

    python assemble.py --art ../art/pages --out interior.pdf

Page plan (84 pages, a multiple of 4):

    p1   title page                 recto
    p2   copyright                  verso
    p3   this book belongs to       recto
    p4   blank                      verso
    p5   art page 1                 recto
    p6   blank                      verso
    ...
    p83  art page 40                recto
    p84  blank                      verso

Art always lands on a recto, so the gutter is always the LEFT edge and the
asymmetric margin below never has to flip.
"""
import argparse, glob, os, subprocess, sys, tempfile

PT = 72.0
TRIM_W, TRIM_H = 8.5 * PT, 11.0 * PT      # 612 x 792 pt
M_OUT   = 0.5  * PT                        # top / bottom / outside
M_GUT   = 0.625 * PT                       # spine side (left, art is on rectos)
ART_W   = TRIM_W - M_GUT - M_OUT
ART_H   = TRIM_H - 2 * M_OUT

TITLE   = "THE WORLD THROUGH MY EYES"
SUBTITLE = "40 Magical Coloring Pages for Curious Little Minds"
SERIES  = "The Little Minds Collection  ·  Book One"


def _esc(s):
    return s.replace("\\", r"\\").replace("(", r"\(").replace(")", r"\)")


def text_page(lines):
    """A front-matter page as a minimal PDF content stream via reportlab-free
    PostScript -> ghostscript. Keeps the toolchain to gs only."""
    out = ["%!PS-Adobe-3.0", f"<< /PageSize [{TRIM_W:.0f} {TRIM_H:.0f}] >> setpagedevice"]
    for text, size, y, font in lines:
        out.append(f"/{font} findfont {size} scalefont setfont")
        out.append(f"({_esc(text)}) dup stringwidth pop 2 div "
                   f"{TRIM_W/2 + (M_GUT - M_OUT)/2:.2f} exch sub {y:.2f} moveto show")
    out.append("showpage")
    return "\n".join(out) + "\n"


FRONT_MATTER = {
    1: [(TITLE, 26, 560, "Helvetica-Bold"),
        (SUBTITLE, 13, 522, "Helvetica"),
        (SERIES, 10, 250, "Helvetica")],
    2: [("Copyright (c) 2026", 9, 430, "Helvetica"),
        ("All rights reserved.", 9, 412, "Helvetica"),
        ("No part of this book may be reproduced without", 9, 388, "Helvetica"),
        ("written permission from the publisher.", 9, 374, "Helvetica"),
        ("Illustrations created with AI assistance.", 9, 344, "Helvetica"),
        ("The Little Minds Collection", 9, 300, "Helvetica")],
    3: [("This book belongs to", 20, 620, "Helvetica-Bold"),
        ("_______________________________", 20, 540, "Helvetica"),
        ("I am ______ years old", 14, 460, "Helvetica")],
}


def blank_ps():
    return ("%!PS-Adobe-3.0\n"
            f"<< /PageSize [{TRIM_W:.0f} {TRIM_H:.0f}] >> setpagedevice\nshowpage\n")


def build(art_files, out_path, workdir):
    if len(art_files) != 40:
        sys.exit(f"expected 40 art files, found {len(art_files)}")
    pdfs = []

    def gs_from_ps(ps, name):
        p_ps = os.path.join(workdir, name + ".ps")
        p_pdf = os.path.join(workdir, name + ".pdf")
        open(p_ps, "w").write(ps)
        subprocess.run(["gs", "-dBATCH", "-dNOPAUSE", "-q", "-sDEVICE=pdfwrite",
                        f"-sOutputFile={p_pdf}", p_ps], check=True)
        return p_pdf

    for n in (1, 2, 3):
        pdfs.append(gs_from_ps(text_page(FRONT_MATTER[n]), f"fm{n}"))
    pdfs.append(gs_from_ps(blank_ps(), "blank4"))

    import cairosvg
    from PIL import Image
    for i, art in enumerate(art_files, 1):
        p_pdf = os.path.join(workdir, f"art{i:02d}.pdf")
        if art.lower().endswith(".svg"):
            cairosvg.svg2pdf(url=art, write_to=p_pdf,
                             output_width=816, output_height=1056)
        else:
            im = Image.open(art).convert("RGB")
            scale = min(ART_W / im.width, ART_H / im.height)
            box = Image.new("RGB", (int(TRIM_W), int(TRIM_H)), "white")
            im = im.resize((int(im.width * scale), int(im.height * scale)))
            box.paste(im, (int(M_GUT + (ART_W - im.width) / 2),
                           int(M_OUT + (ART_H - im.height) / 2)))
            box.save(p_pdf, "PDF", resolution=300.0)
        pdfs.append(p_pdf)
        pdfs.append(gs_from_ps(blank_ps(), f"blank{i:02d}"))

    subprocess.run(["gs", "-dBATCH", "-dNOPAUSE", "-q", "-sDEVICE=pdfwrite",
                    "-dPDFSETTINGS=/prepress", "-dColorConversionStrategy=/LeaveColorUnchanged",
                    f"-sOutputFile={out_path}"] + pdfs, check=True)
    return len(pdfs)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--art", required=True, help="directory of 40 art files in page order")
    ap.add_argument("--out", default="World-Through-My-Eyes-Interior.pdf")
    a = ap.parse_args()
    files = sorted(glob.glob(os.path.join(a.art, "*.svg"))
                   or glob.glob(os.path.join(a.art, "*.png")))
    with tempfile.TemporaryDirectory() as wd:
        n = build(files, a.out, wd)
    print(f"{a.out}: {n} pages")
