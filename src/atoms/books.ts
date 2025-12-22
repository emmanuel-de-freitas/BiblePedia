import { atom } from "jotai";
import type { Book } from "@/types";

export const booksAtom = atom<Book[]>([]);
