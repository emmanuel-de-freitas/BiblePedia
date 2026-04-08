import { BASE_URL, initializeApp, isDev, topLevelRoutes } from "../utils";

console.log("🚀 Starting BiblePedia Desktop App");
console.log(`📍 Environment: ${isDev ? "Development" : "Production"}`);
console.log(`🌐 Base URL: ${BASE_URL}`);

initializeApp(topLevelRoutes, isDev)
	.then(() => console.log("✅ server started..."))
	.catch(error => console.log(`error starting the server ${error}`))
