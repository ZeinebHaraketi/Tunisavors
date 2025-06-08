import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http',
  //       hostname: 'localhost',
  //       pathname: '/images/*',
  //     },
  //   ],
  // },

  images: {
    domains: ['localhost', 'ik.imagekit.io',], // For remote images
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/images/*',
      },
    ],
  },

  /* config options here */
};

export default nextConfig;
