/**
 * Lightweight analytics helper.
 *
 * Default: no-op / console debug. Drop a Plausible (or GA4) script in index.html
 * where marked, then optionally forward events from track().
 *
 * Do NOT invent traffic numbers — this only emits events you choose to listen to.
 *
 * Plausible drop-in (comment in index.html <head>):
 *   <script defer data-domain="markmarvik.github.io" src="https://plausible.io/js/script.js"></script>
 */

const DEBUG =
  typeof localStorage !== 'undefined' &&
  (() => {
    try {
      return localStorage.getItem('aetheris-analytics-debug') === '1';
    } catch {
      return false;
    }
  })();

/**
 * Track a named event with optional props.
 * @param {string} event
 * @param {Record<string, unknown>} [props]
 */
export function track(event, props = {}) {
  if (!event) return;
  try {
    // Hook for real analytics: window.plausible?.(event, { props })
    if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
      window.plausible(event, { props });
      return;
    }
  } catch {
    /* non-fatal */
  }
  if (DEBUG) {
    console.debug('[AETHERIS:track]', event, props);
  }
}

/** Page-load / boot ping (call once). */
export function trackPageView() {
  track('pageview', { path: typeof location !== 'undefined' ? location.pathname : '/' });
}

/** Constellation switch hook. */
export function trackConstellation(type) {
  track('constellation_switch', { constellation: String(type || '') });
}

export default { track, trackPageView, trackConstellation };
