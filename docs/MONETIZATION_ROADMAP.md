# Aetheris Monetization Roadmap

**Goal:** first real dollar **within 30 days** of 2026-09-21  
**Constraint:** static GH Pages app today — no inventing fake metrics; ship the smallest paid wedge that matches the product.

## Honest read

Aetheris today is a **free exploration tool**. That is good for acquisition, bad for revenue until there is:

1. A reason to pay (personalization / export / sync / depth), and  
2. A checkout that does not require rebuilding the whole stack.

**Best fit:** freemium **personal longevity map** + paid **protocol / Pro unlock**, sold before heavy SaaS.

**Avoid for month 1:** ads, custom Stripe subscriptions with accounts, clinic enterprise deals, app-store cut.

---

## North-star offer (30-day)

### Product: **Aetheris Pro — Personal Stack** (one-time, then maybe subscription)

| Tier | Price (start) | What they get |
|------|----------------|---------------|
| Free | $0 | Full constellation explore, limited “My stack” (e.g. 15 nodes), local only |
| **Pro lifetime** | **$29** (intro) or **$9/mo** | Unlimited stack, protocol PDF export, lab specimen filters saved, early anatomy Pro layers, priority roadmap input |
| **Stack Audit** (service) | **$79–$149** | Mark (or templated) reviews their exported stack JSON / screenshot → written 1-page protocol. Manual at first. |

**First $ bet:** sell **Pro lifetime ($29)** *or* **Stack Audit ($79)** — whichever Mark can deliver with less friction. Audit can close cash even before Pro is coded if sold as “founding audit” against the live map.

---

## Week-by-week (first $ < 30 days)

### Week 1 — Instrument + waitlist money-adjacent

- [ ] Analytics live (see Improvement Plan Phase 0)
- [ ] Tally/Formspree: “Founding Pro waitlist” + optional “I want a stack audit”
- [ ] Soft CTA on live site: *Founding Pro — $29 when doors open* (even before gate ships)
- [ ] 10 warm DMs / emails / X posts to longevity-curious people Mark already knows
- [ ] Optional: Gumroad/Lemon Squeezy **product page** created (draft), payment link ready

**Week 1 success:** ≥1 waitlist signup or ≥1 audit conversation started. Prefer a paid audit deposit if someone is hot.

### Week 2 — Sell before polish

- [ ] Publish Gumroad or Lemon Squeezy: **“Aetheris Founding Pro”** — $29  
  - Deliverable v0: license key / unlock code stored in localStorage + thank-you PDF “how to use Pro”  
  - Even if Pro features are thin, founding buyers fund the build (be transparent: early access)
- [ ] OR sell **Stack Audit** as a service listing ($79) — fulfillment = 48h written note using the public map
- [ ] Landing blurb on README + site footer linking to checkout
- [ ] 3 short demos (screen recordings) for X / Instagram / YouTube Shorts

**Week 2 success:** **first $29 or $79**. If zero by day 14, run a 48h “founding 20 seats” push.

### Week 3 — Make Pro feel real

- [ ] Ship local “My stack” + Pro unlock flag (Improvement Plan Phase 1–3)
- [ ] PDF export of stack (even simple print CSS)
- [ ] Email buyers the unlock + changelog
- [ ] Collect 3 testimonials (quote + permission)

**Week 3 success:** Pro unlock works end-to-end for a buyer; ≥1 testimonial.

### Week 4 — Tighten loop

- [ ] Raise price to $39 lifetime *or* add $9/mo after founding batch sells (e.g. 20 seats)
- [ ] Affiliate disclosure page; only add affiliate links Mark approves
- [ ] Decide: stay one-time vs add subscription for cloud sync (month 2+)

**Week 4 success:** ≥$100 cumulative OR clear learning (what offer people refused and why).

---

## Checkout stack (keep dumb)

| Need | Tool |
|------|------|
| Payment | Lemon Squeezy or Gumroad (tax/VAT handled) |
| Delivery | License key email + docs link |
| Unlock in app | Local license string → feature flag (no backend month 1) |
| Waitlist | Tally / Formspree |
| Later cloud sync | Supabase / Firebase + Stripe Customer Portal (month 2–3) |

Do **not** build a custom billing backend in month 1.

---

## Messaging (compliance)

- Frame as **education + personal tracking**, not diagnosis or treatment.
- No “reverse aging” medical claims in paid copy.
- Stack Audit = “protocol suggestions for discussion with your clinician.”

---

## What not to monetize yet

| Idea | Why wait |
|------|----------|
| Clinic seats / B2B | Long sales cycle; kills 30-day target |
| Native widget app | Wrong product lane; STEADY overlap |
| Data marketplace | Trust + legal landmine |
| Ads on the map | Destroys trust for longevity brand |

---

## Metrics that matter (no vanity)

Track manually or in a sheet until analytics exist:

1. Waitlist emails  
2. Checkout visits → purchases  
3. Time-to-first-dollar  
4. Refunds / complaints  
5. Feature requests from buyers (prioritize these over open GitHub archaeology)

---

## Decision for Mark (pick one primary offer this week)

1. **Founding Pro $29** — productized, scales, needs thin unlock in app  
2. **Stack Audit $79** — fastest cash, Mark’s time as bottleneck  
3. **Both** — Audit for cash now, Pro for leverage (recommended)

---

*When first $ lands: tell Aetheris + Personal assistant so we lock the winning offer into the weekly rhythm.*
