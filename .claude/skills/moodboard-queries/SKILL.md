---
name: moodboard-queries
description: >-
  Produces Pinterest (or any image search) queries for a campaign moodboard: a frozen set of
  base queries per campaign mood, plus 2-3 campaign-specific queries, plus an optional pointer
  to a curated mood board. Trigger: moodboard, moodboard queries, Pinterest searches,
  reference images, vibe board, inspo for this campaign.
---

# Moodboard Queries

Gives your designer or your deck builder a ready list of image searches for each campaign. Base
queries are fixed per mood so boards stay consistent; the model only adds the few queries that are
specific to this campaign.

## Setup

```yaml
brand_reference: "[FILL IN]"     # the brand-guardrails reference (mood keywords live there)
search_tool: "[FILL IN]"         # e.g. Pinterest, Are.na, Google Images
curated_boards: "[FILL IN]"      # one board per mood, or "none"
skip_list: [FILL IN]             # campaigns or product lines that never get a moodboard, or []

base_queries:                    # frozen: 5 per mood, never regenerated per run
  "[Mood A]": [FILL IN 5 queries]
  "[Mood B]": [FILL IN 5 queries]
```

## Inputs

- Campaign name, mood, collection or product focus, and any event, place, or season it ties to

## Workflow

1. **Confirm the mood.** No mood, no queries. Ask.
2. **Pull the 5 base queries** for that mood exactly as stored. No rewriting.
3. **Add 2-3 campaign-specific queries** that pair the campaign's context with a visual style
   (e.g. "coastal linen editorial golden hour", "sailing club poster typography"). This is the only
   generated part.
4. **Add the board pointer** if curated boards exist: `Also check board: [Mood]`.
5. **New mood with no base row:** build 5 base queries from the mood's keywords in the brand
   reference, add them to `base_queries`, and treat them as frozen from then on.

## Rules

- Every campaign gets a moodboard, including small ones, unless it is on the skip list.
- Base queries are frozen. Consistency across months is the point.
- Mix subject queries (outfits, products, scenes) with design queries (type, poster, color, texture)
  so the designer gets both.
- Private boards cannot be pulled automatically. Output the board name for manual use.

## Output format

```
Campaign: Coastline Weekend
Mood: Coastline
Base queries:
  - coastal linen outfit editorial
  - sun-bleached seaside photography
  - nautical stripe graphic design
  - hand-lettered beach poster
  - warm film grain summer moodboard
Campaign queries:
  - linen weekend packing flat lay
  - harbor town golden hour portrait
Board: Coastline
```

Example brand: Northwind Apparel.
