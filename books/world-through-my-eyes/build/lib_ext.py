"""Project extensions for THE WORLD THROUGH MY EYES.

Everything here is frozen canon for the Little Minds Collection: the cast
trait dicts, the two helpers charlib does not ship (Waffles the dachshund and
Leo's paper-plane motif), and the KDP-margin page frame.
"""
import sys, os
SKILL = "/root/.claude/skills/coloring-book"
sys.path.insert(0, os.path.join(SKILL, "lib"))

from charlib import *            # noqa: F401,F403
import charlib as cl

W, H = cl.W, cl.H

# ---------------------------------------------------------------- page frame
# Art pages print on RECTOS (blank versos), so the gutter is always the LEFT
# edge. 0.625in spine side, 0.5in elsewhere.
FR_L, FR_R, FR_T, FR_B = 62, 800, 50, 1050
TITLE_Y = 108
ART_TOP, ART_BOT = 165, 950


def fit_title(text, max_w=690, base=40):
    """Titles overflowed the frame on three pages of the first draft. Estimate
    the bold advance (0.62 em, per the drawing guide) and shrink to fit."""
    est = 0.62 * base * len(text)
    return base if est <= max_w else max(24, int(max_w / (0.62 * len(text))))


def bpage(title, body, num=None, layout=None, title_size=None):
    """Full page with the KDP-margin frame. Mirrors charlib.spage otherwise."""
    parts = [f'<rect data-chrome="1" x="0" y="0" width="{W}" height="{H}" fill="white"/>',
             f'<rect data-chrome="1" x="{FR_L}" y="{FR_T}" width="{FR_R - FR_L}" '
             f'height="{FR_B - FR_T}" rx="24" fill="none" stroke="black" stroke-width="6"/>']
    if layout:
        body = f'<g data-layout="{layout}">' + body + "</g>"
    parts.append(body)
    chrome = []
    if title:
        cx = (FR_L + FR_R) / 2
        ts = title_size or fit_title(title)
        chrome.append(cl.TXT(cx, TITLE_Y, title, ts))
        chrome.append(cl.P(f"M {cx-250} {TITLE_Y+22} Q {cx} {TITLE_Y+40} {cx+250} {TITLE_Y+22}", 4))
    if num:
        chrome.append(cl.TXT((FR_L + FR_R) / 2, 1022, str(num), 20, weight="normal"))
    if chrome:
        parts.append('<g data-chrome="1">' + "".join(chrome) + "</g>")
    return cl._serialize(
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" '
        f'viewBox="0 0 {W} {H}">' + "".join(parts) + "</svg>")


def blank_page():
    return cl._serialize(
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" '
        f'viewBox="0 0 {W} {H}"><rect x="0" y="0" width="{W}" height="{H}" fill="white"/></svg>')


# ---------------------------------------------------------------- new helpers
def paper_plane(cx, cy, s=1.0, rot=0, sw=4):
    """Leo's motif: a folded paper dart, nose to the right. Three straight
    lines plus a fold — deliberately the simplest shape in the book."""
    d = (f"M {-46*s} {-26*s} L {54*s} {0*s} L {-46*s} {26*s} "
         f"L {-30*s} {0*s} Z")
    out = cl.P(d, sw, "white")
    out += cl.P(f"M {-46*s} {-26*s} L {-30*s} {0*s} L {-46*s} {26*s}", sw * 0.7)
    return cl.G(cx, cy, out, 1.0, rot)


def _leg(x, top, bot, w=11):
    """Short stubby leg with a rounded paw, as one closed shape."""
    return cl.P(f"M {x-w} {top} L {x+w} {top} L {x+w*0.92} {bot-6} "
                f"Q {x+w*0.92} {bot} {x+w*0.3} {bot} "
                f"L {x-w*0.3} {bot} Q {x-w*0.92} {bot} {x-w*0.92} {bot-6} Z",
                4.5, "white")


def dachshund(t=None, pose="stand", tongue=False):
    """Waffles. Side view facing right, origin at FEET CENTRE, ~150 tall and
    ~300 long at scale 1.0. Body length to body height runs about 4.8:1 --
    that ratio IS the character; do not let it drift between books."""
    t = t or {}
    out = []
    # legs first: the body's white fill closes over their tops
    for lx in (-92, -62, 72, 102):
        out.append(_leg(lx, -46, -2))
    # tail: closed tapered shape, clearly growing out of the rump
    out.append(cl.P("M -112 -76 Q -132 -88 -142 -112 Q -132 -118 -126 -110 "
                    "Q -120 -92 -106 -84 Z", 4.5, "white"))
    # body: one long G1-continuous silhouette, low and level
    out.append(cl.smooth_path(
        [(-114, -60), (-120, -80), (-104, -92), (-58, -97), (0, -98),
         (54, -96), (92, -90), (110, -76), (112, -56),
         (98, -42), (52, -37), (0, -36), (-54, -37), (-98, -45)],
        4.5, closed=True, fill="white"))
    # neck into the head
    out.append(cl.P("M 98 -86 Q 120 -102 132 -114", 4.5, "white"))
    out.append(cl.C(150, -120, 25, 4.5, "white"))
    out.append(cl.P("M 170 -120 Q 194 -117 192 -103 Q 180 -96 166 -102",
                    4, "white"))                       # long muzzle
    out.append(cl.DOT(189, -110, 3.6))                 # nose
    out.append(cl.DOT(154, -128, 3))                   # eye
    if tongue:
        out.append(cl.P("M 180 -98 Q 183 -85 174 -83 Q 170 -91 172 -97", 3.5, "white"))
    else:
        out.append(cl.P("M 176 -99 Q 170 -93 163 -95", 3.5))
    # long floppy ear: hangs past the jaw on the NECK side, clear of the eye
    out.append(cl.P("M 136 -136 Q 112 -134 110 -104 Q 109 -76 124 -70 "
                    "Q 133 -96 138 -126 Z", 4, "white"))
    # saddle patch: clear of the silhouette on every side
    if t.get("coat", "patch") == "patch":
        out.append(cl.smooth_path(
            [(-52, -88), (-14, -92), (28, -90), (54, -82),
             (26, -72), (-12, -74), (-46, -78)], 3.5, closed=True))
    if t.get("collar", True):
        out.append(cl.P("M 114 -100 Q 126 -88 140 -92", 3.5))
        out.append(cl.G(126, -80, cl.bone(0, 0, 0.34, 3), 1.0))
    return '<g data-el="figure">' + "".join(out) + "</g>"


