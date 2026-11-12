import { availability } from '@/data/availability';

/** Site-wide availability line above the header (weekend mode). Remove from app/layout.tsx to turn it off. */
export default function AvailabilityNotice() {
  return (
    <div role="note" aria-label="Availability" className="bg-primary-900 text-cream-300" data-availability-notice>
      <p className="mx-auto w-full max-w-container-wide px-4 py-2 text-center font-body text-body-sm sm:px-8 lg:px-12">
        {availability.notice}
      </p>
    </div>
  );
}
