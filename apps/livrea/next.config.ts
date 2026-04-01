import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Match existing Tauri config frontendDist path
  distDir: "build",

  // Environment variables to expose
  env: {
    // Add any public env vars here
  },

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Static export for Tauri desktop app
  output: "export",

  // Trailing slash for better static file serving
  trailingSlash: true,

  // Transpile workspace packages
  transpilePackages: ["@heroui/react", "@heroui/styles"],

  // Enable typed routes
  typedRoutes: true,

  // Skip type checking during build (handled separately)
  typescript: {
    // Enable type checking in CI, skip locally for faster builds
    ignoreBuildErrors: process.env.CI !== "true",
  },
};

export default nextConfig;
