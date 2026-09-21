/**
 * OrganExplode — radial organ spread + active organ → node filter.
 *
 * Hover (desktop) / tap (mobile) the central body to explode organs outward.
 * Constellation nodes spread radially in sync so they clear the organ ring.
 * Click an organ to filter constellation nodes tagged with that organ:
 *   green = beneficial / positive framing
 *   red   = negative impact (environment, impact==='negative', _isNegative)
 *
 * Educational UX only — copy should say nodes are "linked to" an organ, not medical claims.
 */

import { lerp, easeOutCubic } from './Animation.js';

/** PNG organ keys that participate in explode (matches SupplementTree draw order). */
export const ORGAN_EXPLODE_KEYS = [
  'brain',
  'eyes',
  'thyroid',
  'lungs',
  'heart',
  'liver',
  'stomach',
  'gut',
  'kidneys',
  'pancreas',
  'adrenals',
  'spine',
  'mito',
  'nerves'
];

/** Snappy explode / collapse duration (ms). */
export const EXPLODE_MS = 280;

/**
 * Target positions in world space (body center = 0,0) for exploded layout.
 * Angles: 0 = right, -π/2 = up. Radii tuned for ~BODY_SCALE silhouette.
 */
export const EXPLODE_LAYOUT = {
  brain:    { angle: -Math.PI / 2,        r: 175 },
  eyes:     { angle: -Math.PI / 2 + 0.42, r: 165 },
  thyroid:  { angle: -Math.PI / 2 - 0.42, r: 145 },
  nerves:   { angle: -Math.PI / 2 + 0.85, r: 155 },
  lungs:    { angle: Math.PI * 0.88,      r: 155 },
  heart:    { angle: Math.PI * 0.12,      r: 145 },
  mito:     { angle: Math.PI * 0.28,      r: 165 },
  liver:    { angle: Math.PI * 0.98,      r: 140 },
  stomach:  { angle: Math.PI * 0.05,      r: 125 },
  gut:      { angle: Math.PI * 0.55,      r: 150 },
  kidneys:  { angle: Math.PI * 0.72,      r: 145 },
  pancreas: { angle: Math.PI * 0.38,      r: 135 },
  adrenals: { angle: Math.PI * 0.82,      r: 130 },
  spine:    { angle: Math.PI * 1.05,      r: 120 }
};

/** Display labels (short, non-clinical). */
export const ORGAN_LABELS = {
  brain: 'Brain',
  eyes: 'Eyes',
  thyroid: 'Thyroid',
  lungs: 'Lungs',
  heart: 'Heart',
  liver: 'Liver',
  stomach: 'Stomach',
  gut: 'Gut',
  kidneys: 'Kidneys',
  pancreas: 'Pancreas',
  adrenals: 'Adrenals',
  spine: 'Spine',
  mito: 'Mito',
  nerves: 'Nerves'
};

/** Generous hit radius in world units (easy tap targets when exploded). */
export const ORGAN_HIT_RADIUS = 48;

/** Body ellipse hit pad (world units, same space as BODY_RX/RY). */
export const BODY_HIT_PAD = 1.08;

/**
 * Node radial spread during explode (world units).
 * Inner-ring nodes (~body edge) push farther so organs don't sit on them;
 * distant nodes push less. Tuned against EXPLODE_LAYOUT radii (~120–175).
 */
export const NODE_SPREAD_INNER = 140;
export const NODE_SPREAD_OUTER = 400;
export const NODE_SPREAD_PUSH_INNER = 95;
export const NODE_SPREAD_PUSH_OUTER = 28;

/**
 * Whether a node should light up for the given organ filter.
 * Uses expanded tag set (kidney↔kidneys, gut↔stomach, …).
 */
export function nodeMatchesOrgan(node, organKey, expandHighlights) {
  if (!node || !organKey) return false;
  const raw = Array.isArray(node.organs) ? node.organs : [];
  if (!raw.length) return false;
  const key = String(organKey).toLowerCase();
  const tags = expandHighlights
    ? expandHighlights([key])
    : new Set([key]);
  for (const o of raw) {
    const t = String(o || '').toLowerCase();
    if (!t) continue;
    if (tags.has(t) || t === key) return true;
  }
  return false;
}

/** Negative / harmful framing for ring color. */
export function nodeIsNegativeImpact(node, constellation = '') {
  const c = String(constellation || '').toLowerCase();
  if (c === 'environment') return true;
  if (!node) return false;
  return !!(node.impact === 'negative' || node._isNegative || node._isEnvironment);
}

