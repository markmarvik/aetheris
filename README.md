# AETHERIS — Modular Longevity Constellation Platform

Refactored multi-file version of the original single-file AETHERIS experience.

## Current Status (v0.3.0)

**Map UX (multi-constellation):**
- Body-centric canvas: central human figure with nodes in organ rings
- Constellations: Supplements, Habits, Exercises, Foods, Environment, **Biomarkers**
- Biomarkers cover blood + urine + saliva (+ other) via `specimen_type` (Issue #14)
- **My Stack depth (v0.3.0)**: notes + morning/evening slots, import replace/merge, empty states, Canvas PNG share card, printable protocol
- **Free/Pro soft scaffold**: `FeatureFlags` + localStorage license key stub; soft stack-limit warnings (no hard paywall); Pricing modal “Coming soon”
- **Analytics + feedback**: `track()` stub + constellation hooks; footer Feedback (Tally placeholder)
- **Layered anatomy** (Issue #16 Phase 1): independent opacity for base / organs / skeleton / muscles + view presets; **mobile** opens as fixed bottom sheet (v0.2.8)
- HiDPI rendering via `CanvasViewport` (sharp nodes and labels)
- 2D pan (drag), zoom (wheel / +/-), recenter (`r`)
- Dynamic layout: larger nodes closer to body, collision + body keep-out settling
- Category group toggles on the map (+ specimen filters for Biomarkers)
- `HoverPopup` on hover and click (pinned until click away or Esc)
- Sidebar detail panel + Gorkipedia explorer modal

**Keyboard:** `Esc` reset · `+`/`-` zoom · `r` recenter · `f` show all groups

**Development (recommended):**
```bash
cd aetheris
npm install
npm run dev
```

> **Note:** Do not open `index.html` directly in a browser. The project uses Vite + ES module imports (including CSS). Use `npm run dev` (or `npm run build && npm run preview`) instead. Direct file:// or raw static serving will fail to load modules correctly.

## Architecture

| Area | Location |
|------|----------|
| Entry + input | [`src/main.js`](src/main.js) |
| Tree classes | [`src/trees/SupplementTree.js`](src/trees/SupplementTree.js), Habits / Exercise / Foods / Environment / [`BiomarkerTree.js`](src/trees/BiomarkerTree.js) |
| Layered anatomy | [`src/core/AnatomyRenderer.js`](src/core/AnatomyRenderer.js) + body draw in SupplementTree |
| HiDPI canvas | [`src/core/CanvasViewport.js`](src/core/CanvasViewport.js) |
| Data | [`src/data/supplements.js`](src/data/supplements.js), habits, exercises, foods, environment, [`biomarkers.js`](src/data/biomarkers.js) |
| Hover card | [`src/components/HoverPopup.js`](src/components/HoverPopup.js) |
| Deep dive modal | [`src/components/ExplorerModal.js`](src/components/ExplorerModal.js) |
| Legacy layout helper | [`src/core/LayoutEngine.js`](src/core/LayoutEngine.js) (polar prototype; tree uses `_settleNodePositions`) |
| Optional sidebar SVG body | [`src/components/OrganDiagram.js`](src/components/OrganDiagram.js) (not wired; body drawn on canvas) |
| Product plans | [`docs/ROADMAP_V1.md`](docs/ROADMAP_V1.md), [`docs/IMPROVEMENT_PLAN.md`](docs/IMPROVEMENT_PLAN.md), [`docs/MONETIZATION_ROADMAP.md`](docs/MONETIZATION_ROADMAP.md) |

## Building

```bash
npm run build   # output in dist/
npm run preview
```

## Deployment on GitHub Pages

This project is hosted on GitHub Pages at: **https://markmarvik.github.io/aetheris/**

The site uses a production `base` of `/aetheris/` so all JS, CSS, and asset URLs (including body PNG layers) are correct for the sub-path.

### Requirements
- **Node.js 24+** (enforced via `package.json#engines` and `.nvmrc`)
- `npm install`

> **Note:** Do not open `index.html` directly. Use `npm run dev` or the built `dist/`.

### Local production build
```bash
npm run build
npm run preview
```

### GitHub Pages Deployment
A GitHub Actions workflow builds the project with **Node 24** on every push to `main` and deploys only the `dist/` folder.

- `vite.config.js` sets the correct base for the `/aetheris/` subpath.
- `public/.nojekyll` is present to prevent Jekyll processing.
- Workflow uses `actions/setup-node` (v24), `npm ci`, `npm run build`, and the official `actions/deploy-pages`.

**One-time setup in the GitHub repo UI (required):**
1. Go to **Settings → Pages**
2. Under "Build and deployment", set **Source** to **GitHub Actions** (not "Deploy from a branch")
3. If Source is "Deploy from a branch" / `main` `/`, the live site serves raw `index.html` + `src/main.js` and looks like HTML-only — switch to Actions and re-run this workflow

After the setting change, push to `main` (or run the workflow manually from the Actions tab). The site should update within a couple of minutes.

All built assets (JS modules, CSS, body PNGs) are emitted under `/aetheris/assets/...`.


## Anatomy assets (Issue #16)

Folder layout under `public/assets/body/`:

```
base/          body-male.png, body-female.png     (real art)
organs/        brain, eyes, gut, heart, liver, lungs, mito, nerves, stomach, thyroid  (real)
               + spine, kidneys, pancreas, adrenals                                  (Phase 1 placeholders)
skeleton/      skeleton_full.png                                                     (placeholder)
muscles/       muscles_anterior.png, muscles_posterior.png                           (placeholders)
```

**UI:** right-side **Anatomy** panel → presets (Organs / Musculoskeletal / Combined / Skeletal only / Muscles only) + per-layer opacity sliders. State lives in `AnatomyRenderer`; drawing stays in `SupplementTree._drawCentralBodyPng` so pan/zoom/HiDPI keep working.

### Real art still needed (follow-up)
Replace placeholders with transparent PNGs (same scale language as existing organ assets):
- Photoreal / illustrated `spine.png`, `kidneys.png`, `pancreas.png`, `adrenals.png`
- `skeleton_full.png` (or torso + limb bones)
- `muscles_anterior.png` / `muscles_posterior.png` (+ optional arm/leg detail sheets)
- Limb insets / click-to-zoom (Phase 2 of #16 — deferred)

### Extending layers
1. Drop PNGs into the folders above (names match `AnatomyRenderer` load list).
2. Add organ keys to `ORGAN_ASSET_KEYS` / `PNG_ORGAN_CONFIG` / `_getOrganPositions` / `organMeta` as needed.
3. Tag data nodes with matching `organs: [...]` so rings + highlights resolve.

## Roadmap

Concrete path to **v1.0:** [`docs/ROADMAP_V1.md`](docs/ROADMAP_V1.md).

- ~~Touch/pointer pan for mobile~~ (shipped)
- Zoom toward cursor polish
- ~~More constellations~~ (Exercise, Foods, Environment, Biomarkers shipped)
- ~~Layered anatomy Phase 1~~ (opacity presets + placeholders) — #16
- ~~Anatomy mobile bottom sheet~~ — v0.2.8: fixed overlay on phone (`#anatomy-panel`, z-100); desktop right-rail unchanged
- Layered anatomy Phase 2: photoreal spine/kidneys/MSK art + limb detail
- `OrganSystem` cumulative organ impact across trees
- ~~My Stack (localStorage + highlight + export/import + preview Add)~~ — v0.2.7: bottom-sheet button clicks fixed (bubble-phase stopPropagation); preview one-tap Add; panel list + Import JSON
- See also [`docs/IMPROVEMENT_PLAN.md`](docs/IMPROVEMENT_PLAN.md) and [`docs/MONETIZATION_ROADMAP.md`](docs/MONETIZATION_ROADMAP.md)

Original monolith reference: `/home/tux/aetheris-longevity-tree.html`
