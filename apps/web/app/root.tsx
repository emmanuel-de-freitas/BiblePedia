// app/root.tsx
import "./global.css";

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import { Provider } from "@/components/provider";

export default function App() {
	return (
		<Provider>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
			</body>
		</Provider>
	);
}

// export default function App() {
//   return <Outlet />;
// }
