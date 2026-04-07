"use client";

import useTheme from "@/hooks/useTheme";
import "./globals.css";
import { Provider } from "./provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const {} = useTheme();

	return (
		<html suppressHydrationWarning>
			<body>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
