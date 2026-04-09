import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { type ThemeKind, themeAtom, themeModeAtom } from "@/atoms/theme";

/**
 * A hook that provides theme-related properties for styling components.
 *
 * @function
 * @name useTheme
 * @returns {Object} An object containing theme-specific properties.
 * @property {boolean} isDark - Whether the current theme is dark mode.
 * @property {ThemeMode} mode - The current theme mode (light, dark, or system).
 * @property {ThemeKind} theme - The current theme kind (light or dark).
 * @property {Function} setThemeMode - Function to change the theme mode.
 */
type ThemeMode = "light" | "dark" | "system";

const THEME_MEDIA_QUERY = "(prefers-color-scheme: dark)";

export const getSystemTheme = (): ThemeKind => {
	if (typeof window === "undefined") return "light";

	return window.matchMedia(THEME_MEDIA_QUERY).matches ? "dark" : "light";
};

const applyThemeClass = (nextTheme: ThemeKind) => {
	if (typeof document === "undefined") return;

	document.documentElement.classList.toggle("dark", nextTheme === "dark");
	document.documentElement.style.colorScheme = nextTheme;
};

export const useTheme = () => {
	const [mode, setMode] = useAtom(themeModeAtom);
	const [theme, setTheme] = useAtom(themeAtom);
	const [isMounted, setIsMounted] = useState(false);
	const [systemTheme, setSystemTheme] = useState<ThemeKind>("light");

	useEffect(() => {
		if (typeof window === "undefined") return;

		setIsMounted(true);

		const mediaQuery = window.matchMedia(THEME_MEDIA_QUERY);

		const syncSystemTheme = (matches: boolean) => {
			setSystemTheme(matches ? "dark" : "light");
		};

		syncSystemTheme(mediaQuery.matches);

		const handleChange = (event: MediaQueryListEvent) => {
			syncSystemTheme(event.matches);
		};

		if (typeof mediaQuery.addEventListener === "function") {
			mediaQuery.addEventListener("change", handleChange);
		} else {
			mediaQuery.addListener(handleChange);
		}

		return () => {
			if (typeof mediaQuery.removeEventListener === "function") {
				mediaQuery.removeEventListener("change", handleChange);
			} else {
				mediaQuery.removeListener(handleChange);
			}
		};
	}, []);

	useEffect(() => {
		const resolvedTheme = mode === "system" ? systemTheme : mode;

		if (theme !== resolvedTheme) {
			setTheme(resolvedTheme);
		}

		applyThemeClass(resolvedTheme);
	}, [mode, setTheme, systemTheme, theme]);

	const setThemeMode = (newMode: ThemeMode) => {
		setMode(newMode);
	};

	return {
		isDark: theme === "dark",
		isMounted,
		mode,
		setThemeMode,
		theme,
	};
};

export default useTheme;
