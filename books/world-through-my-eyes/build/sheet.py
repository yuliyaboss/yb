"""Build pages and lay them out as contact sheets for review."""
import sys, os, glob
import lib_ext  # sets sys.path to the skill lib
import charlib as cl
from PIL import Image


def build(pages, outdir="."):
    return cl.build(pages, outdir, only=[""])


def contact(names, out, cols=4, tile=430):
    ims = []
    for n in names:
        p = f"pages/{n}.png"
        if not os.path.exists(p):
            continue
        im = Image.open(p).convert("L")
        im.thumbnail((tile, tile * 2))
        ims.append((n, im))
    if not ims:
        return None
    tw = max(i.width for _, i in ims) + 8
    th = max(i.height for _, i in ims) + 8
    rows = (len(ims) + cols - 1) // cols
    sheet = Image.new("L", (tw * cols, th * rows), 210)
    for k, (n, im) in enumerate(ims):
        sheet.paste(im, ((k % cols) * tw + 4, (k // cols) * th + 4))
    sheet.save(out)
    return out
