# Livres - EPUB Reader Backend

This document describes the Rust backend implementation for the Livres EPUB reader application.

## Overview

The backend provides three main modules:
1. **EPUB Module** - Handle EPUB file operations and metadata extraction
2. **Database Module** - SQLite database for storing book metadata and reading progress
3. **File Dialog Module** - Native file picker dialogs

## Architecture

```
src-tauri/
├── src/
│   ├── lib.rs           # Main entry point, command registration
│   ├── epub.rs          # EPUB operations
│   ├── database.rs      # SQLite database operations
│   └── file_dialog.rs   # File picker dialogs
├── Cargo.toml
└── README.md (this file)
```

## Dependencies

```toml
tauri = "2"
tauri-plugin-opener = "2"
tauri-plugin-dialog = "2"
serde = { version = "1", features = ["derive"] }
serde_json = "1"
epub = "2.1.5"
rusqlite = { version = "0.31", features = ["bundled"] }
thiserror = "1.0"
```

## Module Details

### 1. EPUB Module (`epub.rs`)

Handles all EPUB file operations including metadata extraction and content reading.

#### Data Structures

**EpubMetadata**
```rust
{
    title: Option<String>,
    author: Option<String>,
    publisher: Option<String>,
    description: Option<String>,
    language: Option<String>,
    isbn: Option<String>,
    publication_date: Option<String>,
    cover_path: Option<String>,
    file_path: String,
}
```

**ProgressUpdate** (for real-time extraction progress)
```rust
{
    stage: String,        // "init", "metadata", "cover", "complete", "error"
    progress: u8,         // 0-100
    message: String,      // Human-readable message
}
```

**ExtractionResult**
```rust
{
    success: bool,
    metadata: Option<EpubMetadata>,
    error: Option<String>,
}
```

#### Commands

##### `open_epub(file_path: String) -> Result<String, String>`
Validates that a file exists and is an EPUB file.

**Example:**
```typescript
const validPath = await invoke('open_epub', { filePath: '/path/to/book.epub' });
```

##### `extract_epub_metadata(file_path: String) -> Result<ExtractionResult, String>`
Extracts all metadata from an EPUB file with progress updates via events.

**Events emitted:** `extraction-progress` with `ProgressUpdate` payload

**Example:**
```typescript
// Listen for progress
const unlisten = await listen('extraction-progress', (event) => {
  console.log(`${event.payload.stage}: ${event.payload.progress}%`);
});

const result = await invoke('extract_epub_metadata', { 
  filePath: '/path/to/book.epub' 
});

unlisten();
```

##### `get_epub_content(file_path: String) -> Result<Vec<String>, String>`
Gets all chapter content as an array of strings.

##### `get_epub_toc(file_path: String) -> Result<Vec<(String, String)>, String>`
Gets the table of contents as an array of (label, content_path) tuples.

##### `get_current_epub() -> Result<Option<EpubMetadata>, String>`
Gets the currently opened EPUB from app state.

##### `set_current_epub(metadata: EpubMetadata) -> Result<(), String>`
Sets the current EPUB in app state.

### 2. Database Module (`database.rs`)

Manages SQLite database operations for storing book metadata and reading progress.

#### Database Schema

**books table**
```sql
CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    publisher TEXT,
    description TEXT,
    language TEXT,
    isbn TEXT UNIQUE,
    publication_date TEXT,
    cover_path TEXT,
    file_path TEXT NOT NULL UNIQUE,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_opened DATETIME,
    current_page INTEGER DEFAULT 0,
    total_pages INTEGER DEFAULT 0
);
```

**Indexes:**
- `idx_books_title` on `title`
- `idx_books_author` on `author`
- `idx_books_isbn` on `isbn`

#### Data Structures

**Book**
```rust
{
    id: i64,
    title: Option<String>,
    author: Option<String>,
    publisher: Option<String>,
    description: Option<String>,
    language: Option<String>,
    isbn: Option<String>,
    publication_date: Option<String>,
    cover_path: Option<String>,
    file_path: String,
    added_at: String,
    last_opened: Option<String>,
    current_page: i32,
    total_pages: i32,
}
```

#### Commands

##### `init_database() -> Result<(), String>`
Initializes database tables. Called automatically on app startup.

##### `save_book_metadata(metadata: EpubMetadata) -> Result<i64, String>`
Saves or updates book metadata in the database. Returns the book ID.
- If book exists (by file_path), updates it
- If book is new, inserts it

**Example:**
```typescript
const bookId = await invoke('save_book_metadata', { metadata });
```

##### `get_all_books() -> Result<Vec<Book>, String>`
Gets all books from the database, ordered by added_at DESC.

##### `get_book_by_id(id: i64) -> Result<Book, String>`
Gets a specific book by its ID.

##### `search_books(query: String) -> Result<Vec<Book>, String>`
Searches books by title, author, or ISBN (case-insensitive, partial match).

**Example:**
```typescript
const results = await invoke('search_books', { query: 'tolkien' });
```

##### `delete_book(id: i64) -> Result<(), String>`
Deletes a book from the database.

##### `update_book_progress(id: i64, current_page: i32) -> Result<(), String>`
Updates the reading progress for a book and sets last_opened to current time.

