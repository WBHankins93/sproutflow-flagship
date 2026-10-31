'use client';

import { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';

type CalEmbedProps = {
  /** Cal.com link path, for example `sproutflow/15min`. */
  calLink: string;
};

const NAMESPACE = 'book-call';
// Sunlit forest Pine. The embed is light-only and sets no secondary colour.
const BRAND_COLOR = '#223528';

/**
 * Inline Cal.com scheduler in month view with the light theme. A plain link to
 * the public booking page sits below it in case the embed fails to load.
 */
export function CalEmbed({ calLink }: CalEmbedProps) {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      if (cancelled) return;
      cal('ui', {
        theme: 'light',
        layout: 'month_view',
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: { 'cal-brand': BRAND_COLOR },
          dark: { 'cal-brand': BRAND_COLOR },
        },
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const publicUrl = `https://cal.com/${calLink}`;

  return (
    <div className="w-full">
      <Cal
        namespace={NAMESPACE}
        calLink={calLink}
        className="w-full min-h-[640px] overflow-hidden"
        style={{ width: '100%', minHeight: 640 }}
        config={{ layout: 'month_view', theme: 'light' }}
      />
      <p className="mt-4 text-sm text-text-secondary">
        Trouble loading the calendar?{' '}
        <a
          href={publicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary-900 underline underline-offset-4"
        >
          Open it on Cal.com
        </a>
      </p>
    </div>
  );
}

export default CalEmbed;
