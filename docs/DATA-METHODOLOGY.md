# Creator data and metric methodology

## Source data

All follower and publication counts in the initial dataset were transcribed from supplied Instagram screenshots captured on 14–15 July 2026. Original screenshots are stored in:

```text
evidence/source-proofs/
```

Optimised central-profile crops used by the UI are stored in:

```text
public/assets/creators/
```

## What is verified

The `@best_boat_deals` screenshot displays **2.6M views during the previous 30 days** in the Instagram professional dashboard. This is stored with `evidence: "verified"`.

## What is visible-sample data

The supplied `@alessiopdlf.nautic` profile shows visible Reels with approximately:

- 5,573 views
- 32,600 views
- 11,400 views

These are individual post samples, not a monthly total. They are stored with `evidence: "visible-sample"`.

The `@best_boat_deals` grid also visibly shows post samples around 12.5K, 50.2K and 21.6K, but the 2.6M professional-dashboard total is the stronger metric.

## Directional estimates

Other 30-day view ranges are planning estimates inserted to complete the frontend metric architecture. They are intentionally ranges, not exact claims. They should not appear in proposals as guaranteed or audited figures.

## Required creator analytics pack

Collect the same period and fields from every creator:

- Platform and handle
- Export date
- Followers/subscribers
- 30-day and 90-day reach
- 30-day and 90-day views
- Reel/video average and median views
- Story average reach and completion
- Engagement rate with defined formula
- Top countries
- Age groups
- Gender split where legally and ethically appropriate
- Content frequency
- Previous campaign examples

## Aggregate rules

- Sum followers as **combined following**, never unique audience.
- Aggregate views only when periods and definitions match.
- Do not average engagement rates across platforms without weighting and formula disclosure.
- Exclude expired metrics from public network totals.
- Store `verified_at`, `period_start`, `period_end`, source and evidence file.
- Add a warning when a metric is older than 60–90 days.
