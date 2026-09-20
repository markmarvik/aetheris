# AETHERIS — Modular Longevity Constellation Platform

Refactored multi-file version of the original single-file AETHERIS experience.

## Current Status (v0.2.3)

**Map UX (multi-constellation):**
- Body-centric canvas: central human figure with nodes in organ rings
- Constellations: Supplements, Habits, Exercises, Foods, Environment, **Biomarkers**
- Biomarkers cover blood + urine + saliva (+ other) via `specimen_type` (Issue #14)
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
| HiDPI canvas | [`src/core/CanvasViewport.js`](src/core/CanvasViewport.js) |
| Data | [`src/data/supplements.js`](src/data/supplements.js), habits, exercises, foods, environment, [`biomarkers.js`](src/data/biomarkers.js) |
| Hover card | [`src/components/HoverPopup.js`](src/components/HoverPopup.js) |
| Deep dive modal | [`src/components/ExplorerModal.js`](src/components/ExplorerModal.js) |
| Legacy layout helper | [`src/core/LayoutEngine.js`](src/core/LayoutEngine.js) (polar prototype; tree uses `_settleNodePositions`) |
| Optional sidebar SVG body | [`src/components/OrganDiagram.js`](src/components/OrganDiagram.js) (not wired; body drawn on canvas) |

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

**One-time setup in the GitHub repo UI:**
1. Go to **Settings → Pages**
2. Under "Build and deployment", set **Source** to **GitHub Actions**

After the setting change, push to `main` (or run the workflow manually from the Actions tab). The site should update within a couple of minutes.

All built assets (JS modules, CSS, body PNGs) are emitted under `/aetheris/assets/...`.

## Roadmap

- ~~Touch/pointer pan for mobile~~ (shipped)
- Zoom toward cursor polish
- ~~More constellations~~ (Exercise, Foods, Environment, Biomarkers shipped)
- Layered anatomy (organs / skeleton / muscles) — Issue #16
- `OrganSystem` cumulative organ impact across trees

Original monolith reference: `/home/tux/aetheris-longevity-tree.html`
