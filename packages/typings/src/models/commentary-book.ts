import type { Tables, TablesInsert, TablesUpdate } from "./database";

export type CommentaryBook = Tables<"CommentaryBook">;
export type CommentaryBookInsert = TablesInsert<"CommentaryBook">;
export type CommentaryBookUpdate = TablesUpdate<"CommentaryBook">;
