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
      // /book handles disabled booking at request time and allowlists context.
      // Keep this out of config redirects so arbitrary query data is not forwarded.
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
