import { BrowserWindow } from "electrobun";
import type { TWindow } from "../types";
import { waitForDevServer } from "./check";
import { BASE_URL, DEV_URL } from "./constant";


// Main initialization
async function initializeApp(routes: TWindow[], isDev: boolean) {
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
		for (const [index, route] of routes.entries()) {
			const offset = index * 30;
			const windowUrl = `${BASE_URL}${route.path}`;

			console.log(`  Creating window: ${route.name}`);
			console.log(`  URL: ${windowUrl}`);

			try {
				const window = new BrowserWindow({
					title: `BiblePedia - ${route.name}`,
					url: windowUrl,
					titleBarStyle: "hiddenInset",
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

export { initializeApp };
