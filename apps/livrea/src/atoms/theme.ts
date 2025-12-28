import type {Theme} from "@tauri-apps/api/window";
import {atom} from "jotai";

export const theme = atom<Theme | "system">("system");
