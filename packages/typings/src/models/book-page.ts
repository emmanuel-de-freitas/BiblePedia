import type { Tables, TablesInsert, TablesUpdate } from "./database";

export type BookPage = Tables<"book_pages">;
export type BookPageInsert = TablesInsert<"book_pages">;
export type BookPageUpdate = TablesUpdate<"book_pages">;
