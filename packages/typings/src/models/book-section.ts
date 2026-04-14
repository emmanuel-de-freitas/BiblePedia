import type { BookSectionType, Tables, TablesInsert, TablesUpdate } from "./database";

export type BookSection = Tables<"book_sections">;
export type BookSectionInsert = TablesInsert<"book_sections">;
export type BookSectionUpdate = TablesUpdate<"book_sections">;

export type { BookSectionType };
