# VISUAL BIBLE
## The Little Minds Collection — house style for every book in the series

Everything here is expressed in the units the drawing library actually uses, so the rules
can be checked by arithmetic instead of argued about by eye. The page canvas is
**850 × 1100 px at 100 px/inch**, which is exactly the 8.5 × 11 inch trim. One millimetre
at print size is 3.94 px. Keep that conversion in mind — most of the rules below are
really print-legibility rules wearing pixel clothes.

---

## 1. Line system

This is the part a parent notices without being able to name it. A page where every line
is the same weight reads flat and confusing; a child cannot tell what is an edge and what
is a detail.

| Role | Stroke (px) | At print | Used for |
|---|---|---|---|
| Outer silhouette | 5.5 | 1.4 mm / 4.0 pt | the outline a child colors up to |
| Interior structure | 4.0 | 1.0 mm / 2.9 pt | limbs, windows, major divisions |
| Detail | 3.0 | 0.8 mm / 2.2 pt | freckles, stripes, seams, spokes |
| Absolute minimum | 2.0 | 0.5 mm / 1.4 pt | never thinner, at any zoom |

The **weight contrast is the message**: outer heavy, interior medium, detail light. That
ratio is what tells a four-year-old "this is the boundary, that is a decoration."

**Pure black, one value.** No gray fill, no gradient, no cross-hatching, no stipple
shading. Where the library offers `hatch_region` for texture, this book does not use it —
the brief bans it and it is the fastest way to make a page look unfinished-but-busy.

---

## 2. Colorable-area floor

The reason most cheap coloring books frustrate children is that they are full of areas
smaller than a crayon tip.

- **No enclosed region smaller than 3 mm = 12 px** in either direction.
- **No two near-parallel lines closer than 4 mm = 16 px** — the gap between them becomes
  an uncolorable sliver.
- Verify with `charlib.qa_page(svg)`, which labels enclosed regions and counts slivers.
  This is a gate, not a suggestion.

Practical consequence: Momo gets five fat stripes, not fifteen thin ones. Waffles gets one
saddle patch, not spots. Roof shingles, brick courses and fabric patterns are drawn as a
few large units or not at all.

---

## 3. Page anatomy

```
y    0 ┌──────────────────────────────┐
      │   [ trim edge ]               │
   50 │  ┌────────────────────────┐   │  ← decorative border, 0.5in inset
      │  │                        │   │
  102 │  │      PAGE TITLE        │   │  ← title baseline, 42px caps
      │  │                        │   │
  150 │  │                        │   │  ┐
      │  │       ART BAND         │   │  │ scene lives here
      │  │                        │   │  │
  950 │  │                        │   │  ┘
      │  │                        │   │
 1038 │  │   (caption, if used)   │   │
      │  └────────────────────────┘   │
 1100 └──────────────────────────────┘
```

- **Title** at y≈102, one short line, always present. It is what a parent reads aloud.
- **Art band** y 150–950. Every stroke stays ≥12 px inside the border rect.
- **Captions**: this book uses **titles only, no sentence captions**. A caption band would
  eat 100 px of art on a page whose whole job is a big simple picture. (Flagged as
  Decision 3 — reversible if you want narration.)

### Vertical span — the rule every model breaks

The connected scene mass must run from **y ≤ 450 down to y ≥ 900** — at least 55% of the
page height. Not measured from a sun in the corner and a cloud near the title: isolated sky
tokens are explicitly excluded. If the connected mass of figures, structures and trees does
not reach y≈450, the fix is to **add a midground anchor** (a tree, a building, a hill), not
to sprinkle more sky decoration.

This is the single most common way a page ends up looking like the artist gave up: figures
huddled along the bottom edge with a vast empty sky above them.

---

## 4. Three-layer composition recipe

Every scene page is built in this order:

1. **Background** — a scene kit (`scene_meadow`, `scene_street`, `scene_beach`,
   `scene_space`, `scene_farm`) or a hand-built room. Ground line at y≈940 for land,
   900 for beach, 930 for the lunar surface.
2. **Midground** — anchors at y 750–930, drawn smaller to read as distant.
3. **Foreground** — characters at scale 1.25–1.40, standing on the declared ground line.
   Main figures run **240–300 px tall**, which is 22–27% of page height each; scale 1.0
   reads as a distant figure and leaves the page feeling empty.

Rotate the kit `variant` between pages so two meadow pages don't repeat the same layout,
but keep one variant family per setting across the book so it still reads as one world.

---

## 5. Composition rules for this book specifically

- **One focal subject per page.** The page must look finished if a child colors only the
  subject and ignores everything else.
- **3–7 secondary elements**, per the brief. Counted as: anything with its own closed
  outline that a child could color separately.
- **≥30% of the art band stays white.** Negative space is what makes a page feel calm
  enough to start.
- **Nothing important within 0.75 in (75 px) of the gutter edge.** Bound pages curve, and
  a face that disappears into the spine is a returned book.
