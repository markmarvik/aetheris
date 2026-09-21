# Aetheris Roadmap → v1.0

**Baseline:** v0.3.0 (My Stack depth + Free/Pro soft scaffold) · live: https://markmarvik.github.io/aetheris/  
**Goal:** Ship a **v1.0** web product people can explore, personalize, and (optionally) pay for — without native apps or a custom billing backend.

Related: [`IMPROVEMENT_PLAN.md`](./IMPROVEMENT_PLAN.md), [`MONETIZATION_ROADMAP.md`](./MONETIZATION_ROADMAP.md).

---

## v1.0 definition of done

A **shippable product** when all of the following are true:

1. **Map UX** — Reliable on phone and desktop: pan/zoom, constellations, filters, inspector / bottom sheet, Anatomy controls usable on mobile (not clipped under the sheet).
2. **My Stack** — Persist, highlight, add/remove, export/import, list management; stable across constellations.
3. **OrganSystem scores** — Cumulative organ impact from the active stack (or selection), visible on map / inspector.
4. **Anatomy Phase 2 art** — Photoreal (or high-quality illustrated) spine / kidneys / MSK layers replacing Phase 1 placeholders; limb detail optional but tracked.
5. **Free / Pro gate** — Clear client-side feature boundary (stack limits, PDF export, saved lab filters, etc.) with a checkout **link** (Payment Link / Lemon Squeezy) — not a custom billing server.
6. **Protocol PDF export** — Pro path: printable/shareable stack summary.
7. **Analytics + feedback** — Lightweight page/constellation metrics + a feedback link.
8. **Polish** — README/status accurate, GH Pages green on Node 24, no known P0 mobile blockers.

Educational framing only — no medical claims.

---

## Phases (ordered)

### Phase A — Mobile polish (now → ~0.2.x)

- [x] My Stack bottom-sheet button clicks (bubble-phase `stopPropagation`) — v0.2.7
- [x] Anatomy mobile fixed bottom sheet / overlay — v0.2.8
- [ ] Touch pan polish + zoom-toward-cursor
- [ ] Smoke pass on live Pages (iOS Safari + Android Chrome): Anatomy, My Stack, inspector sheet

**Exit:** Phone map is usable end-to-end without clipped rails or dead taps.

### Phase B — My Stack depth

- [x] Notes / morning–evening slots on stack entries — v0.3.0
- [x] Share card (PNG) of current stack — Canvas 2D, v0.3.0
- [ ] Optional waitlist / email capture for future cloud sync
- [x] Harden import/merge + empty states — v0.3.0

**Exit:** User can build, revisit, and share a personal stack without an account.

### Phase C — OrganSystem scores

- [ ] Data model: roll up organ tags + impact from stack (and/or visible nodes)
- [ ] UI: organ scores in inspector + subtle map affordance
- [ ] Tie into Anatomy layer highlights where cheap

**Exit:** Stack → organ impact is visible and explainable.

### Phase D — Anatomy Phase 2 art

- [ ] Replace placeholders: spine, kidneys, pancreas, adrenals, skeleton, muscles
- [ ] Drop-in PNG workflow documented (already sketched in README)
- [ ] Limb inset / click-zoom (stretch goal inside v1 if art lands early)

**Exit:** Body layers look premium enough to sit behind Pro messaging.

### Phase E — Free / Pro gate

- [x] Feature flags: Free vs Pro (license key stub `aetheris-pro-key` + checkout-link placeholder) — v0.3.0 soft scaffold
- [x] Free: full map explore + soft-limited stack size (warn, no hard block) — v0.3.0
- [ ] Pro: unlimited stack, PDF export, saved lab specimen filters, early anatomy extras
- [x] In-app Pricing modal stub + checkout link placeholder — **no custom billing backend** — v0.3.0

**Exit:** Clear boundary; money can flow via hosted checkout.

### Phase F — PDF export + analytics + polish

- [x] Printable protocol (`window.print` stylesheet) soft-gated — v0.3.0 (PDF polish later)
- [x] Analytics stub `track()` + constellation hooks; Plausible drop comment in index.html — v0.3.0
- [x] Feedback link (Tally/Formspree placeholder) in footer — v0.3.0
- [ ] README Current Status → v1.0; version bump; Pages deploy verified

**Exit:** Tag **v1.0.0** on `main`.

---

## Explicit non-goals for v1

| Non-goal | Why |
|----------|-----|
| Native iOS / Android apps or home-screen widgets | Web-first; STEADY lane is separate |
| Clinic / coach B2B seats, EHR, medical-device positioning | Consumer loop first; compliance risk |
| Custom billing backend (subscriptions engine, webhooks farm) | Use Lemon Squeezy / Stripe Payment Link |
| Full cloud sync + accounts as a blocker | localStorage + export is enough for v1 |
| Merging STEADY-style widgets into this canvas app | Wrong-repo debt (#19–#26) |

---

## Suggested version waypoints

| Version | Focus |
|---------|--------|
| 0.2.8 | Anatomy mobile sheet + this roadmap |
| 0.3.0 | My Stack depth + Free/Pro soft scaffold + analytics/feedback |
| 0.3.x | OrganSystem scores (next) |
| 0.4.x | Anatomy Phase 2 art |
| 0.5.x | Free/Pro flags + pricing link |
| 0.9.x | PDF + analytics + polish |
| **1.0.0** | Definition of done met |

Stay lean: small PRs, one user-visible win each.
