import type { Tables, TablesInsert, TablesUpdate } from "./database";

export type BibleBook = Tables<"BibleBook">;
export type BibleBookInsert = TablesInsert<"BibleBook">;
export type BibleBookUpdate = TablesUpdate<"BibleBook">;
