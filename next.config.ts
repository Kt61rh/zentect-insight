import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gpzegudgniimyhkbjngs.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
