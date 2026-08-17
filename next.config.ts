import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/black-label",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