export class OrganExplodeController {
  constructor() {
    /** 0 = seated in body, 1 = fully exploded */
    this.progress = 0;
    this.target = 0;
    /** @type {string|null} */
    this.activeOrganFilter = null;
    /** @type {string|null} organ under pointer (for hover affordance) */
    this.hoveredOrgan = null;
    this._animStart = 0;
    this._from = 0;
    this._to = 0;
    this._animating = false;
  }

  get isAnimating() {
    return this._animating;
  }

  get isExploded() {
    return this.progress > 0.02 || this.target > 0.5;
  }

  get isFullyExploded() {
    return this.progress > 0.55;
  }

  setExpanded(want) {
    const t = want ? 1 : 0;
    if (Math.abs(t - this.target) < 0.001 && !this._animating) {
      this.progress = t;
      return false;
    }
    if (Math.abs(t - this.target) < 0.001 && this._animating) return true;
    this._from = this.progress;
    this._to = t;
    this.target = t;
    this._animStart = performance.now();
    this._animating = true;
    return true;
  }

  /**
   * Toggle or set organ filter. Clicking the same organ clears.
   * @returns {string|null} resulting filter
   */
  toggleOrganFilter(key) {
    if (!key) {
      this.activeOrganFilter = null;
      return null;
    }
    const k = String(key).toLowerCase();
    if (this.activeOrganFilter === k) {
      this.activeOrganFilter = null;
      return null;
    }
    this.activeOrganFilter = k;
    this.setExpanded(true);
    return this.activeOrganFilter;
  }

  clearFilter() {
    this.activeOrganFilter = null;
  }

  /** Collapse organs + clear filter (Esc / empty map / body background). */
  collapseAll() {
    this.clearFilter();
    this.hoveredOrgan = null;
    return this.setExpanded(false);
  }

  /**
   * Advance animation. @returns {boolean} true if still animating / needs redraw
   */
  update() {
    if (!this._animating) return false;
    const raw = Math.min(1, (performance.now() - this._animStart) / EXPLODE_MS);
    const e = easeOutCubic(raw);
    this.progress = lerp(this._from, this._to, e);
    if (raw >= 1) {
      this.progress = this._to;
      this._animating = false;
    }
    return true;
  }

  /**
   * Interpolated draw position for an organ.
   * @param {string} key
   * @param {number} homeX
   * @param {number} homeY
   */
  getDrawPosition(key, homeX, homeY) {
    const layout = EXPLODE_LAYOUT[key];
    let tx;
    let ty;
    if (layout) {
      tx = Math.cos(layout.angle) * layout.r;
      ty = Math.sin(layout.angle) * layout.r;
    } else {
      const d = Math.hypot(homeX, homeY) || 1;
      const push = 110;
      tx = homeX + (homeX / d) * push;
      ty = homeY + (homeY / d) * push;
    }
    const p = this.progress;
    return {
      x: lerp(homeX, tx, p),
      y: lerp(homeY, ty, p)
    };
  }

  /**
   * Interpolated draw/hit position for a constellation node.
   * Pushes radially outward from body center (0,0) with the same progress
   * easing as organs. Closer nodes move more; far nodes less.
   * Layout home coords are unchanged — call sites use this for draw + hit only.
   * @param {number} homeX
   * @param {number} homeY
   */
  getNodeDrawPosition(homeX, homeY) {
    const p = this.progress;
    if (p < 0.001) return { x: homeX, y: homeY };

    const dist = Math.hypot(homeX, homeY);
    if (dist < 1) {
      // Degenerate / on-center: nudge upward
      return { x: homeX, y: homeY - NODE_SPREAD_PUSH_INNER * p };
    }

    const ux = homeX / dist;
    const uy = homeY / dist;
    const span = NODE_SPREAD_OUTER - NODE_SPREAD_INNER;
    const t = Math.min(1, Math.max(0, (dist - NODE_SPREAD_INNER) / span));
    const closeness = 1 - t; // 1 near body, 0 far out
    const push =
      NODE_SPREAD_PUSH_OUTER +
      (NODE_SPREAD_PUSH_INNER - NODE_SPREAD_PUSH_OUTER) * closeness;

    return {
      x: homeX + ux * push * p,
      y: homeY + uy * push * p
    };
  }

}

export default OrganExplodeController;
