import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable webpack's "managed paths" optimization so dynamically written
      // files (generated builds copied at request time) are always re-checked
      config.snapshot = {
        ...config.snapshot,
        managedPaths: [],
      };
    }
    return config;
  },
};

export default nextConfig;
