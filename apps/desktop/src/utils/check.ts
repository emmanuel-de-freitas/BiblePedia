
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
			console.log(`error: ${error}`)
			console.log(`⏳ Waiting for dev server... (${i + 1}/${maxRetries})`);
		}
	}

	console.warn("⚠️  Dev server not responding after 10 retries");
	console.warn("⚠️  Make sure the web app is running: cd apps/web && bun run dev\n");
	return false;
}

export { waitForDevServer };

