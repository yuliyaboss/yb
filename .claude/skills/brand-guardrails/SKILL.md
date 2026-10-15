---
name: brand-guardrails
description: >-
  A fill-in brand guide that every creative and copy skill reads before it writes: colors,
  typography, voice, campaign moods (keywords + approved lines), sale naming, copy hierarchy,
  words to use and words to avoid. Stops generated work from inventing colors, fonts, or
  messaging. Trigger: brand guide, brand colors, brand fonts, brand voice, mood bank, what
  colors can I use, is this on brand, add this line to the bank, veto this word.
---

# Brand Guardrails

One reference file that holds your brand's rules, plus the process for keeping it current. Other
skills (campaign-copy, design-brief, moodboard-queries, product-descriptions)
read it and never go outside it.

## Setup

Copy the block below into `brand-reference.md` and fill it in. Put it next to this skill, or
anywhere you point the skills to (this repo keeps it in `brand/`). Leave nothing as `[FILL IN]` that a skill will need; a blank cell means "ask the owner", not "guess".

```markdown
# [Brand name] Brand Reference

## 1. Palettes (the only colors any skill may suggest)
- Core: [FILL IN hex list]
- Accent palette A (e.g. bright): [FILL IN hex list]
- Accent palette B (e.g. soft): [FILL IN hex list]
- Neutral / deep: [FILL IN hex list]

## 2. Campaign priority colors (optional, for internal decks)
| Priority | Color | Hex |
| [FILL IN] | | |

## 3. Typography
| Role | Font | Free alternative | Usage |
| Title / display | [FILL IN] | [FILL IN] | e.g. all caps |
| Header | [FILL IN] | | |
| Body | [FILL IN] | | |
| Caption | [FILL IN] | | |
Campaign display fonts allowed? [FILL IN yes/no, and which]
Core-brand campaign (if you run one per month): brand fonts only? [FILL IN]

## 4. Brand pillars
- [FILL IN 2-4 pillars, one line each]

## 5. Voice
- Sounds like: [FILL IN 4-6 adjectives]
- Case / punctuation habits: [FILL IN]
- Slang you actually use: [FILL IN]

## 6. Campaign moods
One section per mood you run campaigns in.
### [Mood name]
- When to use: [FILL IN]
- Keywords: [FILL IN 10-20]
- Approved brand lines: [FILL IN, verbatim, one per line]

## 7. Sale messaging bank
### [Sale type, e.g. percent off, BOGO, clearance, free shipping]
- [FILL IN approved lines, with placeholders like [XX]% off]

## 8. Sale naming rule
- Sales of [FILL IN] days or more get a creative name (suggest 3 options)
- Shorter sales use the offer as the headline

## 9. Copy hierarchy (campaign lockup)
- Storyline: one paragraph, mood only, no offer
- Brand messaging: [FILL IN count] lines from the mood bank
- Sale messaging: [FILL IN count] lines from the sale bank
- Copy block: eyebrow/sticker, header, CTA, code

## 10. Words we use / words we avoid (living section)
- Use: [FILL IN]
- Avoid (with date and reason): [FILL IN]

## 11. Per-mood design starting points (frozen once approved)
| Mood | Palette | Display font | Body / caption |
| [FILL IN] | (fill once, then freeze) | | |
```

## Inputs

- The filled `brand-reference.md`
- Whatever the calling skill is producing (copy, palette, font pick, query list)

## Workflow

1. **Load the reference** before producing any brand-facing output. If it is missing, stop and say
   so. Do not generate brand content from memory.
2. **Match the mood.** Every campaign has one mood. If the mood is not set, ask. Never infer it.
3. **Pull, do not invent.** Colors come from section 1 only. Fonts from section 3 only. Brand and
   sale lines come from sections 6 and 7 verbatim; the only allowed edit is filling a placeholder
   (name, date, percentage).
4. **Check the avoid list** (section 10) before using any line, even one that is still in a bank. If
   a banked line contains a vetoed word, skip it and flag it so the bank gets cleaned.
5. **Use frozen starting points** (section 11) when a row is filled. When a row is blank, propose a
   pick from the palettes, get the owner's sign-off, then write it into the table so next time is a
   lookup.
6. **Feed the bank.** When the owner approves a new line or someone vetoes a word during a review,
   add it to the reference the same day, with the date and reason. Approved copy that lives only in
   one campaign card is lost.

## Rules

- One source of truth. If you keep a longer master brand doc, generate the banks from it with a
  script or by hand in one direction only; never edit the generated copy directly.
- No color, font, or line outside the reference. "Close enough" is outside.
- A blank in the reference is a question for the owner, never a guess.
- Vetoes need a reason, so the next person does not reintroduce the word.
- If you run a core-brand campaign, it uses brand fonts and brand symbols only.

## Output format

When another skill asks "is this on brand", answer like this:

```
Palette: #1B2A41 #F4F1EA #E07A5F   all in section 1   OK
Display font: Canela                not in section 3   FAIL (allowed: Fraunces, Inter)
Line "made for the long way home"   mood bank: Coastline   OK
Line "wardrobe staples forever"     "staples" vetoed 2026-01-10 (reads dated)    FAIL
```

Example brand: Northwind Apparel.
