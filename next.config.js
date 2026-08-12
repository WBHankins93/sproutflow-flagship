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
