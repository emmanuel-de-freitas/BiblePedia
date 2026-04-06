import { BrowserWindow } from "electrobun/bun";

// Base URL for the web app (Vite dev server)
const BASE_URL = "http://localhost:5173";

// Top-level routes identified from apps/web/src/routes
const topLevelRoutes = [
//	{ name: "Root", path: "/" },
	{ name: "Dashboard", path: "/dashboard" },
//	{ name: "Bible", path: "/bible" },
];

// Open a window for each top-level route
topLevelRoutes.forEach((route, index) => {
	const offset = index * 30;
	new BrowserWindow({
		title: `Livrea - ${route.name}`,
    url: `${BASE_URL}${route.path}`,
    titleBarStyle: "hiddenInset",
    styleMask: {

    },
    navigationRules: "",
		frame: {
			width: 1024,
			height: 768,
			x: 100 + offset,
			y: 100 + offset,
		},
	});
});

console.log("Livrea Desktop started with top-level route windows!");
