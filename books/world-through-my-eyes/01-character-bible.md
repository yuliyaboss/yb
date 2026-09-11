# CHARACTER BIBLE
## The Little Minds Collection — Book 1: *The World Through My Eyes*

These trait vectors are **canon**. Copy them verbatim into every future book in the
collection. The skill's whole consistency guarantee rests on the cast being parametric:
the same trait dict always renders the same character, so there is no identity drift
between page 3 and page 37, or between Book 1 and Book 6.

**The one rule that breaks everything if ignored:** never override an outfit, hair style
or motif on a single page "just for this scene." A child recognises a character by
silhouette, not by face. Change the silhouette and it is a different child.

---

## Why these five read as five different characters

At coloring-book line weight there is no room for facial nuance — every face is two eyes,
a nose tick and a smile. Distinguishability comes from five channels, and each cast
member is separated on at least three of them:

| Channel | Mia | Leo | Waffles | Momo | Pip |
|---|---|---|---|---|---|
| Silhouette | round bob | spiky tousled | very long, very low | compact, tall tail | tiny, egg-shaped |
| Head accessory | — | glasses | long floppy ears | upright ears | — |
| Skin/coat mark | freckles | — | saddle patch | chunky stripes | chest speckle |
| Motif | star | paper plane | bone tag | — | music note |
| Relative size | 1.00 | 0.96 | 0.55 h | 0.38 h | 0.14 h |

Mia and Leo differ on all five. That is deliberate — they share most pages, and two kids
who read as "the same kid twice" is the single most common failure in this genre.

---

## MIA — the one who sees it first

```python
MIA = {
    "name": "Mia",
    "age": 6,
    "hair": "bob_bangs",        # charlib.HAIR_STYLES — round helmet silhouette
    "glasses": False,
    "freckles": True,
    "motif": "star",
    "outfit": "pinafore",       # pinafore dress over a short-sleeve tee, ankle socks, sneakers
    "scale": 1.00,              # ~196px tall at s=1.0; rendered 1.25-1.40 on scene pages
    "face_r": 38,
}
```

**Role in the book.** Mia is the lens. She is the one who looks at the puddle and sees the
ocean, and on almost every page she is either *pointing at* the magical thing or *inside*
it. When a page needs someone to direct the reader's eye, it is Mia's arm that does it.

**Locked features.** Bob with blunt bangs — a clean closed curve, the most legible hair
silhouette in the library at small scale. Freckles (three per cheek, asymmetric heights;
two marks at matching heights read as a second pair of eyes). Pinafore: one outline, one
hem line, one pocket. Nothing more — the guide is unambiguous that stacking straps, bows
and trim on a small chest reads as clutter every time.

**Her star.** The star is her signature and it does double duty: it sits on her pinafore
pocket, and one loose star is hidden somewhere on all 40 pages (see the Visual Bible,
"The Wonder Star"). That turns a passive coloring book into something a child re-opens.

**Stock poses.** `kid_point` (her default — she indicates), `kid_stand(pose="wave")`,
`kid_reach`, `kid_sitting`, `kid_in_bed`. Avoid running poses for her; Leo owns motion.

**Expression register.** Wide open eyes, small closed smile, chin slightly up. Never
open-mouth shouting — at this line weight an open mouth becomes a black hole.

---

## LEO — the one who builds it

```python
LEO = {
    "name": "Leo",
    "age": 5,
    "hair": "tousled",          # irregular spikes — maximum contrast against Mia's bob
    "glasses": True,            # one of the only two sanctioned face-crossing shapes
    "freckles": False,
    "motif": "paper_plane",     # NEW tiny motif, 3 straight lines — see build notes
    "outfit": "tee_shorts",     # tee with paper-plane badge, shorts with one big pocket, high-tops
    "scale": 0.96,              # a touch shorter than Mia, consistently
    "face_r": 38,
}
```

**Role in the book.** Leo is the engineer of the imagination. Mia sees the rocket; Leo
tapes fins onto the box. He is the one holding, climbing, launching, crawling into and
steering things. His pages carry the book's physical comedy.

**Locked features.** Tousled hair — four or five uneven spikes, never symmetrical. Round
glasses, drawn as two circles plus a bridge, sitting over the eyes; glasses are allowed to
cross the face interior, and nothing else is. No freckles: with glasses plus spiky hair he
is already three channels clear of Mia, and a fourth mark would only crowd the face.

**Stock poses.** `kid_run`, `kid_jump`, `kid_carry`, `kid_stand(pose="down")`, `kid_reach`.
He is almost never standing still with both arms down.

**Expression register.** Grinning open-ish smile, eyebrows up. Leo is allowed one eyebrow
higher than the other — it is his whole comic personality in two strokes.

