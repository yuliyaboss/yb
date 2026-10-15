---
name: campaign-copy
description: >-
  Writes the copy set for one campaign: a mood-only storyline, brand messaging and sale
  messaging picked verbatim from your approved banks, a copy block (eyebrow, header, CTA,
  code, CTA color options) and content ideas. Use for brainstorm decks and campaign lockups.
  Trigger: campaign copy, storyline, brand messaging, sale messaging, lockup copy, content
  ideas for this campaign.
---

# Campaign Copy

Builds the full copy set for a campaign from your brand banks. The storyline is the only freely
written piece. Everything else is selected from approved lines, so the voice stays consistent
month to month.

## Setup

```yaml
brand_reference: "[FILL IN]"         # the brand-guardrails reference file
brand_message_count: [FILL IN]       # e.g. 8-10
sale_message_count: [FILL IN]        # e.g. 3-5
sale_line_words: [FILL IN]           # e.g. 4-8 words each
content_idea_count: [FILL IN]        # e.g. 4-5
creative_name_min_days: [FILL IN]    # sales this long or longer get a creative name
core_brand_campaign: "[FILL IN]"     # how to tell which campaign is the brand-fonts-only one, or "none"
```

## Inputs

- Campaign: name, date range, offer, collection or product focus
- Mood (required; one of the moods in the brand reference)
- Sale type (percent off, BOGO, clearance, free shipping, launch with no sale)

## Workflow

1. **Confirm the mood.** If it is missing, stop and ask. Do not infer it from the product.
2. **Storyline.** One short paragraph, mood and energy only. No sale, no discount, no offer. Use the
   mood's keywords and the brand voice.
3. **Brand messaging.** Select `brand_message_count` lines verbatim from the mood's bank.
4. **Sale messaging.** Select `sale_message_count` lines verbatim from the matching sale-type bank.
   Fill placeholders with the real numbers. Keep each line inside `sale_line_words`.
5. **Sale name.** If the sale runs `creative_name_min_days` or longer, suggest 3 creative names.
   Shorter sales use the offer as the headline.
6. **Copy block.** Eyebrow/sticker, header, CTA, code. Take the CTA from the CTA bank where one fits.
   Suggest 2-4 CTA button colors, hex values from the brand palette only.
7. **Content ideas.** `content_idea_count` bullets, each "format: idea" (e.g. "Carousel: five ways
   to wear the linen set").
8. **Core-brand campaign.** If this is the designated core-brand campaign, note brand fonts only.

## Rules

- Bank lines are used verbatim. The only allowed change is slotting in a name, date, or number.
- Never paraphrase a bank line into a new one, and never write messaging from scratch. If no bank
  section fits, flag it and ask whether to add lines first.
- Check the brand reference's avoid list before selecting. Skip any line with a vetoed word, and
  flag the line so the bank gets cleaned.
- Brand messaging and sale messaging stay separate. No line appears in both.
- When the owner approves a new line in review, it goes into the bank the same day.
- Never invent offer numbers. Unknown values stay as `[XX]` and get flagged.

## Output format

```
Campaign: Coastline Weekend | 6/12-6/15 | 25% off linen
Mood: Coastline
Storyline: Salt in your hair, sun on your shoulders, nowhere to be until dinner. Linen that
  moves the way a slow weekend does.
Brand messaging (8): [verbatim bank lines]
Sale messaging (4):
  - 25% off the linen edit
  - Four days. Every linen piece.
  - ...
Sale name options: Linen Weekend | Slow Tide | Salt + Linen
Copy block:
  Eyebrow: Linen Weekend | code: TIDE25
  Header: 25% Off Linen
  CTA: Shop Linen
  CTA colors: #1B2A41, #E07A5F, #F4F1EA
Content ideas:
  - Carousel: one linen shirt, five weekend looks
  - Reel: packing a carry-on in 30 seconds
Flags: none
```

Example brand: Northwind Apparel.
