import { atom } from "jotai";
import type { TOption } from "@/types";

export const theme = atom<TOption | "system">("system");
