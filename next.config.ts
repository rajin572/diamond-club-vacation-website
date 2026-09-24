import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Lets the dev server accept requests when opened via the machine's LAN IP
  // (e.g. testing on a phone/tablet on the same network) instead of only localhost.
  allowedDevOrigins: ["127.0.0.1", "localhost", "10.10.28.44"],
};

export default nextConfig;