- **Face clearance is numeric**: no prop or held object with its center within 1.3 × face
  radius of any face center. At face_r 38 that is a 49 px exclusion circle. Heads are drawn
  last with a white fill, so anything inside that circle is silently erased at render time.
- **Hands hold things at |x| ≥ 1.5 × r from the head center**, and every hand circle must
  overlap the arm line it belongs to. A 2 px gap reads as a floating bubble.
- **Eye-line direction**: on every page at least one character looks at the focal subject.
  Pip usually does this job.

---

## 6. Faces — the anti-eerie checklist

Cute goes wrong in this genre faster than anything else, and it goes wrong the same five
ways every time.

- Both eyes exactly the same size, both solid dots, both on the same horizontal.
- Face radius ≥ 34 px (we use 38). Below that, trait features crowd into mush.
- **No stroke ever crosses the face interior** except glasses. An accessory edge that
  passes over the face gets read *as* a facial feature — a hat brim becomes a frown, a
  scarf edge becomes a grin.
- Mouth is a small arc, roughly 0.3 × face radius wide. Never a wide open oval.
- No eyelashes, no blush circles, no nostrils. Those are the Sanrio tells, and the brief
  explicitly asks us away from that neighbourhood.
- Eyebrows optional and thick when used — Leo's asymmetric pair is the only regular use.

---

## 7. What this book is not allowed to look like

The brief's ban list, restated as things the renderer must never emit:

no gray fill · no gradients · no cross-hatching · no stipple · no fine pattern fills ·
no realistic anatomy or musculature · no background clutter competing with the subject ·
no tiny enclosed spaces · no art within 12 px of the border · no character silhouette
resembling an existing licensed property.

On that last one: the cast is built from generic geometric primitives — circles, arcs,
rounded rectangles — driven by a trait vector. There is no reference image anywhere in the
pipeline, which is precisely why this approach is safe for commercial publication.

---

## 8. Difficulty tiers and pacing

Difficulty is defined by countable things, not vibes.

| Tier | Elements | Subject size | Smallest region | Typical page |
|---|---|---|---|---|
| **Easy** (4–5 yr) | 6–9 | 45–60% of art band | ≥ 20 px | one big object, open ground |
| **Medium** (5–6 yr) | 10–13 | 35–45% | ≥ 16 px | figure + setting + props |
| **Challenging** (6–7 yr) | 14–18 | 30–40% | ≥ 12 px | full scene, several characters |

**Pacing rule: never three consecutive pages in the same tier**, and never three
consecutive Challenging pages at all. A child who hits four dense pages in a row closes the
book. The storyboard's difficulty column is sequenced deliberately — the distribution is
17 Easy, 16 Medium, 7 Challenging, and the Challenging pages are spread as section
closers.

---

## 9. The Wonder Star

One small five-point star is hidden on every one of the 40 pages — in a cloud, a leaf
pattern, a rug, a puddle reflection. Never in the same place twice, never larger than
30 px, never overlapping a face.

It costs almost nothing to implement (the `star` motif at small scale) and it changes what
the book is: not 40 pages to color once, but a page a child returns to. It is also the
single most useful line on the back cover.

Page 1 teaches the game with a star that is easy to spot. Page 40 hides it hardest.

---

## 10. Print specification (KDP paperback, US)

| Setting | Value |
|---|---|
| Trim | 8.5 × 11 in |
| Bleed | **None** — art stops inside the border, no edge-to-edge printing |
| Outside/top/bottom margin | 0.5 in (50 px) — professional standard, not the 0.375 minimum |
| Gutter margin | 0.625 in (62 px), nothing identity-critical inside 0.75 in |
| Interior | Grayscale, flattened single PDF, vector line art |
| Effective resolution | Vector — no rasterization at any stage |
| Paper | White (recommended over cream for line art) |

**Interior page count.** Forty art pages printed single-sided with a blank verso behind
each is 80 leaves' worth of interior, plus front matter. KDP prints both sides of every
sheet, so the blanks must be built into the PDF deliberately — they are what stops marker
bleed-through from ruining the next picture. Target **84 or 88 interior pages** including
title page, "this book belongs to" page, and a closing page, which also keeps the count a
multiple of 4.

That decision changes the spine width, and therefore the cover wrap, so it needs settling
before cover work begins.

---

## 11. File and build conventions

```
books/world-through-my-eyes/
  make_book.py            # BUILDERS list, one function per page
  lib_ext.py              # dachshund(), paper_plane() — the two new helpers
  pages/                  # NN-section-slug.svg  +  matching .png
  qa/                     # render_tiles output for review
  World-Through-My-Eyes-Interior.pdf
```

Page files are numbered `01`–`40` with a section slug, so partial rebuilds work:
`python make_book.py 17` rebuilds only page 17. Every page is deterministic — no random
seeds anywhere, so a rebuild two months from now is byte-identical.

**Gate before any page is considered done:**
1. `python -m lib.validate pages/*.svg` — exits nonzero on any HIGH finding.
2. `charlib.qa_page()` — region floor and sliver count.
3. Visual read of every page PNG.
4. Tile QA on the pages that had findings.
