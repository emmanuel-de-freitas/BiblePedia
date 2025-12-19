import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import {
  Heading,
  Content,
  ActionButton,

  Card,
  CardView,
  Text,
  ProgressCircle,
  IllustratedMessage,
  Button,

  DialogTrigger,
  AlertDialog,
  Divider,

  SearchField,
} from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { containerStyle, contentStyle } from '../styles/content';
import { headerStyle } from '../styles/typography';
import { cardContentStyle } from '../styles/card';
import { bookAuthorStyle, bookMetaStyle, bookTitleStyle } from '../styles/book';
import { Book, ExtractionResult, ProgressUpdate } from '@/types';


const searchBarStyle = style({
  marginBottom: 24,
  maxWidth: 600,
});

const emptyStateStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 400,
  textAlign: 'center',
});





const progressContainerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  paddingY: 32,
});

const toolbarStyle = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 12,
  alignItems: 'center',
});

function LibraryPage() {

  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState<ProgressUpdate | null>(null);


  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(books);
    } else {
      searchBooks(searchQuery);
    }
  }, [searchQuery, books]);

  async function loadBooks() {
    try {
      setLoading(true);
      const allBooks = await invoke<Book[]>('get_all_books');
      setBooks(allBooks);
      setFilteredBooks(allBooks);
    } catch (error) {
      console.error('Failed to load books:', error);
      await invoke('show_error_dialog', {
        message: `Failed to load library: ${error}`,
      });
    } finally {
      setLoading(false);
    }
  }

  async function searchBooks(query: string) {
    try {
      if (query.trim() === '') {
        setFilteredBooks(books);
        return;
      }
      const results = await invoke<Book[]>('search_books', { query });
      setFilteredBooks(results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  }

  async function handleImport() {
    setImporting(true);
    setProgress(null);

    try {
      // Listen for progress updates
      const unlisten = await listen<ProgressUpdate>('extraction-progress', (event) => {
        setProgress(event.payload);
      });

      // Open file dialog
      const filePath = await invoke<string | null>('open_file_dialog');

      if (!filePath) {
        unlisten();
        setImporting(false);
        return;
      }

      // Validate EPUB
      await invoke('open_epub', { filePath });

      // Extract metadata
      const result = await invoke<ExtractionResult>('extract_epub_metadata', {
        filePath,
      });

      if (!result.success || !result.metadata) {
        await invoke('show_error_dialog', {
          message: result.error || 'Failed to extract metadata',
        });
        unlisten();
        setImporting(false);
        return;
      }

      // Save to database
      await invoke('save_book_metadata', { metadata: result.metadata });

      await invoke('show_success_dialog', {
        message: `Successfully imported: ${result.metadata.title || 'Unknown Title'}`,
      });

      // Reload books
      await loadBooks();

      unlisten();
    } catch (error) {
      console.error('Import failed:', error);
      await invoke('show_error_dialog', {
        message: `Import failed: ${error}`,
      });
    } finally {
      setImporting(false);
      setProgress(null);
    }
  }

  async function handleDeleteBook(book: Book) {
    try {
      await invoke('delete_book', { id: book.id });
      await loadBooks();
    } catch (error) {
      console.error('Delete failed:', error);
      await invoke('show_error_dialog', {
        message: `Failed to delete book: ${error}`,
      });
    }
  }

  async function handleOpenBook(_book: Book) {
    // TODO: Open reader in new window

  }

  function formatDate(dateString: string | null): string {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  if (loading) {
    return (
      <div className={containerStyle}>
        <div className={progressContainerStyle}>
          <ProgressCircle size="L" isIndeterminate />
          <Text>Loading library...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={containerStyle}>
      {/* Header */}
      <div className={headerStyle}>
        <Heading level={1}>My Library</Heading>
        <div className={toolbarStyle}>
          <Text>{books.length} {books.length === 1 ? 'book' : 'books'}</Text>
          <ActionButton onPress={handleImport} isDisabled={importing}>
            {importing ? 'Importing...' : 'Import EPUB'}
          </ActionButton>
        </div>
      </div>

      {/* Import Progress */}
      {importing && progress && (
        <div className={progressContainerStyle}>
          <ProgressCircle size="L" value={progress.progress} />
          <Text>{progress.message}</Text>
        </div>
      )}

      {/* Content */}
      <div className={contentStyle}>
        {/* Search Bar */}
        <div className={searchBarStyle}>
          <SearchField
            placeholder="Search by title, or author..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className={emptyStateStyle}>
            <IllustratedMessage>
              <Heading>No books found</Heading>
              <Content>
                {searchQuery
                  ? 'Try a different search term'
                  : 'Import your first EPUB to get started'}
              </Content>
              {!searchQuery && (
                <Button variant="accent" onPress={handleImport}>
                  Import EPUB
                </Button>
              )}
            </IllustratedMessage>
          </div>
        ) : (
          <CardView
            items={filteredBooks}
            layout="grid"
            onAction={(key) => {
              const book = filteredBooks.find((b) => b.id === key);
              if (book) handleOpenBook(book);
            }}
          >
            {(book) => (
              <Card key={book.id} textValue={book.title || 'Unknown'}>
                <div className={cardContentStyle}>
                  <div className={bookTitleStyle}>
                    {book.title || 'Unknown Title'}
                  </div>
                  <div className={bookAuthorStyle}>
                    {book.author || 'Unknown Author'}
                  </div>
                  {book.description && (
                    <div className={bookMetaStyle}>
                      {book.description.length > 120
                        ? `${book.description.substring(0, 120)}...`
                        : book.description}
                    </div>
                  )}
                  <Divider size="S" />
                  <div className={bookMetaStyle}>
                    {book.current_page > 0 ? (
                      <>
                        Page {book.current_page} of {book.total_pages || '?'}
                      </>
                    ) : (
                      'Not started'
                    )}
                  </div>
                  {book.last_opened && (
                    <div className={bookMetaStyle}>
                      Last opened: {formatDate(book.last_opened)}
                    </div>
                  )}
                  <div className={bookMetaStyle}>
                    Added: {formatDate(book.added_at)}
                  </div>

                  {/* Actions */}
                  <DialogTrigger>
                    <ActionButton>Delete</ActionButton>
                    <AlertDialog
                      title="Delete Book"
                      variant="destructive"
                      primaryActionLabel="Delete"
                      cancelLabel="Cancel"
                      onPrimaryAction={() => handleDeleteBook(book)}
                    >
                      Are you sure you want to delete "{book.title || 'this book'}"
                      from your library? This action cannot be undone.
                    </AlertDialog>
                  </DialogTrigger>
                </div>
              </Card>
            )}
          </CardView>
        )}
      </div>
    </div>
  );
}

export default LibraryPage;
