/** Longest address the field accepts from a `?url=` link. Longer values are dropped, not cut. */
export const MAX_PREFILL_LENGTH = 2048;

/**
 * Cleans a `/check?url=` value for the website field: first value only,
 * control characters removed, trimmed. It only fills the field; the check
 * itself still waits for the visitor to press the button, and the usual
 * validation runs then.
 */
export function prefillFromQuery(value: string | string[] | undefined): string {
  const first = Array.isArray(value) ? value[0] : value;
  if (typeof first !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  const cleaned = first.replace(/[\u0000-\u001F\u007F]/g, '').trim();
  return cleaned.length > MAX_PREFILL_LENGTH ? '' : cleaned;
}
