/**
 * OrganSystem — cumulative stack coverage scores per organ (client-side only).
 *
 * Recomputes from My Stack entries by looking up node data across constellations.
 * Scores are educational "stack coverage / tagged systems" — not medical advice.
 *
 * Sign rules:
 *   - environment constellation → always negative
 *   - node.impact === 'negative' or node._isNegative → negative
 *   - otherwise positive
 * Magnitude from vitality (preferred) or longevity, scaled to ~0–1 per organ tag.
 */

import { calcVitality } from './ScoringEngine.js';

function nodeMagnitude(node) {
  if (!node) return 0.5;
  const raw =
    typeof node.vitality === 'number'
      ? node.vitality
      : typeof node.longevity === 'number'
        ? node.longevity
        : calcVitality(node);
  const n = Number(raw);
  if (!Number.isFinite(n)) return 0.5;
  return Math.max(0.15, Math.min(1, n / 100));
}

function isNegativeContribution(node, constellation) {
  const c = String(constellation || '').toLowerCase();
  if (c === 'environment') return true;
  if (!node) return false;
  return !!(node.impact === 'negative' || node._isNegative || node._isEnvironment);
}

export class OrganSystem {
  constructor() {
    /** @type {Record<string, number>} organKey -> signed coverage score */
    this.impacts = {};
    /** @type {Record<string, { count: number, positive: number, negative: number }>} */
    this.coverage = {};
    this.listeners = [];
    this._ranked = [];
  }

  /**
   * Apply a single node's organ list (legacy / incremental API).
   * Prefer recomputeFromStack for My Stack–driven scores.
   */
  applyContribution(sourceId, organList = [], impactValue = 1) {
    void sourceId;
    organList.forEach((organ) => {
      const key = String(organ).toLowerCase();
      this.impacts[key] = (this.impacts[key] || 0) + impactValue;
      if (!this.coverage[key]) {
        this.coverage[key] = { count: 0, positive: 0, negative: 0 };
      }
      this.coverage[key].count += 1;
      if (impactValue < 0) this.coverage[key].negative += 1;
      else this.coverage[key].positive += 1;
    });
    this._refreshRanked();
    this.notify();
  }

  /**
   * Full recompute from My Stack entries.
   * @param {Array<{id: string, constellation?: string}>} entries
   * @param {(id: string, constellation: string) => object|null} resolveNode
   */
  recomputeFromStack(entries = [], resolveNode) {
    this.impacts = {};
    this.coverage = {};

    if (typeof resolveNode !== 'function') {
      this._refreshRanked();
      this.notify();
      return this.impacts;
    }

    for (const entry of entries) {
      if (!entry || entry.id == null) continue;
      const constellation = String(entry.constellation || 'supplements').toLowerCase();
      const node = resolveNode(String(entry.id), constellation);
      if (!node) continue;

      const organs = Array.isArray(node.organs) ? node.organs : [];
      if (!organs.length) continue;

      const mag = nodeMagnitude(node);
      const neg = isNegativeContribution(node, constellation);
      const signed = (neg ? -1 : 1) * mag;

      for (const organ of organs) {
        if (organ == null || organ === '') continue;
        const key = String(organ).toLowerCase();
        this.impacts[key] = (this.impacts[key] || 0) + signed;
        if (!this.coverage[key]) {
          this.coverage[key] = { count: 0, positive: 0, negative: 0 };
        }
        this.coverage[key].count += 1;
        if (neg) this.coverage[key].negative += 1;
        else this.coverage[key].positive += 1;
      }
    }

    this._refreshRanked();
    this.notify();
    return this.impacts;
  }

  getOrganState(organ) {
    return this.impacts[String(organ).toLowerCase()] || 0;
  }

  /**
   * Ranked organ rows for UI strips.
   * @param {number} [limit=12]
   * @returns {Array<{ organ: string, score: number, count: number, positive: number, negative: number }>}
   */
  getRanked(limit = 12) {
    if (!this._ranked.length && Object.keys(this.impacts).length) {
      this._refreshRanked();
    }
    return this._ranked.slice(0, limit);
  }

  /** Top organ keys by absolute coverage score (for anatomy highlight). */
  getTopOrgans(n = 8) {
    return this.getRanked(n).map((r) => r.organ);
  }

  /** Organs with any stack tag coverage (positive or negative). */
  getCoveredOrgans() {
    return Object.keys(this.impacts);
  }

  _refreshRanked() {
    this._ranked = Object.entries(this.impacts)
      .map(([organ, score]) => {
        const cov = this.coverage[organ] || { count: 0, positive: 0, negative: 0 };
        return {
          organ,
          score,
          count: cov.count,
          positive: cov.positive,
          negative: cov.negative
        };
      })
      .sort((a, b) => Math.abs(b.score) - Math.abs(a.score) || b.count - a.count);
  }

  reset() {
    this.impacts = {};
    this.coverage = {};
    this._ranked = [];
    this.notify();
  }

  subscribe(callback) {
    if (typeof callback !== 'function') return () => {};
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  notify() {
    const snapshot = this.impacts;
    this.listeners.forEach((fn) => {
      try {
        fn(snapshot);
      } catch {
        /* non-fatal */
      }
    });
  }
}

/** Singleton for the current phase (easy to replace with DI later) */
export const globalOrganSystem = new OrganSystem();
