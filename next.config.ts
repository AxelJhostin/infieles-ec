import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com', // Le damos permiso a Dicebear
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;