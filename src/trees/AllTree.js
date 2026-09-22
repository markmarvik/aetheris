/**
 * One map of every constellation. Nodes keep their source id for My Stack.
 * The camera frames the whole set; names appear once you zoom in.
 */

import { SupplementTree } from './SupplementTree.js';
import { calcVitality } from '../core/ScoringEngine.js';
import { computeBiomarkerScore } from '../data/biomarkers.js';

export const allCategories = [
  { key: 'supplements', label: 'SUPPS', icon: 'fa-pills' },
  { key: 'habits', label: 'HABITS', icon: 'fa-user-check' },
  { key: 'exercises', label: 'TRAIN', icon: 'fa-dumbbell' },
  { key: 'foods', label: 'FOODS', icon: 'fa-carrot' },
  { key: 'environment', label: 'ENV', icon: 'fa-radiation' },
  { key: 'biomarkers', label: 'LABS', icon: 'fa-vial' }
];

export class AllTree extends SupplementTree {
  static CONST_COLORS = {
    supplements: '#fbbf24',
    habits: '#34d399',
    exercises: '#fb923c',
    foods: '#4ade80',
    environment: '#f87171',
    biomarkers: '#38bdf8'
  };

  loadData(arr) {
    this.rawSupplements = arr;
    this.nodes = arr.map((n) => {
      const isLab = n._constellation === 'biomarkers';
      const vitality = isLab ? computeBiomarkerScore(n) : calcVitality(n);
      return {
        ...n,
        vitality,
        longevity: n.longevity ?? vitality,
        qol: n.qol ?? vitality,
        radius: 11,
        _isBiomarker: isLab,
        _isBlood: isLab,
        displayValue: isLab
          ? (n.current != null ? String(n.current) : String(vitality))
          : n.displayValue
      };
    });
    this.enabledGroups = new Set(this.nodes.map((n) => n.cat).filter(Boolean));
    this.maxNodes = 0;
    this.computeLayout();
  }

  _getNodeColor(node) {
    if (node.impact === 'negative' || node._isNegative || node._constellation === 'environment') {
      return '#ef4444';
    }
    return AllTree.CONST_COLORS[node._constellation] || '#94a3b8';
  }

  computeLayout() {
    const visible = this._getVisibleNodes();
    const order = ['supplements', 'habits', 'exercises', 'foods', 'environment', 'biomarkers'];
    const groups = order
      .map((key) => visible.filter((n) => n.cat === key))
      .filter((g) => g.length);
    const known = new Set(order);
    const rest = visible.filter((n) => !known.has(n.cat));
    if (rest.length) groups.push(rest);

    const weights = groups.map((g) => Math.sqrt(g.length));
    const sum = weights.reduce((a, b) => a + b, 0) || 1;
    let cursor = -Math.PI / 2;

    groups.forEach((group, gi) => {
      const span = (Math.PI * 2) * (weights[gi] / sum);
      const mid = cursor + span / 2;
      const ranked = [...group].sort((a, b) => (b.vitality || 0) - (a.vitality || 0));
      let placed = 0;
      let ring = 0;
      while (placed < ranked.length && ring < 28) {
        const orbitGuess = this._bodyEdgeRadius(mid) + 28 + ring * 26;
        const arc = Math.max(26, orbitGuess * span * 0.9);
        const capacity = Math.max(1, Math.floor(arc / 24));
        const take = Math.min(capacity, ranked.length - placed);
        for (let i = 0; i < take; i++) {
          const node = ranked[placed + i];
          const t = take === 1 ? 0.5 : i / (take - 1);
          const ang = mid + (t - 0.5) * span * 0.9;
          const dist = this._bodyEdgeRadius(ang) + 28 + ring * 26;
          node.radius = 11;
          node.x = Math.cos(ang) * dist;
          node.y = Math.sin(ang) * dist;
        }
        placed += take;
        ring += 1;
      }
      cursor += span;
    });

    this._settleNodePositions(visible, {
      collisionPadding: 3,
      settleIterations: 28,
      bodyPadding: 8,
      labelMargin: 2
    });

    if (!this.view) this.view = { panX: 0, panY: 0, scale: 0.55 };
    if (typeof this.view.panX !== 'number') this.view.panX = 0;
    if (typeof this.view.panY !== 'number') this.view.panY = 0;
    if (typeof this.view.scale !== 'number') this.view.scale = 0.55;
  }
}
