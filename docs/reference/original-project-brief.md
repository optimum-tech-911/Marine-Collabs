# Maritime Influencer Agency Platform — Project Brief

**Purpose of this document:** a single, tight brief you can feed directly into an AI coding agent (Claude Code / Codex) to scaffold the build. It captures the confirmed requirements from the prior planning session, flags the assumptions that shaped it, and gives a full site architecture, data model, design direction, and copy guidelines.

---

## 1. Project Summary

A brand-new, standalone platform for a talent agency representing **boat / maritime / sailing influencers**. The agency already has:
- A roster of signed influencers in the boating/sailing/maritime niche
- Initial interest from enterprises (brands) who want to partner with that roster

**What's missing:** a platform polished enough to be the agency's front door — showcasing the roster professionally to brands, making the agency look credible and established, and converting brand interest into signed partnerships.

This is a **B2B two-sided showcase and lead-generation platform**, not a transactional marketplace (no self-serve booking, no payments in v1) and not an investment/equity platform.

---

## 2. Assumption Flagged for Confirmation

The source conversation said the goal was to show the platform "to the entreprises so that they invest with us." Reading that in context (you already have influencers **and** enterprises lined up, and you're using agency/roster language), the far more natural reading is:

> **Brands partner with and sponsor the roster** (a B2B creator-marketing relationship), **not** that brands take equity in the agency.

The whole brief below is built on that assumption. If you actually mean equity/funding, the entire structure changes (you'd need an investor deck, financials, cap table info — not a roster showcase), so **flag it now if wrong** before this goes to Codex.

**Also still open — please confirm before build:**
1. **Agency/brand name** (used throughout copy, domain, meta tags)
2. **Target market** — France, UK, Mediterranean/international, or global? (Affects language: FR/EN bilingual or single language)
3. **Roster size at launch** — a handful of hero influencers, or dozens (affects whether the roster page needs filtering/search or just a curated grid)
4. **Primary conversion goal** — is the main CTA "request a partnership," "download our media kit," or "book a call"?
5. **Existing brand assets** — logo, color palette, typography already decided, or does this need a design pass too?

---

## 3. Two-Sided Value Proposition

### For Enterprises / Brands (primary audience — they hold the money)
They need to be convinced, fast, that this agency is professional, has real reach, and is worth the budget. They're comparing you against generic influencer marketplaces (Upfluence, Aspire, Collabstr) and yacht-specific marketing agencies (Relevance Yacht, Bird Marketing). Your edge over the generalist platforms: **curation and niche depth** — you're not a database of millions of creators, you're a hand-picked roster that lives and breathes boating. Your edge over the generalist yacht marketing agencies: **you lead with creators/influencers as the product**, not SEO/PPC services.

What they need to see fast:
- Proof of reach (aggregate audience numbers, engagement rates)
- Proof of niche authenticity (these are real sailors/boaters, not generic lifestyle creators slapping a boat filter on)
- Proof of professionalism (case studies, clean media kits, easy point of contact)
- A frictionless way to start a conversation

### For Influencers (secondary audience — recruitment/retention)
Boating/maritime creators are a small, tight-knit niche. A polished platform signals the agency is worth signing with over going direct or joining a generalist marketplace. They want to see: who else is on the roster (social proof), what kind of brand deals the agency lands, and a clear, non-degrading way to apply.

---

## 4. Site Architecture (Sitemap)

```
/ (Home)
├── /roster                    — Public influencer showcase (grid/filterable)
│   └── /roster/[handle]       — Individual influencer profile (mini media kit)
├── /for-brands                 — Brand-facing pitch page (the money page)
├── /for-influencers             — Recruitment/application page
├── /about                      — Agency story, mission, team
├── /case-studies               — Past partnership results (social proof)
│   └── /case-studies/[slug]
├── /contact                    — Partnership inquiry form (brands) + general contact
└── /legal                      — Privacy, terms (required, keep minimal)
```

**Phase 2 (not v1):** gated agency dashboard for roster management, campaign tracking, and brand self-serve request submission — mirrors what Aspire/Upfluence/Zano do on the backend, but only worth building once there's real deal volume to justify it.

---

## 5. Page-by-Page Breakdown

### Home
- Hero: one sharp sentence establishing "the agency for maritime influencer marketing" + hero visual (roster in motion, not stock yacht photography — see Design Direction)
- Immediate credibility strip: aggregate reach numbers, logos of any confirmed brand partners (even 2-3 is strong social proof)
- "How it works" — 3 steps for brands (Discover the roster → Tell us your goals → We build the campaign)
- Featured influencers (3-6 cards, links to /roster)
- Featured case study or testimonial
- Dual CTA: "Partner with us" (brands) / "Join the roster" (influencers) — brands should be visually primary

### /roster
- Grid of influencer cards: photo, name/handle, niche tag (sailing / powerboats / yacht lifestyle / fishing, etc.), platform icons, follower count, engagement rate
- Filter/sort if roster is large enough to need it (by platform, niche sub-category, audience size, region)
- Each card links to a full profile

### /roster/[handle] — Influencer profile
This is your mini media kit, per creator:
- Hero photo/video, name, tagline, niche
- Platform breakdown (Instagram/YouTube/TikTok with follower + engagement per platform)
- Audience demographics if available (age, gender split, top geographies)
- Content style description (what they actually make: cruising vlogs, gear reviews, racing, liveaboard lifestyle, etc.)
- Past brand collaborations (logos)
- "Request this creator" CTA → contact form pre-filled with their name

### /for-brands — the conversion page
- Reframe from "here's our roster" to "here's what a partnership gets you"
- Reach/engagement stats aggregated across roster
- Why maritime niche influencers convert better than generic lifestyle creators for marine brands (authenticity, qualified audience — people who actually own/want boats)
- Partnership formats offered (sponsored content, product seeding, event coverage, ambassador programs, boat show activations)
- Case study proof
- Clear CTA to /contact with a brand-specific form (budget range, campaign goals, timeline)

### /for-influencers
- Why join this agency vs. going direct or joining a generalist marketplace
- What the agency handles for them (deal negotiation, brand matching, payment, content guidance)
- Application form (platform links, follower counts, niche, sample content)

### /case-studies
- Each one: brand + creator(s) involved, campaign goal, what was executed, results (reach, engagement, and business outcome if you have it)
- Even 2-3 strong ones outweigh a long thin list

### /about
- Origin story — why maritime, why now
- Team (even if small — brands want to know who they're dealing with)
- Values/positioning statement

### /contact
- Two clearly separated paths: "I'm a brand" / "I'm an influencer" / "Something else" — routes to relevant form fields, avoids one generic contact box

---

## 6. Data Model (for the roster + profiles)

```
Influencer
├── id, handle, display_name, tagline
├── niche_tags[]           (sailing, powerboating, fishing, yacht lifestyle, marine gear, etc.)
├── region                 (Mediterranean, Atlantic, Caribbean, etc. — if relevant)
├── platforms[]
│   ├── platform (Instagram/YouTube/TikTok/etc.)
│   ├── handle_url
│   ├── follower_count
│   └── engagement_rate
├── audience_demographics   (optional, structured)
├── content_style_description
├── media (hero photo/video, gallery)
├── past_brand_partners[]  (name, logo)
└── status                 (active, featured, applying)

Brand Partner / Case Study
├── id, brand_name, brand_logo
├── influencers_involved[] (ref)
├── campaign_goal
├── deliverables[]
├── results                (reach, engagement, outcome)
└── testimonial_quote

Inquiry (contact form submissions)
├── type                   (brand / influencer / general)
├── contact_info
├── message / structured fields (budget range, campaign goal, timeline for brands)
└── related_influencer     (optional — set if submitted from a profile page)
```

Simple enough for a headless CMS (Sanity, Payload, or even structured MDX/JSON if the roster is small at launch) rather than a full custom backend — revisit only if Phase 2 dashboard gets built.

---

## 7. Design Direction

Brief says: **"solid, futuristic, reactive, well-respectful."** Translated to design language:

- **Solid** → weight and credibility. Confident typography, generous whitespace, real photography/video over illustration. Avoid anything that feels like a template.
- **Futuristic** → subtle motion (scroll-triggered reveals, smooth transitions), not sci-fi visuals. Think modern maritime tech (racing yacht instrumentation, clean nautical minimalism) rather than glossy luxury-yacht-broker clichés.
- **Reactive** → the site should feel alive: hover states, parallax on hero media, live-feeling stat counters — energy without gimmick.
- **Respectful** → this is B2B. No aggressive marketplace hard-sell tactics (no "flash deal" energy). Calm confidence, not hype.

**Visual reference point to avoid:** the generic "luxury yacht broker" aesthetic (navy + gold + serif + stock sunset photography) that every yacht marketing agency in this space already uses — that's a crowded, dated look here. Differentiate by looking more like a modern creator-economy product (closer to Aspire, Collabstr, or a well-designed sports agency site) with maritime texture layered in, rather than a yacht brokerage site with an influencer page bolted on.

---

## 8. Copy & Wording Guidelines

Since wording was flagged as critical:

- **Lead with outcomes, not features.** Not "we have a roster of influencers" — "your brand, in front of the people who actually buy boats."
- **Be specific, not superlative.** Avoid "world-class," "premium," "unparalleled" — use real numbers and real niche detail instead. Specificity reads as more credible than adjectives in B2B.
- **Talk like an operator, not a brochure.** Short sentences. Active voice. No stock marketing filler ("in today's fast-paced digital landscape...").
- **Niche vocabulary signals authenticity** — use real boating/sailing terminology correctly (this audience will notice if it's generic "lifestyle influencer" language slapped onto a boat theme).
- **Every CTA should say what happens next**, not just "Contact us" — e.g. "Get your custom partnership proposal" is stronger than "Get in touch."

---

## 9. Suggested Tech Stack

Consistent with a modern marketing-site-plus-CMS build, similar in spirit to your VISIO Health approach:

- **Framework:** Next.js (React) — SSR/SSG for fast marketing pages, good SEO
- **CMS:** Headless CMS (Sanity or Payload) for the roster and case studies, so the agency can add/update influencers without a redeploy
- **Styling:** Tailwind CSS, custom design tokens for the maritime-modern palette/type system
- **Forms:** Simple serverless form handling (Resend/Formspree-style, or a lightweight API route) routing to email/CRM
- **Hosting:** Vercel or Cloudflare Pages
- **Analytics:** Plausible or GA4, plus basic conversion tracking on the brand contact form

No auth, payments, or database beyond the CMS needed for v1 — keep the build lean since this is a showcase/lead-gen site, not a transactional marketplace yet.

---

## 10. What "Deep Research" Should Actually Dig Into Next

Points worth a dedicated research pass before/during build (good use of the fresh Claude session's search budget):

1. **Direct competitor teardown** — find any existing maritime/boating-specific influencer agencies or platforms (not general yacht marketing agencies) and audit their positioning, roster presentation, and pricing signals
2. **Naming/domain check** — if the agency name isn't locked yet
3. **Real reference sites for the "modern, not brokerage-cliché" aesthetic** — pull 3-5 screenshots of creator-economy or sports-talent-agency sites with strong motion/interaction design to use as literal visual references for Codex
4. **Platform-specific benchmark data** — average engagement rates for sailing/boating niche creators on Instagram/YouTube/TikTok, to sanity-check whatever stats go on the roster/brand pages
5. **Legal/compliance basics** — sponsored content disclosure requirements in your target market(s) if brands will be running paid partnerships through you

---

## 11. Suggested Build Order (for Codex)

1. Design system + component library (buttons, cards, nav, footer) in the maritime-modern direction
2. Home page
3. Roster grid + individual profile template (even with 2-3 placeholder influencers to start)
4. /for-brands page
5. /contact with routed forms
6. /for-influencers, /about, /case-studies
7. CMS wiring so content is editable without redeploy
8. Motion/interaction polish pass last, once structure is locked