import { ImageResponse } from 'next/og';

/**
 * The 1200x630 social card used for og:image and twitter:image on every page.
 * Rendered at build time by app/opengraph-image.tsx and app/twitter-image.tsx.
 *
 * Uses the default font bundled with next/og so the build never fetches fonts
 * over the network.
 */

export const SOCIAL_CARD_SIZE = { width: 1200, height: 630 } as const;
export const SOCIAL_CARD_CONTENT_TYPE = 'image/png';
export const SOCIAL_CARD_ALT =
  'Sproutflow Studio: websites and follow-up systems for small businesses in New Orleans';

const PINE = '#223528';
const BIRCH = '#F4EFE3';
const GOLDENROD = '#D9A441';

export function renderSocialCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: PINE,
          color: BIRCH,
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: GOLDENROD }} />
          <div style={{ marginLeft: 20, fontSize: 28, letterSpacing: 4, textTransform: 'uppercase', color: GOLDENROD }}>
            New Orleans, Louisiana
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 104, lineHeight: 1.05, letterSpacing: -2 }}>Sproutflow Studio</div>
          <div style={{ marginTop: 28, width: 160, height: 8, backgroundColor: GOLDENROD }} />
          <div style={{ marginTop: 32, maxWidth: 940, fontSize: 44, lineHeight: 1.25, color: BIRCH, opacity: 0.86 }}>
            Websites and follow-up systems for small businesses in New Orleans
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: BIRCH, opacity: 0.6 }}>sproutflow-studio.com</div>
      </div>
    ),
    { ...SOCIAL_CARD_SIZE },
  );
}
