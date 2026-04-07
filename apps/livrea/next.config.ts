import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const internalHost = process.env.TAURI_DEV_HOST || "localhost";

const nextConfig: NextConfig = {
	// Ensure Next.js uses SSG instead of SSR
	// https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
	output: "export",
	// Note: This feature is required to use the Next.js Image component in SSG mode.
	// See https://nextjs.org/docs/messages/export-image-api for different workarounds.
	images: {
		unoptimized: true,
	},
	// Configure assetPrefix or else the server won't properly resolve your assets.
	assetPrefix: isProd ? undefined : `http://${internalHost}:3000`,

	// Trailing slash for better static file serving
	trailingSlash: true,

	// Transpile workspace packages
	transpilePackages: [
		"@heroui/react",
		"@heroui/styles",
		"@react-spectrum/s2",
		"@uidotdev/usehooks",
	],

	// SVG loader configuration for Turbopack (used in both dev and prod with --turbopack)
	turbopack: {
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js",
			},
		},
	},

	// Enable typed routes
	typedRoutes: true,

	// Skip type checking during build (handled separately)
	typescript: {
		// Enable type checking in CI, skip locally for faster builds
		ignoreBuildErrors: process.env.CI !== "true",
	},
};

export default nextConfig;
