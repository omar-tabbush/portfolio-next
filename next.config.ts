import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Treat libsql as a server-only dependency so its node:fs/etc. references
  // never get pulled into client/edge bundles.
  serverExternalPackages: ["@libsql/client", "libsql"],
  experimental: {
    optimizePackageImports: ["drizzle-orm"],
  },
};

export default config;
