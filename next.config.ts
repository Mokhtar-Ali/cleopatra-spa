import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.cdn.filesafe.space',
      },
      {
        protocol: 'https',
        hostname: 'pub-ec6b76c0eef842d1bd7d65492c044988.r2.dev',
      },
    ],
  },
};

export default nextConfig;
