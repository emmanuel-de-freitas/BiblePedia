import {invoke} from "@tauri-apps/api/core";
import {listen} from "@tauri-apps/api/event";

import {getCurrentWindow} from "@tauri-apps/api/window";
import {useCallback, useEffect, useMemo, useState} from "react";

/**
 * A function that provides theme-related properties for styling components.
 *
 * @function
 * @name useTheme
 * @returns {Object} An object containing theme-specific properties.
 * @property {string} backgroundColor - Specifies the background color setting for the theme.
 * @property {string} width - Specifies the width setting, typically defining the layout's width behavior.
 */
type ThemeKind = "light" | "dark";
type ThemeMode = "light" | "dark" | "dynamic";

export const useTheme = () => {
   const [mode, setMode] = useState<ThemeMode>("dynamic");
   const [theme, setTheme] = useState<ThemeKind>("light");

   // Helper: read the current window theme (Tauri API) as a fallback/bootstrap
   const readWindowTheme = useCallback(async () => {
      try {
         const t = await getCurrentWindow().theme();
         // getCurrentWindow().theme() returns "light" | "dark" | null
         if (t === "light" || t === "dark") setTheme(t);
      } catch (_) {
         // ignore
      }
   }, []);

   // Initialize from backend commands and subscribe to theme-changed events
   useEffect(() => {
      let unlisten: (() => void) | undefined;

      // Bootstrap: ask backend for current mode and theme
      (async () => {
         await readWindowTheme();
         try {
            const m = await invoke<ThemeMode>("get_theme_mode");
            setMode(m);
         } catch (_) {}
         try {
            const t = await invoke<ThemeKind>("get_current_theme");
            setTheme(t);
         } catch (_) {}
      })();

      // Subscribe to theme changes from the backend
      listen<{ mode: ThemeMode; theme: ThemeKind }>("theme-changed", (event) => {
         const payload = event.payload;
         if (!payload) return;
         setMode(payload.mode);
         setTheme(payload.theme);
      }).then((off) => {
         unlisten = off;
      });

      return () => {
         if (unlisten) unlisten();
      };
   }, [readWindowTheme]);

   // Command to change mode
   const setThemeMode = useCallback(async (newMode: ThemeMode) => {
      await invoke("set_theme_mode", { mode: newMode });
      // The backend will emit an event we listen to; optimistic update for snappy UI
      setMode(newMode);
      if (newMode === "light" || newMode === "dark") setTheme(newMode);
   }, []);

   const isDark = useMemo(() => theme === "dark", [theme]);

   return {
      isDark,
      // state
      mode,
      // commands
      setThemeMode,
      theme,
   };
};

export default useTheme;
