import type { TWindow } from "../types";

// Top-level routes identified from apps/web/src/routes
const topLevelRoutes: TWindow[] = [
	{ name: "Dashboard", path: "/dashboard" }
];

const isDev = process.env.NODE_ENV !== "production";

// Base URL configuration
const DEV_URL = process.env.VITE_DEV_SERVER_URL || "http://localhost:5173";
const PROD_URL = "app://index.html"; // Production build path

const BASE_URL = isDev ? DEV_URL : PROD_URL;

export { BASE_URL, DEV_URL, isDev, PROD_URL, topLevelRoutes };
