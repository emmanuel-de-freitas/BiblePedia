import type { Tables, TablesInsert, TablesUpdate } from "./database";

export type BibleChapter = Tables<"BibleChapter">;
export type BibleChapterInsert = TablesInsert<"BibleChapter">;
export type BibleChapterUpdate = TablesUpdate<"BibleChapter">;
