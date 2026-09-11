"""Prompt canon for THE WORLD THROUGH MY EYES.

Single source of truth for every image request in the book. The strings here
are the Visual Bible and Character Bible restated in the words an image model
actually obeys; nothing else in the pipeline is allowed to describe a
character or the house style, so a page generated in month six matches a page
generated in week one.

Edit here, nowhere else.
"""

# --------------------------------------------------------------- house style
# Visual Bible sections 1, 2, 6, 7 compressed into directives. The bans are
# listed as bans on purpose: naming the failure mode suppresses it far more
# reliably than only describing the target.
STYLE = """BLACK AND WHITE COLORING BOOK LINE ART for children aged 4 to 7.

LINE SYSTEM (this is the most important instruction):
- Pure black ink lines on a pure white background. Nothing else.
- Three deliberate line weights: very thick bold outer silhouette contours,
  medium-weight interior structure lines, thin light detail lines.
- Every shape is fully closed so a child can color inside it.
- Clean, smooth, confident vector-style ink. No sketchy or broken strokes.

ABSOLUTELY FORBIDDEN — do not produce any of these:
- No grey, no gray fill, no shading, no shadows, no gradients.
- No cross-hatching, no stippling, no dots for texture, no hatch lines.
- No solid black filled areas anywhere (except tiny eye dots and a nose dot).
- No color of any kind. No sepia, no off-white, no paper texture.
- No fine patterns, no tiny detail, no busy background clutter.
- No realistic anatomy, no muscles, no realistic fur or hair strands.
- No outer frame, no border, no drop shadow under the figures.

COLORABLE AREAS:
- Large, open, generous shapes. Every enclosed area must be big enough for a
  crayon: nothing smaller than a fingertip.
- Never place two lines close together in parallel — the thin sliver between
  them cannot be colored.
- Keep a lot of clean white space. Simple beats detailed, every time.

FACES (children and animals alike):
- Both eyes exactly the same size, simple solid black dots, level with each other.
- Mouth is one small simple curved line.
- No eyelashes, no blush circles, no nostrils, no teeth, no tongue detail.
- No line ever crosses the face interior except a pair of glasses.
- Friendly, calm, gentle expressions. Cute but never saccharine.

STYLE FAMILY: simple rounded geometric cartoon shapes, generic and original,
in the tradition of classic children's coloring books. Must not resemble any
existing cartoon, mascot or licensed character."""

# ------------------------------------------------------------------ the cast
# Straight from the Character Bible. The distinguishing channels (silhouette,
# head accessory, coat mark, motif, relative size) are spelled out for each
# figure because at this line weight silhouette IS identity.
CAST = {
    "mia": """MIA — a 6 year old girl, the tallest of the group.
- Hair: a round bob with blunt straight bangs across the forehead. One clean
  closed rounded helmet shape. No strands, no texture lines.
- No glasses.
- Three small freckle dots on each cheek, at slightly uneven heights.
- Outfit: a simple pinafore dress worn over a short-sleeved tee, ankle socks
  and sneakers. The pinafore is drawn with one outline, one hem line and one
  square front pocket. A single small five-pointed star sits on that pocket.
- Nothing else on the outfit: no bows, no frills, no trim, no buttons.
- Expression: wide round eyes, small closed smile, chin slightly lifted.""",

    "leo": """LEO — a 5 year old boy, slightly shorter than Mia.
- Hair: tousled, four or five uneven spikes, deliberately not symmetrical —
  maximum contrast against Mia's smooth round bob.
- Round glasses: two simple circles joined by a bridge, sitting over the eyes.
  The glasses are the only line allowed to cross his face.
- No freckles.
- Outfit: a tee with a small paper dart badge on the chest, shorts with one
  big patch pocket, and high-top sneakers.
- Expression: a cheerful grin and raised eyebrows, with one eyebrow lifted
  higher than the other.""",

    "waffles": """WAFFLES — a dachshund dog, shown in full side view facing right.
- The joke of the character is his proportion: an absurdly LONG low body on
  very SHORT stubby legs. Body length is about five times body height. This
  proportion is the character — exaggerate it confidently.
- Very long floppy ears hanging down past his jaw.
- One large saddle patch across his back: a single big smooth-edged shape that
  starts behind the shoulders and ends before the hips, clearly separated from
  the body outline so it can be colored a different color. Not spots. Not fur
  texture.
- A collar high on the neck with one round tag hanging clear of the chest,
  with a simple bone shape on the tag.
- Expression: calm, patient, faintly unimpressed.""",

    "momo": """MOMO — a kitten, smaller than the dog, with a proportionally large head.
- Coat marking: exactly five CHUNKY stripes — three wide bands around the tail
  and two wide bands across the back. Each stripe is broad enough to color.
  Never thin tabby striping.
- No collar at all (deliberately bare, to contrast with the dog's collar).
- Tail held upright with a curl at the tip — her recognition mark.
- Expression: curious, alert, wide eyes.""",

    "pip": """PIP — a small sparrow, shown perched in side view.
- Simple egg-shaped body, round head, short triangular beak, tail cocked up.
- Three small speckle dots on the chest at deliberately uneven heights.
- Exactly one wing line on the body. Never two parallel wing lines.
- Always perched, never standing on the ground like a pigeon.
- The smallest character in the book.""",
}

