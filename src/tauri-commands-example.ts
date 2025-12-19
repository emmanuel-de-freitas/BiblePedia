// Example usage of Tauri commands for EPUB management
// This file demonstrates how to call the Rust backend from your frontend

import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

// ============================================================================
// Type Definitions
// ============================================================================

interface EpubMetadata {
  title: string | null;
  author: string | null;
  publisher: string | null;
  description: string | null;
  language: string | null;
  isbn: string | null;
  publication_date: string | null;
  cover_path: string | null;
  file_path: string;
}

interface ProgressUpdate {
  stage: string;
  progress: number;
  message: string;
}

interface ExtractionResult {
  success: boolean;
  metadata: EpubMetadata | null;
  error: string | null;
}

interface Book {
  id: number;
  title: string | null;
  author: string | null;
  publisher: string | null;
  description: string | null;
  language: string | null;
  isbn: string | null;
  publication_date: string | null;
  cover_path: string | null;
  file_path: string;
  added_at: string;
  last_opened: string | null;
  current_page: number;
  total_pages: number;
}

// ============================================================================
// File Dialog Functions
// ============================================================================

/**
 * Opens a file picker dialog for selecting an EPUB file
 * @returns The selected file path or null if cancelled
 */
export async function openEpubFilePicker(): Promise<string | null> {
  try {
    const filePath = await invoke<string | null>("open_file_dialog");
    return filePath;
  } catch (error) {
    console.error("Failed to open file dialog:", error);
    throw error;
  }
}

/**
 * Shows a success dialog
 */
export async function showSuccess(message: string): Promise<void> {
  await invoke("show_success_dialog", { message });
}

/**
 * Shows an error dialog
 */
export async function showError(message: string): Promise<void> {
  await invoke("show_error_dialog", { message });
}

/**
 * Shows a warning dialog
 */
export async function showWarning(message: string): Promise<void> {
  await invoke("show_warning_dialog", { message });
}

// ============================================================================
// EPUB Functions
// ============================================================================

/**
 * Opens and validates an EPUB file
 * @param filePath Path to the EPUB file
 * @returns The validated file path
 */
export async function openEpub(filePath: string): Promise<string> {
  try {
    const result = await invoke<string>("open_epub", { filePath });
    return result;
  } catch (error) {
    console.error("Failed to open EPUB:", error);
    throw error;
  }
}

/**
 * Extracts metadata from an EPUB file with progress updates
 * @param filePath Path to the EPUB file
 * @param onProgress Callback for progress updates
 * @returns Extraction result with metadata or error
 */
export async function extractEpubMetadata(
  filePath: string,
  onProgress?: (progress: ProgressUpdate) => void
): Promise<ExtractionResult> {
  // Listen for progress updates
  const unlisten = onProgress
    ? await listen<ProgressUpdate>("extraction-progress", (event) => {
      onProgress(event.payload);
    })
    : null;

  try {
    const result = await invoke<ExtractionResult>("extract_epub_metadata", {
      filePath,
    });
    return result;
  } catch (error) {
    console.error("Failed to extract metadata:", error);
    throw error;
  } finally {
    // Clean up listener
    if (unlisten) {
      unlisten();
    }
  }
}

/**
 * Gets the full content of an EPUB as an array of chapter strings
 * @param filePath Path to the EPUB file
 * @returns Array of chapter contents
 */
export async function getEpubContent(filePath: string): Promise<string[]> {
  try {
    const content = await invoke<string[]>("get_epub_content", { filePath });
    return content;
  } catch (error) {
    console.error("Failed to get EPUB content:", error);
    throw error;
  }
}

/**
 * Gets the table of contents from an EPUB
 * @param filePath Path to the EPUB file
 * @returns Array of tuples [label, content_path]
 */
export async function getEpubToc(
  filePath: string
): Promise<[string, string][]> {
  try {
    const toc = await invoke<[string, string][]>("get_epub_toc", { filePath });
    return toc;
  } catch (error) {
    console.error("Failed to get EPUB TOC:", error);
    throw error;
  }
}

/**
 * Gets the currently opened EPUB metadata
 * @returns Current EPUB metadata or null
 */
export async function getCurrentEpub(): Promise<EpubMetadata | null> {
  try {
    const metadata = await invoke<EpubMetadata | null>("get_current_epub");
    return metadata;
  } catch (error) {
    console.error("Failed to get current EPUB:", error);
    throw error;
  }
}

/**
 * Sets the current EPUB metadata in app state
 * @param metadata EPUB metadata to set
 */
