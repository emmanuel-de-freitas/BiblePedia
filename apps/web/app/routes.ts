import { index, layout, prefix, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	...prefix("dashboard", [
		layout("./layouts/dashboard.tsx", [
			index("./features/dashboard/route.tsx"),
			route("library", "./features/library/route.tsx"),
			route("citations", "./features/citations/route.tsx"),
		]),
	]),
] satisfies RouteConfig;
