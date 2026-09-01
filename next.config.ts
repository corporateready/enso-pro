import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Opening the dev server from a phone means requesting it by LAN address, and
  // Next blocks cross-origin dev assets by default: the client chunks come back
  // 403, so nothing hydrates and the hero sits on its spinner. Trusting the
  // local subnet keeps device testing working. Dev only — builds ignore this.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.16.*.*", "*.local"],
  images: {
    qualities: [75, 100],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
