"use client";

import { useLocale } from "@heroui/react";
import { Provider as SpectrumProvider } from "@react-spectrum/s2";
import { Provider as JotaiProvider } from "jotai";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import myStore from "@/atoms/store";
import useTheme from "@/hooks/useTheme";

interface ProvidersProps {
	children: ReactNode;
	locale?: string;
}

// Configure the type of the `routerOptions` prop on all React Spectrum components.
declare module "@react-spectrum/s2" {
	interface RouterConfig {
		routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
	}
}

export function Provider({ children }: ProvidersProps) {
	const router = useRouter();
	const preferredLanguage = useLocale();

	return (
		<JotaiProvider store={myStore}>
			<SpectrumProvider
				background="layer-2"
				locale={preferredLanguage.locale}
				router={{ navigate: router.push }}
			>
				<ThemeProvider attribute="class">{children}</ThemeProvider>
			</SpectrumProvider>
		</JotaiProvider>
	);
}