export async function setCurrentEpub(metadata: EpubMetadata): Promise<void> {
  try {
    await invoke("set_current_epub", { metadata });
  } catch (error) {
    console.error("Failed to set current EPUB:", error);
    throw error;
  }
}

// ============================================================================
// Database Functions
// ============================================================================

/**
 * Initializes the database (creates tables if they don't exist)
 */
export async function initDatabase(): Promise<void> {
  try {
    await invoke("init_database");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
}

/**
 * Saves EPUB metadata to the database
 * @param metadata EPUB metadata to save
 * @returns The book ID (newly created or existing)
 */
export async function saveBookMetadata(
  metadata: EpubMetadata
): Promise<number> {
  try {
    const bookId = await invoke<number>("save_book_metadata", { metadata });
    return bookId;
  } catch (error) {
    console.error("Failed to save book metadata:", error);
    throw error;
  }
}

/**
 * Gets all books from the database
 * @returns Array of all books
 */
export async function getAllBooks(): Promise<Book[]> {
  try {
    const books = await invoke<Book[]>("get_all_books");
    return books;
  } catch (error) {
    console.error("Failed to get all books:", error);
    throw error;
  }
}

/**
 * Gets a book by its ID
 * @param id Book ID
 * @returns The book details
 */
export async function getBookById(id: number): Promise<Book> {
  try {
    const book = await invoke<Book>("get_book_by_id", { id });
    return book;
  } catch (error) {
    console.error("Failed to get book by ID:", error);
    throw error;
  }
}

/**
 * Searches for books by title, author, or ISBN
 * @param query Search query
 * @returns Array of matching books
 */
export async function searchBooks(query: string): Promise<Book[]> {
  try {
    const books = await invoke<Book[]>("search_books", { query });
    return books;
  } catch (error) {
    console.error("Failed to search books:", error);
    throw error;
  }
}

/**
 * Deletes a book from the database
 * @param id Book ID to delete
 */
export async function deleteBook(id: number): Promise<void> {
  try {
    await invoke("delete_book", { id });
  } catch (error) {
    console.error("Failed to delete book:", error);
    throw error;
  }
}

/**
 * Updates the reading progress for a book
 * @param id Book ID
 * @param currentPage Current page number
 */
export async function updateBookProgress(
  id: number,
  currentPage: number
): Promise<void> {
  try {
    await invoke("update_book_progress", { id, currentPage });
  } catch (error) {
    console.error("Failed to update book progress:", error);
    throw error;
  }
}

/**
 * Gets recently opened books
 * @param limit Number of books to return
 * @returns Array of recently opened books
 */
export async function getRecentlyOpened(limit: number = 10): Promise<Book[]> {
  try {
    const books = await invoke<Book[]>("get_recently_opened", { limit });
    return books;
  } catch (error) {
    console.error("Failed to get recently opened books:", error);
    throw error;
  }
}

// ============================================================================
// Complete Workflow Example
// ============================================================================

/**
 * Complete workflow: Open EPUB -> Extract Metadata -> Save to Database
 * This is a high-level function that combines all steps
 */
export async function importEpubBook(
  onProgress?: (progress: ProgressUpdate) => void
): Promise<Book | null> {
  try {
    // Step 1: Open file picker
    const filePath = await openEpubFilePicker();
    if (!filePath) {
      console.log("No file selected");
      return null;
    }

    // Step 2: Validate the EPUB file
    await openEpub(filePath);

    // Step 3: Extract metadata with progress tracking
    const result = await extractEpubMetadata(filePath, onProgress);

    if (!result.success || !result.metadata) {
      await showError(result.error || "Failed to extract metadata");
      return null;
    }

    // Step 4: Save to database
    const bookId = await saveBookMetadata(result.metadata);

    // Step 5: Retrieve and return the saved book
    const book = await getBookById(bookId);

    await showSuccess(
      `Successfully imported: ${book.title || "Unknown Title"}`
    );

    return book;
  } catch (error) {
    console.error("Import workflow failed:", error);
    await showError(`Failed to import EPUB: ${error}`);
    return null;
  }
}

// ============================================================================
// Usage Example in a Component
// ============================================================================

/*
// React/Vue/Svelte component example:

import { importEpubBook, getAllBooks } from './tauri-commands-example';

// In your component:
async function handleImport() {
  const book = await importEpubBook((progress) => {
    console.log(`${progress.stage}: ${progress.progress}% - ${progress.message}`);
    // Update UI with progress
  });

  if (book) {
    console.log('Book imported:', book);
    // Refresh your book list or navigate to the book
  }
}

async function loadLibrary() {
  const books = await getAllBooks();
  console.log('All books:', books);
  // Display books in UI
}
*/
