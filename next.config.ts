import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "station-images-prod.radio-assets.com"
      }
    ]
  }
};

export default nextConfig;
