import Link from 'next/link';
import type { ReactNode } from 'react';
import { BOOKING_CTA_LABEL, INQUIRY_PATH, getBookingHref } from '@/lib/constants';

type BookCallLinkProps = {
  className?: string;
  children?: ReactNode;
  /** Identifies where the CTA lives on the site, for analytics. */
  'data-cta'?: string;
  /** Accessible name when the visible text is abbreviated (e.g. the mobile header pill). */
  'aria-label'?: string;
  /**
   * Query string (without `?`) added only when the link falls back to
   * /inquiry, so the form keeps its path prefill, e.g. `offer=audit`.
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
  const href = base === INQUIRY_PATH && inquiryQuery ? `${base}?${inquiryQuery}` : base;
  return (
    <Link href={href} className={className} data-cta={dataCta} aria-label={ariaLabel}>
      {children ?? BOOKING_CTA_LABEL}
    </Link>
  );
}

export default BookCallLink;
