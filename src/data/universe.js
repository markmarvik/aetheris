/** Merge every constellation into one selectable list. Ids stay unique. */

export function buildUniverse(packs) {
  const out = [];
  for (const [constellation, list] of packs) {
    if (!Array.isArray(list)) continue;
    for (const n of list) {
      if (!n || n.id == null) continue;
      out.push({
        ...n,
        id: `${constellation}::${n.id}`,
        _sourceId: String(n.id),
        _constellation: constellation,
        _topic: n.cat || '',
        cat: constellation
      });
    }
  }
  return out;
}