def dachshund_sleep(t=None):
    """Waffles lying down, origin at ground, facing right. ~250 long."""
    t = t or {}
    out = [cl.E(-10, -32, 96, 30, 4.5, "white")]
    out.append(cl.smooth_path([(-104, -22), (-126, -32), (-130, -56),
                               (-116, -50), (-110, -38)], 4.5))
    out.append(cl.C(104, -36, 25, 4.5, "white"))
    out.append(cl.P("M 126 -34 Q 148 -32 146 -20 Q 134 -13 120 -18", 4, "white"))
    out.append(cl.DOT(143, -26, 3.4))
    out.append(cl.P("M 98 -42 Q 103 -38 108 -42", 3))          # closed eye
    out.append(cl.P("M 92 -52 Q 70 -54 68 -28 Q 68 -8 86 -6 "
                    "Q 92 -30 96 -46 Z", 4, "white"))
    out.append(cl.P("M -60 -50 Q -20 -58 24 -56 Q 54 -54 68 -48 "
                    "Q 34 -38 -4 -40 Q -38 -42 -60 -50 Z", 3.5))
    out.append(cl.P("M -66 -6 L 66 -6", 4))
    return '<g data-el="figure">' + "".join(out) + "</g>"


def wonder_star(x, y, r=13):
    """The hidden star. One per page, never near a face, never over 30px."""
    return cl.star(x, y, r, 3.2)


# ---------------------------------------------------------------- cast canon
MIA = {"name": "Mia", "age": 6, "hair": "bob_bangs", "glasses": False,
       "freckles": True, "outfit": "dress", "motif": "star", "scale": 1.00}
LEO = {"name": "Leo", "age": 5, "hair": "tousled", "glasses": True,
       "freckles": False, "outfit": "tee", "motif": "paper_plane", "scale": 0.96}
WAFFLES = {"name": "Waffles", "coat": "patch", "collar": True}
MOMO = {"name": "Momo", "coat": "stripes"}
PIP = {"name": "Pip"}

# pyjama variants (pages 25, 27 only — the one sanctioned outfit exception)
MIA_PJ = dict(MIA, outfit="dress")
LEO_PJ = dict(LEO, outfit="tee")


_SPECIAL = {"point": "kid_point", "run": "kid_run", "jump": "kid_jump",
            "carry": "kid_carry", "reach": "kid_reach"}


def figure(t, pose="hold", outfit=None, acc=()):
    """One entry point for every kid pose: charlib splits some poses out into
    their own functions, which is easy to forget mid-page."""
    if pose in _SPECIAL:
        return getattr(cl, _SPECIAL[pose])(t, outfit)
    return cl.kid_stand(t, pose=pose, outfit=outfit, accessories=acc)


def mia(pose="hold", s=1.30, x=0, y=0, acc=(), flip=False, mat=True):
    f = cl.GM if flip else cl.G
    g = f(x, y, figure(MIA, pose, acc=acc), s)
    return cl.matted(g, 9, s) if mat else g


def leo(pose="hold", s=1.25, x=0, y=0, acc=(), flip=False, mat=True):
    f = cl.GM if flip else cl.G
    g = f(x, y, figure(LEO, pose, acc=acc), s)
    return cl.matted(g, 9, s) if mat else g


def waffles(x, y, s=1.0, flip=False, mat=True, **kw):
    f = cl.GM if flip else cl.G
    g = f(x, y, dachshund(WAFFLES, **kw), s)
    return cl.matted(g, 8, s) if mat else g


def momo(x, y, s=1.05, flip=False, mat=True):
    f = cl.GM if flip else cl.G
    g = f(x, y, cl.cat_sitting(MOMO), s)
    return cl.matted(g, 7, s) if mat else g


def pip(x, y, s=0.62, flip=False, mat=True):
    f = cl.GM if flip else cl.G
    g = f(x, y, cl.bird_side(0, 0, w=120), s)
    return cl.matted(g, 6, s) if mat else g
