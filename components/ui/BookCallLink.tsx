import Link from 'next/link';
import type { ReactNode } from 'react';
import { withBookingContext } from '@/lib/booking-context';
import { BOOKING_CTA_LABEL, getBookingHref } from '@/lib/constants';

type BookCallLinkProps = {
  className?: string;
  children?: ReactNode;
  /** Identifies where the CTA lives on the site, for analytics. */
  'data-cta'?: string;
  /** Accessible name when the visible text is abbreviated (e.g. the mobile header pill). */
  'aria-label'?: string;
  /**
   * Service query (without `?`) preserved through booking and inquiry,
   * e.g. `tier=lead-flow-audit`. Unknown fields and values are discarded.
   */
  inquiryQuery?: string;
};

/**
 * Booking CTA link. Points at /book when Cal.com is configured and falls back
 * to /inquiry otherwise. No hooks, so it works in server and client components.
 */
export function BookCallLink({
  className,
  children,
  'data-cta': dataCta,
  'aria-label': ariaLabel,
  inquiryQuery,
}: BookCallLinkProps) {
  const base = getBookingHref();
  const href = withBookingContext(base, inquiryQuery ?? '');
  return (
    <Link href={href} className={className} data-cta={dataCta} aria-label={ariaLabel}>
      {children ?? BOOKING_CTA_LABEL}
    </Link>
  );
}

export default BookCallLink;
