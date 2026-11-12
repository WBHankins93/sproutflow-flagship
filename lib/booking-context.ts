const paths = ['websites', 'business-systems', 'growth-support'];
const tiers = ['website-rescue', 'lead-flow-audit', 'lead-capture-system', 'system-care'];

/** Carry only known service selections; never forward arbitrary visitor query data. */
export function bookingContextQuery(input: string | Record<string, string | string[] | undefined>): string {
  const params = typeof input === 'string' ? new URLSearchParams(input) : null;
  const result = new URLSearchParams();
  for (const [key, allowed] of [['path', paths], ['tier', tiers]] as const) {
    const value = params ? (params.getAll(key).length === 1 ? params.get(key) : undefined) : (input as Record<string, string | string[] | undefined>)[key];
    if (typeof value === 'string' && allowed.includes(value)) result.set(key, value);
  }
  return result.toString();
}

export function withBookingContext(href: string, query: string): string {
  const safeQuery = bookingContextQuery(query);
  return safeQuery ? `${href}?${safeQuery}` : href;
}

/** Human-readable context comes from known copy, never raw query text. */
export function bookingContextLabel(query: string): string | undefined {
  const context = new URLSearchParams(bookingContextQuery(query));
  const labels: Record<string, string> = {
    websites: 'your website',
    'business-systems': 'your lead flow',
    'growth-support': 'ongoing support',
    'website-rescue': 'Website Rescue',
    'lead-flow-audit': 'a Lead Flow Audit',
    'lead-capture-system': 'a Lead Capture System',
    'system-care': 'System Care',
  };
  return labels[context.get('tier') || context.get('path') || ''];
}
