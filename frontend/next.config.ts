import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "media.licdn.com",
      "noobsverse-cdn-public.s3.ap-south-1.amazonaws.com",
      "assets.softr-files.com",
      "img.icons8.com",
    ],
  },
};

export default nextConfig;
