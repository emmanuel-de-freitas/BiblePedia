import { useCallback, useEffect, useMemo, useState } from "react";
import { BrowserWindow } from "electrobun/bun";
/**
 * A hook that provides theme-related properties for styling components.
 *
 * @function
 * @name useTheme
 * @returns {Object} An object containing theme-specific properties.
 * @property {boolean} isDark - Whether the current theme is dark mode.
 * @property {ThemeMode} mode - The current theme mode (light, dark, or dynamic).
 * @property {ThemeKind} theme - The current theme kind (light or dark).
 * @property {Function} setThemeMode - Function to change the theme mode.
 */
type ThemeKind = "light" | "dark";
type ThemeMode = "light" | "dark" | "dynamic";

export const useTheme = () => {
  const [mode, setMode] = useState<ThemeMode>("dynamic");
  const [theme, setTheme] = useState<ThemeKind>("light");
  const [isMounted, setIsMounted] = useState(false);

  // Helper: read the current window theme (Tauri API) as a fallback/bootstrap
  const readWindowTheme = useCallback(async () => {
    if (typeof window === "undefined") return;

    try {
      BrowserWindow.getById
      const t = await getCurrentWindow().theme();
      // getCurrentWindow().theme() returns "light" | "dark" | null
      if (t === "light" || t === "dark") setTheme(t);
    } catch (_) {
      // Tauri APIs not available or error - ignore
    }
  }, []);

  // Initialize from backend commands and subscribe to theme-changed events
  useEffect(() => {
    setIsMounted(true);

    // Only run on client side
    if (typeof window === "undefined") return;

    let unlisten: (() => void) | undefined;
    let isCancelled = false;

    const initTheme = async () => {
      // Bootstrap: ask backend for current mode and theme
      await readWindowTheme();

      try {
        const { invoke } = await import("@tauri-apps/api/core");

        try {
          const m = await invoke<ThemeMode>("get_theme_mode");
          if (!isCancelled) setMode(m);
        } catch (_) {
          // Command not available
        }

        try {
          const t = await invoke<ThemeKind>("get_current_theme");
          if (!isCancelled) setTheme(t);
        } catch (_) {
          // Command not available
        }
      } catch (_) {
        // Tauri core not available
      }

      // Subscribe to theme changes from the backend
      try {
        const { listen } = await import("@tauri-apps/api/event");
        const off = await listen<{ mode: ThemeMode; theme: ThemeKind }>(
          "theme-changed",
          (event) => {
            const payload = event.payload;
            if (!payload || isCancelled) return;
            setMode(payload.mode);
            setTheme(payload.theme);
          }
        );
        unlisten = off;
      } catch (_) {
        // Tauri events not available
      }
    };

    initTheme();

    return () => {
      isCancelled = true;
      if (unlisten) unlisten();
    };
  }, [readWindowTheme]);

  // Command to change mode
  const setThemeMode = useCallback(async (newMode: ThemeMode) => {
    if (typeof window === "undefined") return;

    try {
      const { invoke } = await import("@tauri-apps/api/core");
      await invoke("set_theme_mode", { mode: newMode });
      // The backend will emit an event we listen to; optimistic update for snappy UI
      setMode(newMode);
      if (newMode === "light" || newMode === "dark") setTheme(newMode);
    } catch (_) {
      // Tauri not available - just update local state
      setMode(newMode);
      if (newMode === "light" || newMode === "dark") setTheme(newMode);
    }
  }, []);

  const isDark = useMemo(() => theme === "dark", [theme]);

  return {
    isDark,
    isMounted,
    // state
    mode,
    // commands
    setThemeMode,
    theme,
  };
};

export default useTheme;
