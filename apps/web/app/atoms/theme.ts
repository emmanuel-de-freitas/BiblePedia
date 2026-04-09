import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { TOption } from "@/types";

export type ThemeKind = "light" | "dark";

export const themeModeAtom = atomWithStorage<TOption>("theme-mode", "system");
export const themeAtom = atomWithStorage<ThemeKind>("theme", "light");
export const isDarkAtom = atom((get) => get(themeAtom) === "dark");

// Backward-compatible alias for existing imports.
export const theme = themeModeAtom;