---

## WAFFLES — the dachshund, and the book's running joke

```python
WAFFLES = {
    "name": "Waffles",
    "species": "dog",
    "breed_variant": "dachshund",   # long body, short legs — NEW variant, see build notes
    "coat": "patch",                # one large saddle patch across the back
    "collar": True,                 # collar + round tag with a bone mark
    "ears": "long_floppy",
    "scale_len": 1.60,              # 1.6x the length of the stock dog silhouette
    "scale_h":   0.70,              # 0.7x the height
}
```

**Role in the book.** Waffles is a length gag with legs. Because he is absurdly long and
absurdly low, he can be *used* as scenery: a bridge across a "river," a log at the
campfire, a measuring stick, a draught-excluder under the blanket castle. He appears on 26
of 40 pages and is doing something slightly wrong on most of them.

**Locked features.** The saddle patch is his main colorable area and its edge is fixed —
it starts behind the shoulder and ends before the hips, so a child can color the body one
colour and the patch another. Collar sits high on the neck with the tag hanging clear of
the chest line. Tongue out on high-energy pages, in on calm pages.

**Build note (first production task).** The library ships `dog`, `dog_sit` and `dog_sleep`
but no dachshund. Waffles will be a parametric stretch of the existing dog geometry — body
elongated, leg length reduced, ears lengthened — added as `dachshund()` and frozen. This is
the collection's single most important asset: every future book depends on it rendering
identically.

---

## MOMO — the kitten who is never fully visible

```python
MOMO = {
    "name": "Momo",
    "species": "cat",
    "coat": "stripes",     # 3 chunky tail bands + 2 back bands — big enough to color
    "collar": False,       # deliberately bare: contrast against Waffles' collar
    "tail": "upright_curl",
    "scale": 0.80,         # kitten, not cat — smaller with a proportionally bigger head
}
```

**Role in the book.** Momo is the hide-and-seek thread. On page after page she is *partly*
behind something: peeking out of the box, under the blanket, around a doorframe, inside a
boot. Children find her before they find anything else on the page, and that small win is
what makes a 5-year-old turn to the next one.

**Locked features.** Stripes are chunky and few — three on the tail, two across the back,
each wide enough to color. Thin tabby striping would collapse into uncolorable slivers at
print size. Upright tail with a curl at the tip is her recognition mark from any angle.

**Occlusion is a feature, not a compromise.** The skill's own escalation ladder recommends
placing a figure behind an object when the full pose is hard. Momo's entire character
design is that recommendation turned into a personality.

---

## PIP — the sparrow who points

```python
PIP = {
    "name": "Pip",
    "species": "bird",
    "base": "bird_side",     # perched side-view: egg body, round head, up-cocked tail
    "chest": "speckle",      # 3 asymmetric chest dots
    "wing_bar": True,        # one wing line — never two at equal height
    "scale": 0.55,
}
```

**Role in the book.** Pip is the smallest cast member and the book's compositional tool.
Wherever Pip is looking, the reader looks. On busy pages he sits on the thing that matters;
on calm pages he is the only element in the upper third, holding the top of the composition
so the page does not bottom-crowd.

**Locked features.** Always perched or in mid-flap, never standing on the ground like a
pigeon. Three chest speckles at deliberately uneven heights. His motif is the music note —
he is the only character who makes sound in the book, which pays off on page 36.

---

## Cast rules that carry across the whole collection

1. **Outfits never change.** Not for weather, not for bedtime. Pyjama pages (25, 27) are
   the single sanctioned exception, and the pyjama pattern is itself locked: stars for
   Mia, stripes for Leo.
2. **Height order is always Mia > Leo > Waffles > Momo > Pip.** A child reading two books
   a year apart should be able to line them up.
3. **Mia leads with her right hand, Leo with his left.** A small thing that makes
   two-figure pages compose without the arms colliding.
4. **Waffles is always to the left of Momo** when both are on a page. Consistency in
   staging reads as intention.
5. **Pip is never on the ground.** Branch, shoulder, rail, roof, handle.
6. **Every page contains at least two cast members.** A page with a single object and no
   character does not belong in this book.

---

## Appearance count across the 40 pages

| Character | Pages | Notes |
|---|---|---|
| Mia | 35 | absent only from 4, 17, 18, 19, 22 |
| Leo | 24 | absent from the quieter Mia-led pages; he is the book's motion |
| Waffles | 25 | the physical-comedy engine |
| Momo | 23 | always partly hidden |
| Pip | 25 | eye-line pointer, usually upper third |
| All five together | 8 | pages 8, 14, 24, 29, 32, 37, 38, 40 — plus the cover |
