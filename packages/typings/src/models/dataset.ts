import type { Tables, TablesInsert, TablesUpdate } from "./database";

export type Dataset = Tables<"Dataset">;
export type DatasetInsert = TablesInsert<"Dataset">;
export type DatasetUpdate = TablesUpdate<"Dataset">;
