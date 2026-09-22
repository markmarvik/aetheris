/**
 * Cross-constellation index for search and starter stacks.
 * Items reference real node ids. Missing ids are skipped at apply time.
 */

import { supplements } from './supplements.js';
import { habits } from './habits.js';
import { exercises } from './exercises.js';
import { foods } from './foods.js';
import { environment } from './environment.js';
import { biomarkers } from './biomarkers.js';

const SOURCES = [
  ['supplements', supplements],
  ['habits', habits],
  ['exercises', exercises],
  ['foods', foods],
  ['environment', environment],
  ['biomarkers', biomarkers]
];

export const CATALOG = SOURCES.flatMap(([constellation, list]) =>
  (Array.isArray(list) ? list : []).map((node) => ({
    id: node.id,
    name: node.name || node.id,
    short: node.short || '',
    cat: node.cat || '',
    constellation
  }))
);

export function searchCatalog(query, limit = 8) {
  const q = String(query || '').trim().toLowerCase();
  if (q.length < 1) return [];
  const scored = [];
  for (const entry of CATALOG) {
    const name = entry.name.toLowerCase();
    const short = String(entry.short).toLowerCase();
    const id = String(entry.id).toLowerCase();
    let score = 0;
    if (name.startsWith(q) || short.startsWith(q) || id.startsWith(q)) score = 3;
    else if (name.includes(q) || short.includes(q) || id.includes(q)) score = 2;
    else if (entry.cat.includes(q) || entry.constellation.includes(q)) score = 1;
    if (score) scored.push({ entry, score });
  }
  scored.sort((a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name));
  return scored.slice(0, limit).map((row) => row.entry);
}

/** Curated merges into My Stack. Educational starting points, not protocols. */
export const STARTER_STACKS = [
  {
    id: 'sleep',
    name: 'Sleep base',
    blurb: 'Light, timing, and evening minerals.',
    items: [
      { id: 'morninglight', constellation: 'habits', slot: 'morning' },
      { id: 'sleep8', constellation: 'habits', slot: 'evening' },
      { id: 'magnesium', constellation: 'supplements', slot: 'evening' },
      { id: 'glycine', constellation: 'supplements', slot: 'evening' },
      { id: 'apigenin', constellation: 'supplements', slot: 'evening' }
    ]
  },
  {
    id: 'foundation',
    name: 'Foundation',
    blurb: 'Five supplements with broad organ overlap.',
    items: [
      { id: 'omega3', constellation: 'supplements', slot: 'morning' },
      { id: 'vitd', constellation: 'supplements', slot: 'morning' },
      { id: 'vitk2', constellation: 'supplements', slot: 'morning' },
      { id: 'creatine', constellation: 'supplements', slot: 'morning' },
      { id: 'magnesium', constellation: 'supplements', slot: 'evening' }
    ]
  },
  {
    id: 'training',
    name: 'Train',
    blurb: 'Strength, zone 2, mobility, and recovery.',
    items: [
      { id: 'lift3x', constellation: 'exercises' },
      { id: 'zone2_base', constellation: 'exercises' },
      { id: 'mobility_15', constellation: 'exercises', slot: 'evening' },
      { id: 'sleep8', constellation: 'habits', slot: 'evening' },
      { id: 'creatine', constellation: 'supplements', slot: 'morning' },
      { id: 'protein150', constellation: 'habits' }
    ]
  },
  {
    id: 'plate',
    name: 'Plate',
    blurb: 'A small food set to cook from.',
    items: [
      { id: 'eggs', constellation: 'foods', slot: 'morning' },
      { id: 'olive-oil', constellation: 'foods' },
      { id: 'broccoli', constellation: 'foods' },
      { id: 'blueberries', constellation: 'foods' },
      { id: 'salmon', constellation: 'foods' },
      { id: 'sauerkraut', constellation: 'foods' }
    ]
  },
  {
    id: 'labs',
    name: 'First labs',
    blurb: 'Markers to look up. Not a diagnosis.',
    items: [
      { id: 'apob', constellation: 'biomarkers' },
      { id: 'hba1c', constellation: 'biomarkers' },
      { id: 'hs_crp', constellation: 'biomarkers' },
      { id: 'vit_d', constellation: 'biomarkers' },
      { id: 'omega3_index', constellation: 'biomarkers' },
      { id: 'ferritin', constellation: 'biomarkers' },
      { id: 'tsh', constellation: 'biomarkers' }
    ]
  }
];