# Height order is canon: Mia > Leo > Waffles > Momo > Pip.
SIZE_RULE = """RELATIVE SIZES (must be obvious at a glance, this is canon):
Mia is the tallest. Leo is slightly shorter than Mia. Waffles the dachshund is
low to the ground but very long. Momo the kitten is clearly smaller than the
dog. Pip the sparrow is the tiniest of all."""


def cast_sheet_prompt():
    """The reference sheet every later page is generated against."""
    return f"""{STYLE}

TASK: Draw a CHARACTER MODEL SHEET — a single portrait page presenting the
five cast members of a children's coloring book, standing apart from each
other against plain white, with clear space between every figure so no two
outlines touch or overlap.

LAYOUT, top to bottom:
- TOP ROW: Mia on the left and Leo on the right, both standing full-body,
  front view, feet on the same invisible level line, arms relaxed and clear of
  the body so their silhouettes read cleanly.
- MIDDLE ROW: Waffles the dachshund alone, full side view facing right,
  spanning the width of the row so his length reads as the joke it is.
- BOTTOM ROW: Momo the kitten on the left, sitting, front view with her curled
  tail visible. Pip the sparrow on the right, perched in side view on a short
  simple branch.

Print the name of each character in plain bold capital letters directly
beneath that character: MIA, LEO, WAFFLES, MOMO, PIP. Simple clean lettering
as hollow outlined letters that a child could color in. No other text
anywhere on the page.

{SIZE_RULE}

THE FIVE CHARACTERS:

{CAST['mia']}

{CAST['leo']}

{CAST['waffles']}

{CAST['momo']}

{CAST['pip']}

The whole page must read as one consistent hand: same ink weight system, same
degree of simplification, same friendly geometry for all five."""


# Weaker/cheaper models drop instructions past a few hundred tokens: they take
# the first rules and ignore the rest. This trims the canon to the directives
# that survive that truncation, in priority order. Drafts only — final art
# always uses the full prompt above.
COMPACT_STYLE = (
    "Black and white children's coloring book line art. Pure black outlines on "
    "pure white. NO grey, NO shading, NO gradients, NO cross-hatching, NO "
    "stippling, NO solid black fills, NO color, NO background. Bold thick "
    "outlines, simple rounded cartoon shapes, large open areas to color, lots "
    "of white space. Simple dot eyes, small curved smile, no eyelashes, no "
    "blush.")


def cast_sheet_prompt_compact():
    return f"""{COMPACT_STYLE}

A character model sheet page showing five characters spaced far apart on white,
no overlapping:
TOP: MIA, a 6 year old girl, round bob haircut with blunt bangs, freckles,
pinafore dress with a star on the pocket, sneakers, standing front view.
Beside her LEO, a 5 year old boy, spiky tousled hair, round glasses, tee shirt
with a paper plane badge, shorts, high-top sneakers, standing front view.
MIDDLE: WAFFLES, a dachshund in side view facing right, extremely long low body
on very short legs, long floppy ears, one big saddle patch on his back, collar
with a bone tag.
BOTTOM: MOMO, a kitten sitting front view, five thick chunky stripes, upright
curled tail, no collar. Beside her PIP, a tiny sparrow perched in side view on
a short branch, three chest dots, one wing line.
Print the names MIA, LEO, WAFFLES, MOMO, PIP in bold hollow outlined capital
letters under each character. No other text."""
