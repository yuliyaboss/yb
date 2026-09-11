# Art pipeline

Generates the book's line art and gates it for print. The bibles one directory
up are the design authority; this directory is the machinery that executes them.

```
prompt_kit.py   the Character and Visual Bibles restated as model directives.
                THE single source of truth for prompts — nothing else in the
                pipeline is allowed to describe a character or the house style.
gen.py          image client (Gemini image models via the session's agent
                proxy, which injects the key — never put a key in this repo).
                Writes a .json sidecar beside every PNG recording the model,
                prompt and reference images, so any page can be traced and
                regenerated.
qa.py           printability gate: catches sneaked-in grey shading, solid black
                fills, and draft-resolution files.
sheets/         cast model sheets — the reference every page is generated from.
pages/          the 40 art pages.
qa/             contact sheets for review.
```

## Order of work

1. **Cast model sheet** — locks the five characters. Everything downstream
   passes it back in as a reference image, which is what keeps Mia on page 3
   and Mia on page 37 the same child.
2. Pages 1–40, section by section, against the storyboard.
3. `../interior/assemble.py` lays the finished art into the 84-page KDP block.

## Running it

```bash
python3 gen.py sheet                  # full-canon prompt, Nano Banana Pro
python3 gen.py sheet --model flash    # cheaper draft pass
python3 gen.py sheet --n 3            # three candidates to pick from
python3 qa.py sheets/*.png
```

## Current blocker — image generation is unfunded

The Gemini key reaches the API and text models answer, but **every image model
returns HTTP 429 with `limit: 0`**: image generation is not offered on the free
tier at all, so this is not a rate limit that clears by waiting.

```
Quota exceeded for metric: generate_content_free_tier_requests, limit: 0,
model: gemini-3.1-flash-image   (quotaId GenerateRequestsPerDayPerProjectPerModel-FreeTier)
```

Fixing it is a billing action on the Google side — enable billing on the
project behind the key at https://aistudio.google.com/apikey. Nothing in this
repo needs to change: the proxy already injects the key, and `gen.py` works the
moment quota exists.

The other two connected generators are also empty: Everygen has 0 credits, and
Higgsfield has 0.76, against 10 for one Recraft vector image.

## Print targets

300 dpi at 8.5 × 11 in trim is **2550 × 3300 px**. `--size 4K` on Nano Banana
Pro clears that; 2K (1536 × 2048) does not and is for drafts only. Art is
placed inside the margins by the assembler, so it does not need to be trim-sized
itself — but it must not be smaller than the box it lands in.
