/**
 * Soft Free / Pro feature flags (client-side stub).
 *
 * No real payment backend — Pro is unlocked by a localStorage license key
 * stub (`aetheris-pro-key`). Soft limits warn but never hard-block.
 */

export const PRO_LICENSE_KEY = 'aetheris-pro-key';

/** Free-tier soft ceiling for My Stack size. Soft warning only — never hard-block adds. */
export const FREE_STACK_LIMIT = 15;

/** Placeholder checkout / pricing CTA — replace with Lemon Squeezy / Stripe Payment Link when live. */
export const PRICING_CHECKOUT_URL = '#pricing-coming-soon';

/** Feedback form placeholder — swap for Tally / Formspree URL when ready. */
export const FEEDBACK_FORM_URL = 'https://tally.so/r/wAetherisFeedbackPlaceholder';

/**
 * Whether Pro is unlocked. Stub: any non-empty localStorage value under PRO_LICENSE_KEY.
 * Future: validate against hosted checkout delivery / signed token.
 */
export function isPro() {
  try {
    const v = localStorage.getItem(PRO_LICENSE_KEY);
    return !!(v && String(v).trim());
  } catch {
    return false;
  }
}

/** Soft-set a license key (dev / founding buyers). Empty string clears Pro. */
export function setProKey(key) {
  try {
    const trimmed = key == null ? '' : String(key).trim();
    if (!trimmed) localStorage.removeItem(PRO_LICENSE_KEY);
    else localStorage.setItem(PRO_LICENSE_KEY, trimmed);
  } catch (e) {
    console.warn('[AETHERIS] setProKey failed', e);
  }
}

/** True when stack count is over the free soft limit and user is not Pro. */
export function isOverFreeStackLimit(count) {
  if (isPro()) return false;
  return Number(count) > FREE_STACK_LIMIT;
}

/** Soft gate helper: Pro-preferred features still work on Free with watermark/hint. */
export function softProGate(featureLabel = 'this feature') {
  if (isPro()) return { allowed: true, pro: true, hint: null };
  return {
    allowed: true, // soft — still allow
    pro: false,
    hint: `${featureLabel} is a Pro perk — Free works with limits. Checkout coming soon.`
  };
}

export const FeatureFlags = {
  FREE_STACK_LIMIT,
  PRO_LICENSE_KEY,
  PRICING_CHECKOUT_URL,
  FEEDBACK_FORM_URL,
  isPro,
  setProKey,
  isOverFreeStackLimit,
  softProGate
};

export default FeatureFlags;
