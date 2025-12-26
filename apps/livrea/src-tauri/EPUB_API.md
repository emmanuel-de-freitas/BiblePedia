# EPUB API Documentation - epubie-lib Migration

This document outlines the updated EPUB API after migrating from the `epub` crate to `epubie-lib`.

## Overview

The migration to `epubie-lib` provides enhanced functionality for parsing EPUB files with better chapter organization, improved metadata extraction, and more comprehensive file access.

## Key Improvements

- **Chapter-based organization**: Content organized by chapters rather than just TOC
- **Enhanced metadata extraction**: More comprehensive book information
- **Better file access**: Direct access to individual files with type information
- **Improved error handling**: More descriptive error messages
- **Modern API design**: Cleaner, more intuitive interface

## Available Commands

### Basic EPUB Operations

#### `open_epub(file_path: String) -> Result<String, String>`

Validates and opens an EPUB file.

```javascript
const result = await invoke('open_epub', { filePath: '/path/to/book.epub' });
```

#### `extract_epub_metadata(file_path: String) -> Result<ExtractionResult, String>`

Extracts comprehensive metadata from an EPUB file with progress updates.

```javascript
// Listen for progress updates
listen('extraction-progress', (event) => {
  console.log(`Stage: ${event.payload.stage}, Progress: ${event.payload.progress}%`);
});

const result = await invoke('extract_epub_metadata', { filePath: '/path/to/book.epub' });
// Returns: { success: boolean, metadata: EpubMetadata | null, error: string | null }
```

### Content Access

#### `get_epub_content(file_path: String) -> Result<EpubContent, String>`

Retrieves complete EPUB structure including chapters, files, and table of contents.

```javascript
const content = await invoke('get_epub_content', { filePath: '/path/to/book.epub' });
/*
Returns:
{
  chapters: [
    {
      title: "Chapter 1",
      file_count: 3,
      files: [
        {
          id: "chapter1",
          href: "chapter1.html",
          title: "Introduction",
          media_type: "application/xhtml+xml",
          is_html: true,
          content_length: 1024
        }
      ]
    }
  ],
  toc: [
    {
      title: "Table of Contents",
      href: "toc.html",
      level: 0
    }
  ],
  total_chapters: 12,
  total_files: 45
}
*/
```

#### `get_epub_toc(file_path: String) -> Result<Vec<TocEntry>, String>`

Gets the table of contents with hierarchical structure.

```javascript
const toc = await invoke('get_epub_toc', { filePath: '/path/to/book.epub' });
/*
Returns:
[
  { title: "Preface", href: "preface.html", level: 0 },
  { title: "Chapter 1", href: "ch1.html", level: 0 },
  { title: "Section 1.1", href: "ch1.html#s1", level: 1 },
  { title: "Chapter 2", href: "ch2.html", level: 0 }
]
*/
```

#### `get_chapter_content(file_path: String, chapter_index: usize) -> Result<Vec<String>, String>`

Retrieves HTML content for a specific chapter.

```javascript
const chapterContent = await invoke('get_chapter_content', {
  filePath: '/path/to/book.epub',
  chapterIndex: 0
});
// Returns array of HTML strings for all files in the chapter
```

#### `get_file_content(file_path: String, file_href: String) -> Result<String, String>`

Gets content of a specific file within the EPUB.

```javascript
const fileContent = await invoke('get_file_content', {
  filePath: '/path/to/book.epub',
  fileHref: 'chapter1.html'
});
// Returns the raw content of the specified file
```

#### `get_epub_stats(file_path: String) -> Result<(usize, usize, usize), String>`

Retrieves basic statistics about the EPUB.

```javascript
const [chapterCount, fileCount, tocCount] = await invoke('get_epub_stats', {
  filePath: '/path/to/book.epub'
});
```

### State Management

#### `get_current_epub() -> Result<Option<EpubMetadata>, String>`

Gets the currently loaded EPUB metadata.

```javascript
const currentEpub = await invoke('get_current_epub');
```

#### `set_current_epub(metadata: EpubMetadata) -> Result<(), String>`

Sets the current EPUB metadata.

```javascript
await invoke('set_current_epub', { metadata: epubMetadata });
```

