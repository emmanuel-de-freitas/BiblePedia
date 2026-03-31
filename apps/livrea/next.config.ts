import type {NextConfig} from "next";
import macros from "unplugin-parcel-macros";

// Create the Next.js configuration object
const plugin = macros.webpack();

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

   // Transpile workspace packages and S2
   transpilePackages: ["@biblepedia/ui"],

   turbopack: {},

   typedRoutes: true,

   // Skip type checking during build (handled separately)
   typescript: {
      // Enable type checking in CI, skip locally for faster builds
      ignoreBuildErrors: process.env.CI !== "true",
   },

   // Webpack configuration for production builds
   webpack: (config, { isServer }) => {
      // Add unplugin-parcel-macros for handling S2 style macros
      config.plugins.push(plugin);
      // Handle the `with { type: "macro" }` import attributes
      // This is needed for @react-spectrum/s2/style macro imports
      // config.module.rules.push({
      //    test: /\.(js|jsx|ts|tsx)$/,
      //    use: [
      //       {
      //          loader: "unplugin-parcel-macros",
      //          options: {},
      //       },
      //    ],
      // });

      // Bundle all S2 and style-macro generated CSS together
      // Atomic CSS has significant overlap, so bundling reduces duplication
      // Because atomic CSS has so much overlap between components, loading all CSS up front results in
      // smaller bundles instead of producing duplication between pages.
      config.optimization.splitChunks ||= {};
      config.optimization.splitChunks.cacheGroups ||= {};
      config.optimization.splitChunks.cacheGroups.s2 = {
         chunks: "all" as const,
         enforce: true,
         name: "s2-styles",
         test: (module: { type: string; identifier: () => string | string[] }) => {
            return (
               (module.type === "css/mini-extract" && module.identifier().includes("@react-spectrum/s2")) ||
               /macro-(.*?)\.css/.test(<string>module.identifier())
            );
         },
      };

      return config;
   },
};

export default nextConfig;
