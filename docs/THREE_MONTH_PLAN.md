# 3-month update & addition plan (nodes + groups)

**Brand:** StackMap (locked 2026-09-21).  
**Stance:** Improve and extend **existing** constellations — **do not** all-in rewrite or flood with hundreds of thin nodes.  
**Baseline:** ~v0.3.2 · live GH Pages · My Stack / OrganSystem / soft Free–Pro already in.  
**Related:** `ROADMAP_V1.md`, `REBRAND_OPTIONS.md`, `MONETIZATION_ROADMAP.md`.

---

## Principles

1. **Depth over sprawl** — upgrade weak nodes before adding new categories.  
2. **Group coherence** — every category should have a clear “why this bucket.”  
3. **Schema consistency** — id, name, cat, organs, vitality/longevity, blurb, mechanisms, links.  
4. **Ship monthly** — one constellation focus per month + light cross-cuts.  
5. **No medical claims** — educational / tracking framing only.

---

## Month 1 — Harden what exists (quality pass)

**Theme:** Make current maps trustworthy.

| Week | Focus | Deliverable |
|------|--------|-------------|
| 1 | **Supplements** audit | Top 30 nodes: fix empty blurbs, broken Gorkipedia/Examine links, organ tags, dose/context fields where missing |
| 2 | **Habits + Exercises** | Same audit; align categories (sleep / stress / training zones); remove or merge duplicates |
| 3 | **Foods + Environment** | Foods: nutrient/mechanism clarity; Environment: consistent negative impact + mitigation blurbs |
| 4 | **Biomarkers** | Specimen tags (blood/urine/saliva) complete; optimal ranges sanity check; inspector copy polish |

**Also Month 1 (product, light):**

- Rebrand decision + claim handles (no full rename required in-app yet)  
- Wire real `CHECKOUT_URL` / feedback form when ready  
- Smoke mobile: Anatomy sheet, My Stack, print  

**Exit:** Zero “empty shell” nodes in the default TOP/visible set; link rot &lt; 5% on sampled nodes.

---

## Month 2 — Group redesign + smart additions

**Theme:** Better groups, then **selective** new nodes (cap additions).

| Constellation | Group work | Addition budget |
|---------------|------------|-----------------|
| Supplements | Re-cluster into 6–8 clear groups (e.g. mito, sleep, cardio, hormone-support, gut, foundation) | +15–25 high-signal nodes max |
| Habits | Morning / evening / recovery slots friendly for My Stack | +8–12 |
| Exercises | Strength / zone-2 / mobility / stability | +8–12 |
| Foods | Protein / polyphenol / fermented / foundational fats | +10–15 |
| Environment | Air / water / light / chemical / radiation | +5–10 only if gaps |
| Biomarkers | Panel-style groups (lipids, metabolic, inflammation, hormones) | +10–15 urine/saliva if missing |

**Cross-cut Month 2:**

- OrganSystem: ensure new/updated nodes have clean `organs[]`  
- My Stack: suggest “starter stacks” (3–5 curated lists as data, not a new app)  
- Share card: include group labels  

**Exit:** Groups feel intentional; additions are gated by the budget above (no dump).

---

## Month 3 — Launch surface + v1 glue

**Theme:** Ready to show the world under the new brand.

| Workstream | Plan |
|------------|------|
| Content | 8–12 “node of the week” briefs reused on X/YT from upgraded blurbs |
| Anatomy | Phase 2 art drop-in if assets ready (#36); else keep placeholders honest in UI |
| Pro | Live checkout link (#37); Plausible (#39); founding seat messaging on pricing page |
| Product | Tag toward **v1.0** if DoD in `ROADMAP_V1.md` is met; else **v0.4/v0.5** with clear remaining gaps |
| Data | Second light audit pass on anything added in Month 2 |

**Exit:** Public narrative = “explore map → build My Stack → print protocol”; brand + accounts live; data quality visibly better than today.

---

## Explicit non-goals (these 3 months)

- Rewriting the entire dataset from scratch  
- New constellations beyond the six that exist (no Toxins 2.0 as a seventh unless Environment absorbs it)  
- Native apps / STEADY widgets  
- Clinic B2B  
- Auto-generating hundreds of AI nodes without human edit  

---

## Cadence

- **Biweekly PR:** data-only PR (nodes/groups) separate from feature PRs  
- **Mark review:** 15–20 min on “top changed nodes” list before merge when &gt;10 files  
- **Metric (manual):** # nodes with complete blurb+organs+link; My Stack creates (if analytics live)

---

## Immediate next step (not all-in)

1. Mark picks rebrand primary + backup (`REBRAND_OPTIONS.md`).  
2. Start **Month 1 Week 1**: supplements top-30 quality PR only.  
3. Hold mass additions until Month 2 budgets.
