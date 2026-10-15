---
name: design-brief
description: >-
  Two halves of the campaign design brief. (A) Direction: picks a 2-4 color palette, fonts,
  and aesthetic notes for a campaign from your brand reference. (B) Cards: turns the finished
  lockup slides in a campaign deck into one design-brief card per lockup on your project
  board, with reference images attached, drafted for review before anything reaches the
  design team. Trigger: design brief, lockup brief, design direction, color palette for this
  campaign, font suggestions, turn the lockup slides into brief cards, make the lockup cards.
---

# Design Brief

Part A writes design direction into the campaign deck. Part B takes the finished lockup slides out
of the deck and turns them into brief cards your designers work from. Run A while planning, B once
the deck is signed off.

## Setup

```yaml
brand_reference: "[FILL IN]"        # the brand-guardrails reference (palettes, fonts, per-mood starting points)
deck_tool: "[FILL IN]"              # Google Slides, PowerPoint, Figma...
lockup_slide_title: "[FILL IN]"     # e.g. "Campaign Graphic"; the text that marks a lockup slide
project_board: "[FILL IN]"          # Basecamp, Asana, Monday, Trello, Jira...
draft_location: "[FILL IN]"         # your own board/column where drafts land first
design_queue: "[FILL IN]"           # the design team's column where approved briefs go
design_owner_role: "[FILL IN]"      # e.g. "design manager" (assignee on promotion)
asset_owner_role: "[FILL IN]"       # e.g. "content lead" (tagged for imagery)
asset_lead_days: [FILL IN]          # card due date = campaign start minus this, e.g. 14
design_lead_days: [FILL IN]         # design done by campaign start minus this, e.g. 5
no_weekend_dates: true              # a Sat/Sun date rolls back to Friday
card_title_format: "[FILL IN]"      # e.g. "{Campaign} | {Header} | {dates}"
calendar_link_back: "[FILL IN]"     # your sales/promo calendar field for the brief link, or "none"
```

## Inputs

- Part A: campaign name, mood, priority, and whether it is the core-brand campaign
- Part B: the deck link (ask if not given) and scope (all lockup slides, or named ones)

## Workflow

### Part A: design direction (into the deck)

1. **Palette.** Start from the mood's frozen row in the brand reference. If filled, use it. If blank,
   pick 2-4 hex values from the brand palettes, get sign-off, and write them into the table so the
   next campaign is a lookup.
2. **Fonts.** Core-brand campaign: brand fonts only. Other campaigns: a display font suited to the
   mood (only from the allowed list), with body and caption from the brand guide.
3. **Aesthetic.** 2-4 sentences for the designer: type treatment, color use, texture, what to avoid.
   Tie it to the mood's keywords.

### Part B: lockup slides to brief cards

1. **Pull the deck fresh.** Extract every lockup slide's text boxes and images with their positions.
   Image links from slide APIs often expire, so map and post in the same session as the pull.
2. **Build the card title** from the campaign header slide just before the lockup (dates, priority) and
   the lockup's own header line. Placeholders like `XX%` pass through as written. No priority found:
   drop that segment and flag it.
3. **Build the body in this order,** bold labels, omitting any empty section (no "TBD"):
   1. URL(s) for the collection
   2. Font inspo (the slide's typography field, often images only)
   3. Suggested colors
   4. Main aesthetic
   5. Other elements
   6. Images: a line tagging the asset owner
   7. Copy: eyebrow/sticker, header, CTA, verbatim. A promo code goes on the sticker line next to the
      sale name, never as its own line.
   8. Sale messaging (sale lines only)
   9. Brand messaging (brand lines only)
   10. A link back to the exact source slide
4. **Match images to sections by position:** an image belongs to the nearest field label above it in
   the same column. Drop decorative images (logos in a corner, anything outside the content
   columns). When unsure, include it and flag it.
5. **Color swatches go on the card as images,** never as "see the slide". If swatches are drawn as
   shapes, render the slide and crop them to an image.
6. **Multi-drop campaigns:** one card equals one design request. One title covering all drops, a
   shared block up top (URL, "design the system once, swap colors and copy per drop", font options,
   shared elements), then one section per drop with its colors, aesthetic, copy, and messaging.
7. **Post every card as a draft** to `draft_location`, with the asset-owner tag as plain text so no
   one gets notified by a draft. Report every card link plus a flags list.
8. **Promote only on the owner's say-so,** per card or "promote all": copy to `design_queue`, assign
   the design owner, turn the plain-text tag into a real mention, and set dates:
   - card due = campaign start minus `asset_lead_days`
   - a timeline line: design done by campaign start minus `design_lead_days`
   - weekend dates roll back to the Friday before
   - a date already in the past means the lockup is behind: flag it
9. **Link back to the calendar** (optional). Propose the full lockup-to-calendar-row mapping first and
   write only after approval. Match on dates first, priority second, name only as a confirm (names drift
   between deck and calendar).
10. **Give the design team a heads-up** when a batch lands, and check the cards are still in place the
    next day. Unannounced cards get swept aside.

## Rules

- Colors and fonts come from the brand reference only.
- Brand messaging and sale messaging are separate sections. Never merge them, never repeat a line.
- The storyline is not part of the brief; the slide link covers it.
- Never overwrite a calendar link that is already set. Flag it instead.
- Duplicate lockup slides for one campaign: ask, do not post twice.
- A real gap to flag: main aesthetic or colors empty, no reference images anywhere, a placeholder left
  in the copy, or a duplicated slide still carrying another campaign's images. An images-only
  typography field is normal, not a gap.
- New lines approved or words vetoed during brief review go back into the brand reference the same day.
- Keep all intermediate files UTF-8; slide text carries smart quotes.

## Output format

Part A:
```
color_palette: ["#1B2A41", "#E07A5F", "#F4F1EA"]
font_suggestions: display Fraunces Bold; body Inter Regular; caption Inter Medium
aesthetic_direction: Sun-faded photography with a warm film grain. Big serif headline set tight,
  small caps eyebrow. Terracotta only on the CTA. No icons.
```

Part B card:
```
Coastline Weekend | 25% Off Linen | 6/12-6/15
Due 5/29 (assets) | design done by 6/5
URL: northwind.example/collections/linen
Font inspo: [2 images]
Suggested colors: [swatch image]
Main aesthetic: Sun-faded, warm, relaxed. Linen texture close-ups.
Other elements: [1 image]
Images: @content lead
Copy:
  Sticker: Linen Weekend | code: TIDE25
  Header: 25% Off Linen
  CTA: Shop Linen
Sale messaging: 25% off the linen edit / Four days. Every linen piece.
Brand messaging: Made for the long way home / Slow mornings, salt air
Source slide: [link]
```

Example brand: Northwind Apparel.
