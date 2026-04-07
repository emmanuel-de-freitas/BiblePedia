import { BrowserWindow } from "electrobun/bun";

// Determine if we're in development mode
const isDev = Bun.env.NODE_ENV !== "production";

// Base URL configuration
const DEV_URL = Bun.env["VITE_DEV_SERVER_URL"] || "http://localhost:5173";
const PROD_URL = "app://index.html"; // Production build path

const BASE_URL = isDev ? DEV_URL : PROD_URL;

console.log("🚀 Starting BiblePedia Desktop App");
console.log(`📍 Environment: ${isDev ? "Development" : "Production"}`);
console.log(`🌐 Base URL: ${BASE_URL}`);

// Top-level routes identified from apps/web/src/routes
const topLevelRoutes = [
	{ name: "Dashboard", path: "/dashboard" },
	// { name: "Bible", path: "/bible" },
	// { name: "Root", path: "/" },
];

// Function to check if dev server is ready
async function waitForDevServer(url: string, maxRetries = 10): Promise<boolean> {
	console.log(`\n🔍 Checking dev server at ${url}...`);

	for (let i = 0; i < maxRetries; i++) {
		try {
			const response = await fetch(url);
			if (response.ok || response.status === 404) {
				// 404 is ok, server is running
				console.log("✓ Dev server is ready!\n");
				return true;
			}
		} catch (error) {
			console.log(`⏳ Waiting for dev server... (${i + 1}/${maxRetries})`);
			await Bun.sleep(1000);
		}
	}

	console.warn("⚠️  Dev server not responding after 10 retries");
	console.warn("⚠️  Make sure the web app is running: cd apps/web && bun run dev\n");
	return false;
}

// Main initialization
async function initializeApp() {
	try {
		// In development, wait for Vite dev server to be ready
		if (isDev) {
			console.log("🔥 Development mode: Hot reload enabled");
			const serverReady = await waitForDevServer(DEV_URL);

			if (!serverReady) {
				console.error("❌ Cannot start without dev server in development mode");
				console.log("💡 Run this first: cd apps/web && bun run dev");
				process.exit(1);
			}
		} else {
			console.log("🚀 Production mode");
		}

		console.log("🪟 Creating windows...\n");

		// Open a window for each top-level route
		for (const [index, route] of topLevelRoutes.entries()) {
			const offset = index * 30;
			const windowUrl = `${BASE_URL}${route.path}`;

			console.log(`  Creating window: ${route.name}`);
			console.log(`  URL: ${windowUrl}`);

			try {
				const window = new BrowserWindow({
					title: `BiblePedia - ${route.name}`,
					url: windowUrl,
					hidden: false,
					frame: {
						width: 1200,
						height: 800,
						x: 100 + offset,
						y: 100 + offset,
					},
				});

				// Show the window (windows are hidden by default)
				window.show();

				console.log("  ✓ Window created and shown successfully\n");
			} catch (error) {
				console.error("  ✗ Failed to create window:", error);
				console.error(`  Route: ${route.name}, URL: ${windowUrl}\n`);
			}
		}

		console.log("✨ BiblePedia Desktop started successfully!\n");

		if (isDev) {
			console.log("💡 Development Tips:");
			console.log("  - Changes to React components will hot reload automatically");
			console.log("  - Changes to this file will restart the app");
			console.log("  - Press Cmd+R in a window to manually reload");
			console.log("");
		}
	} catch (error) {
		console.error("❌ Failed to initialize app:", error);
		throw error;
	}
}

// Start the app
console.log("=".repeat(60));
initializeApp().catch((error) => {
	console.error("\n❌ Fatal error:", error);
	console.error("\n📋 Troubleshooting:");
	console.error("  1. Check if Vite dev server is running (apps/web)");
	console.error("  2. Verify electrobun is installed: bun install");
	console.error("  3. Check the console output above for specific errors");
	console.error("");
	process.exit(1);
});
