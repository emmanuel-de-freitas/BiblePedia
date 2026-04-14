import type { Tables, TablesInsert, TablesUpdate } from "./database";

export type Dictionary = Tables<"Dictionary">;
export type DictionaryInsert = TablesInsert<"Dictionary">;
export type DictionaryUpdate = TablesUpdate<"Dictionary">;
