import { atom } from "jotai";
import type { Book } from "@/types";
import myStore from "./store";

export const booksAtom = atom<Book[]>([]);
myStore.set(booksAtom, []);
