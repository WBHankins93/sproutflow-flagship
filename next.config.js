/** Mirrors getCalLink() in lib/constants.ts: unset means the default link. */
function isBookingOff(value) {
  if (value === undefined) return false;
  const trimmed = value.trim().toLowerCase();
  return trimmed === '' || trimmed === 'off';
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/how-we-work',
        destination: '/#process',
        permanent: true,
      },
      {
        source: '/case-studies',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/how-we-handle-your-data',
        destination: '/data-and-ownership',
        permanent: true,
      },
      // When booking is turned off (NEXT_PUBLIC_CAL_LINK set to `off` or blank;
      // unset uses the default link in lib/constants.ts), /book has nothing to
      // show. app/book/page.tsx also redirects, but a statically prerendered
      // redirect() is served as a 200 with a meta refresh; this makes it a
      // real temporary redirect.
      ...(isBookingOff(process.env.NEXT_PUBLIC_CAL_LINK)
        ? [{ source: '/book', destination: '/inquiry', permanent: false }]
        : []),
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vercel-storage.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
