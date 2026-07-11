import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ["172.16.0.2", "localhost:3000"],
};

export default nextConfig;