**Example:**
```typescript
await invoke('update_book_progress', { id: 1, currentPage: 42 });
```

##### `get_recently_opened(limit: i32) -> Result<Vec<Book>, String>`
Gets recently opened books, ordered by last_opened DESC.

### 3. File Dialog Module (`file_dialog.rs`)

Provides native file picker and dialog functionality.

#### Commands

##### `open_file_dialog() -> Result<Option<String>, String>`
Opens a native file picker filtered for EPUB files.

**Example:**
```typescript
const filePath = await invoke('open_file_dialog');
if (filePath) {
  // User selected a file
}
```

##### `show_success_dialog(message: String) -> Result<(), String>`
Shows a success dialog.

##### `show_error_dialog(message: String) -> Result<(), String>`
Shows an error dialog.

##### `show_warning_dialog(message: String) -> Result<(), String>`
Shows a warning dialog.

## Complete Workflow Example

### Importing an EPUB Book

```typescript
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

async function importBook() {
  // 1. Open file picker
  const filePath = await invoke('open_file_dialog');
  if (!filePath) return;

  // 2. Listen for progress
  const unlisten = await listen('extraction-progress', (event) => {
    const progress = event.payload;
    console.log(`${progress.message} (${progress.progress}%)`);
    // Update progress bar in UI
  });

  try {
    // 3. Validate EPUB
    await invoke('open_epub', { filePath });

    // 4. Extract metadata
    const result = await invoke('extract_epub_metadata', { filePath });
    
    if (!result.success) {
      await invoke('show_error_dialog', { 
        message: result.error 
      });
      return;
    }

    // 5. Save to database
    const bookId = await invoke('save_book_metadata', { 
      metadata: result.metadata 
    });

    // 6. Success!
    await invoke('show_success_dialog', { 
      message: `Successfully imported: ${result.metadata.title}` 
    });

    // 7. Optionally get the saved book
    const book = await invoke('get_book_by_id', { id: bookId });
    
  } catch (error) {
    await invoke('show_error_dialog', { 
      message: `Failed to import: ${error}` 
    });
  } finally {
    unlisten();
  }
}
```

### Loading Library

```typescript
async function loadLibrary() {
  const books = await invoke('get_all_books');
  // Display books in UI
  return books;
}

async function searchLibrary(query: string) {
  const results = await invoke('search_books', { query });
  return results;
}

async function getRecentBooks() {
  const recent = await invoke('get_recently_opened', { limit: 5 });
  return recent;
}
```

### Reading Progress

```typescript
async function updateProgress(bookId: number, page: number) {
  await invoke('update_book_progress', { 
    id: bookId, 
    currentPage: page 
  });
}

async function getBookProgress(bookId: number) {
  const book = await invoke('get_book_by_id', { id: bookId });
  return {
    currentPage: book.current_page,
    totalPages: book.total_pages
  };
}
```

## Database Location

The SQLite database is stored at:
- **macOS**: `~/Library/Application Support/com.livres.app/livres.db`
- **Windows**: `%APPDATA%\com.livres.app\livres.db`
- **Linux**: `~/.local/share/com.livres.app/livres.db`

## Error Handling

All commands return `Result<T, String>` where:
- `Ok(T)` - Success with data
- `Err(String)` - Error with message

Frontend should handle errors with try-catch:

```typescript
try {
  const result = await invoke('command_name', { args });
  // Handle success
} catch (error) {
  // Handle error (error is a string)
  console.error('Command failed:', error);
}
```

## Progress Events

The `extract_epub_metadata` command emits progress events on the `extraction-progress` channel:

**Event Payload:**
```typescript
{
  stage: "init" | "metadata" | "cover" | "complete" | "error",
  progress: 0-100,
  message: string
}
```

**Stage Progression:**
1. `init` (0%) - Starting extraction
2. `metadata` (25%) - Extracting metadata
3. `cover` (50%) - Extracting cover
4. `complete` (100%) - Extraction complete
5. `error` (0%) - An error occurred

## Testing

### Manual Testing

You can test commands from the browser console:

```javascript
// Test file dialog
const path = await invoke('open_file_dialog');

// Test metadata extraction
const result = await invoke('extract_epub_metadata', { 
  filePath: path 
});

// Test database
const bookId = await invoke('save_book_metadata', { 
  metadata: result.metadata 
});

const books = await invoke('get_all_books');
```

## Future Enhancements

Potential improvements:
- [ ] Cover image extraction and caching
- [ ] Full-text search in book content
- [ ] Collections/shelves for organizing books
- [ ] Reading statistics (time spent, pages per day, etc.)
- [ ] Sync across devices
- [ ] Book annotations and highlights
- [ ] Export reading data

## Troubleshooting

### Database locked error
If you get a "database is locked" error, ensure only one instance of the app is running.

### EPUB parsing fails
Some EPUB files may not conform to standards. Check:
- File is valid EPUB (can be opened in other readers)
- File is not corrupted
- File extension is `.epub`

### File picker doesn't show files
Ensure the file filter is working correctly. You can modify the filter in `file_dialog.rs`:

```rust
.add_filter("EPUB Files", &["epub"])
```

## License

See project root for license information.