#### `clear_current_epub() -> Result<(), String>`

Clears the current EPUB state.

```javascript
await invoke('clear_current_epub');
```

## Data Structures

### EpubMetadata

```typescript
interface EpubMetadata {
  title?: string;
  author?: string;
  publisher?: string;
  description?: string;
  language?: string;
  isbn?: string;
  publication_date?: string;
  cover_path?: string;
  file_path: string;
}
```

### ChapterInfo

```typescript
interface ChapterInfo {
  title: string;
  file_count: number;
  files: FileInfo[];
}
```

### FileInfo

```typescript
interface FileInfo {
  id: string;
  href: string;
  title?: string;
  media_type: string;
  is_html: boolean;
  content_length: number;
}
```

### TocEntry

```typescript
interface TocEntry {
  title: string;
  href: string;
  level: number;
}
```

### EpubContent

```typescript
interface EpubContent {
  chapters: ChapterInfo[];
  toc: TocEntry[];
  total_chapters: number;
  total_files: number;
}
```

## Migration Guide

### From Old API to New API

#### Old: Getting TOC
```javascript
// Old API returned tuples
const toc = await invoke('get_epub_toc', { filePath });
// Returns: [["Chapter 1", "ch1.html"], ["Chapter 2", "ch2.html"]]
```

#### New: Getting TOC
```javascript
// New API returns structured objects
const toc = await invoke('get_epub_toc', { filePath });
// Returns: [{ title: "Chapter 1", href: "ch1.html", level: 0 }]
```

#### Old: Getting Content
```javascript
// Old API returned simple array of strings
const content = await invoke('get_epub_content', { filePath });
// Returns: ["<html>...</html>", "<html>...</html>"]
```

#### New: Getting Content
```javascript
// New API returns structured content with metadata
const content = await invoke('get_epub_content', { filePath });
// Returns comprehensive EpubContent object with chapters, files, and TOC
```

## Error Handling

All commands return `Result<T, String>` where the error string provides descriptive information about what went wrong:

```javascript
try {
  const metadata = await invoke('extract_epub_metadata', { filePath });
  if (metadata.success) {
    console.log('Metadata:', metadata.metadata);
  } else {
    console.error('Extraction failed:', metadata.error);
  }
} catch (error) {
  console.error('Command failed:', error);
}
```

## Progress Monitoring

When extracting metadata, listen for progress events:

```javascript
const unlisten = await listen('extraction-progress', (event) => {
  const { stage, progress, message } = event.payload;
  
  switch (stage) {
    case 'init':
      console.log('Starting extraction...');
      break;
    case 'metadata':
      console.log(`Extracting metadata... ${progress}%`);
      break;
    case 'cover':
      console.log(`Processing cover... ${progress}%`);
      break;
    case 'complete':
      console.log('Extraction complete!');
      unlisten(); // Clean up listener
      break;
    case 'error':
      console.error('Extraction error:', message);
      unlisten();
      break;
  }
});
```

## Performance Notes

- `epubie-lib` is optimized for chapter-based reading workflows
- File access is lazy-loaded for better performance
- Metadata extraction includes progress reporting for large files
- TOC structure includes proper nesting levels for better navigation

## Example Usage

```javascript
// Complete workflow example
async function loadAndProcessEpub(filePath) {
  try {
    // 1. Validate file
    await invoke('open_epub', { filePath });
    
    // 2. Extract metadata with progress
    const unlisten = await listen('extraction-progress', (event) => {
      updateProgressBar(event.payload.progress);
    });
    
    const result = await invoke('extract_epub_metadata', { filePath });
    unlisten();
    
    if (!result.success) {
      throw new Error(result.error);
    }
    
    // 3. Set as current book
    await invoke('set_current_epub', { metadata: result.metadata });
    
    // 4. Get full content structure
    const content = await invoke('get_epub_content', { filePath });
    
    // 5. Display book info
    displayBookInfo(result.metadata);
    displayTableOfContents(content.toc);
    displayChapters(content.chapters);
    
    console.log(`Book loaded: ${content.total_chapters} chapters, ${content.total_files} files`);
    
  } catch (error) {
    console.error('Failed to load EPUB:', error);
  }
}
```
