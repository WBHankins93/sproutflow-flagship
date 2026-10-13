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
      // Until Cal.com is configured, /book has nothing to show. app/book/page.tsx
      // also redirects, but a statically prerendered redirect() is served as a
      // 200 with a meta refresh; this makes it a real temporary redirect.
      ...(process.env.NEXT_PUBLIC_CAL_LINK?.trim()
        ? []
        : [{ source: '/book', destination: '/inquiry', permanent: false }]),
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
