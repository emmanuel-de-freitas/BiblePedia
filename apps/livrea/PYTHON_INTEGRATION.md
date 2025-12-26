# Python Integration in Livrea

This document explains how Python is integrated as a sidecar to Rust in the Livrea application using `tauri-plugin-python`.

## Overview

The Livrea application uses Python for advanced text processing, book analysis, and natural language processing tasks. Python runs alongside Rust, allowing you to leverage Python's rich ecosystem of libraries while maintaining Rust's performance for core functionality.

## Architecture

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│   React Frontend    │────▶│    Rust Backend     │────▶│   Python Sidecar    │
│  (TypeScript/JSX)   │◀────│     (Tauri)         │◀────│   (RustPython/PyO3) │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
```

## Setup

### Basic Setup (RustPython - Default)

RustPython is embedded by default and doesn't require Python to be installed on the target system. This is ideal for distribution but has limited library support.

1. The plugin is already configured in:
   - `src-tauri/Cargo.toml` - Rust dependency
   - `package.json` - JavaScript/TypeScript API
   - `src-tauri/src/lib.rs` - Plugin initialization

2. Python functions are defined in `src-tauri/src-python/main.py`

3. TypeScript API wrapper is available in `src/api/python.ts`

### Advanced Setup (PyO3 - Optional)

For better Python library support during development, you can use PyO3 with CPython:

1. **Enable PyO3 in Cargo.toml:**
   ```toml
   # src-tauri/Cargo.toml
   tauri-plugin-python = { version = "0.3", features = ["pyo3"] }
   ```

2. **Setup Python virtual environment:**
   ```bash
   cd apps/livrea
   ./setup-python.sh
   ```

3. **Update tauri.conf.json to include venv resources:**
   ```json
   "resources": [
     "src-python/",
     "../.venv/include/",
     "../.venv/lib/"
   ]
   ```

## Available Python Functions

The following Python functions are available from JavaScript/TypeScript:

### Text Analysis
- `analyze_text(text)` - Get word count, character count, sentence count, etc.
- `get_text_statistics(text)` - Comprehensive text statistics including readability metrics
- `calculate_reading_time(text, wpm)` - Calculate estimated reading time

### Text Processing
- `clean_text(text)` - Clean and normalize text
- `extract_sentences(text, max)` - Extract sentences from text
- `extract_keywords(text, max)` - Extract keywords using frequency analysis

### Book Metadata
- `process_book_metadata(metadata)` - Process and enhance book metadata
- `generate_book_hash(title, author, content)` - Generate unique book hash
- `validate_isbn(isbn)` - Validate ISBN-10 or ISBN-13
- `format_author_name(author)` - Format author names consistently

## Usage Examples

### From TypeScript/React

```typescript
import { pythonAPI } from '@/api/python';

// Initialize Python API (called automatically on import)
await pythonAPI.initialize();

// Analyze text
const analysis = await pythonAPI.analyzeText("Your book text here...");
console.log(`Word count: ${analysis.word_count}`);

// Extract keywords
const keywords = await pythonAPI.extractKeywords("Book content...", 10);

// Get reading time
const readingTime = await pythonAPI.calculateReadingTime("Book content...", 200);
console.log(`Reading time: ${readingTime.minutes} minutes`);

// Process book metadata
const metadata = await pythonAPI.processBookMetadata({
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  isbn: "978-0-7432-7356-5"
});
```

### Using the convenience API

```typescript
import { python } from '@/api/python';

// Direct function calls
const cleanedText = await python.cleanText("  Some text  ");
const keywords = await python.extractKeywords(bookContent, 5);
const isValidISBN = await python.validateISBN("978-0-7432-7356-5");
```

### React Component Example

```tsx
import { BookAnalyzer } from '@/components/BookAnalyzer';

// The BookAnalyzer component demonstrates Python integration
<BookAnalyzer />
```

## Adding New Python Functions

1. **Add the function to `src-tauri/src-python/main.py`:**
   ```python
   def my_new_function(param1, param2):
       # Your Python code here
       return result
   ```

2. **Register it in the `_tauri_plugin_functions` list:**
   ```python
   _tauri_plugin_functions = [
       "analyze_text",
       "my_new_function",  # Add here
       # ... other functions
   ]
   ```

3. **Add it to Rust registration in `src-tauri/src/lib.rs`:**
   ```rust
   let python_functions = vec![
       "analyze_text",
       "my_new_function",  // Add here
       // ... other functions
   ];
   ```

4. **Add TypeScript wrapper in `src/api/python.ts`:**
   ```typescript
   public async myNewFunction(param1: string, param2: number): Promise<any> {
       return await callFunction('my_new_function', [param1, param2]);
   }
   ```

## Installing Python Dependencies

### For RustPython (Default)
RustPython has limited library support. Only pure Python modules can be used. C-extension modules are not supported.

### For PyO3 (Advanced)
1. Activate the virtual environment:
   ```bash
   source .venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Or install individual packages:
   ```bash
   pip install nltk textstat pandas
   ```

## Production Deployment

### With RustPython (Recommended)
- No additional setup required
- Python code is bundled with the application
- Works on all platforms without Python installation

### With PyO3
For production builds with PyO3, you need to either:

1. **Ship dynamic libpython** (easier but larger):
   - Include the `.venv` folder in your distribution
   - Ensure Python is installed on target systems

2. **Static linking with PyOxidizer** (recommended for production):
   ```bash
   # Install pyoxidizer
   pip install pyoxidizer
   
   # Generate embedding artifacts
   pyoxidizer generate-python-embedding-artifacts src-tauri/target/pyembed
   
   # Add to .cargo/config.toml
   PYO3_CONFIG_FILE = { value = "target/pyembed/pyo3-build-config-file.txt", relative = true }
   ```

## Troubleshooting

### Python functions not found
- Ensure the function is listed in `_tauri_plugin_functions` in `main.py`
- Check that the function is registered in Rust (`lib.rs`)
- Verify Python plugin initialization in the Tauri builder

### Import errors in Python
- For RustPython: Only pure Python modules are supported
- For PyO3: Ensure dependencies are installed in the virtual environment
- Check that venv resources are included in `tauri.conf.json`

### Performance issues
- Consider moving CPU-intensive tasks to Rust
- Use Python for high-level logic and libraries not available in Rust
- Cache results when possible

## Security Considerations

- Python functions must be explicitly registered - arbitrary code execution is prevented
- The `runPython` command is disabled by default
- Ensure user interface is not accessible via network URLs in production
- Validate all input passed to Python functions

## Further Resources

- [tauri-plugin-python Documentation](https://github.com/marcomq/tauri-plugin-python)
- [RustPython Project](https://github.com/RustPython/RustPython)
- [PyO3 Documentation](https://pyo3.rs)
- [Tauri v2 Documentation](https://v2.tauri.app)
