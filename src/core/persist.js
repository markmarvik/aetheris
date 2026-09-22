/**
 * localStorage helpers that copy a legacy Aetheris key into the StackMap key
 * on first read, so existing browsers keep My Stack, Pro, and personal data.
 */

export function readStorage(key, legacyKeys = []) {
  try {
    const current = localStorage.getItem(key);
    if (current != null) return current;
    for (const oldKey of legacyKeys) {
      const legacy = localStorage.getItem(oldKey);
      if (legacy != null) {
        try { localStorage.setItem(key, legacy); } catch { /* quota / private mode */ }
        return legacy;
      }
    }
  } catch { /* private mode */ }
  return null;
}

export function writeStorage(key, value) {
  try {
    if (value == null || value === '') localStorage.removeItem(key);
    else localStorage.setItem(key, String(value));
  } catch { /* quota / private mode */ }
}

export function removeStorage(keys) {
  for (const key of keys) {
    try { localStorage.removeItem(key); } catch { /* ignore */ }
  }
}
