import type { LibraryBookCategory, LibraryBookSourceType, Tables, TablesInsert, TablesUpdate } from "./database";

export type LibraryBook = Tables<"library_books">;
export type LibraryBookInsert = TablesInsert<"library_books">;
export type LibraryBookUpdate = TablesUpdate<"library_books">;

export type { LibraryBookCategory, LibraryBookSourceType };
