import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';

import {
  Heading,
  Content,
  Button,
  Text,
  ProgressCircle,
  IllustratedMessage,
  ActionButton,

  Dialog,
  DialogTrigger,
  Divider,
} from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import type { Book } from '@/types';





const containerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: 'base',
});

const headerStyle = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingX: 24,
  paddingY: 16,
  borderBottomWidth: 1,
  borderColor: 'gray-200',
  backgroundColor: 'layer-1',
});

const readerContentStyle = style({
  flex: 1,
  overflowY: 'auto',
  paddingX: 48,
  paddingY: 32,
  maxWidth: 800,
  marginX: 'auto',
  width: '100%',
});

const navigationStyle = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingX: 24,
  paddingY: 16,
  borderTopWidth: 1,
  borderColor: 'gray-200',
  backgroundColor: 'layer-1',
});

const contentHtmlStyle = style({
  font: 'body',
});

const loadingContainerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 400,
  gap: 16,
});

const toolbarStyle = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 12,
  alignItems: 'center',
});

const pageInfoStyle = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 12,
  alignItems: 'center',
});

const tocListStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  maxHeight: 400,
  overflowY: 'auto',
});

const tocItemButtonStyle = style({
  paddingX: 12,
  paddingY: 8,
  borderRadius: 'default',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'start',
  backgroundColor: {
    default: 'transparent',
    isHovered: 'gray-100',
  },
});

function ReaderPage() {

  const bookId = 0;
  const [, setBook] = useState<Book | null>(null);
  const [content, setContent] = useState<string[]>([]);
  const [toc, setToc] = useState<[string, string][]>([]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bookId) {
      loadBook(parseInt(bookId, 10));
    }
  }, [bookId]);

  async function loadBook(id: number) {
    try {
      setLoading(true);
      setError(null);

      // Get book metadata
      const bookData = await invoke<Book>('get_book_by_id', { id });
      setBook(bookData);

      // Get EPUB content
      const epubContent = await invoke<string[]>('get_epub_content', {
        filePath: bookData.file_path,
      });
      setContent(epubContent);

      // Get table of contents
      const tocData = await invoke<[string, string][]>('get_epub_toc', {
        filePath: bookData.file_path,
      });
      setToc(tocData);

      // Set current chapter from saved progress
      if (bookData.current_page >= 0 && bookData.current_page < epubContent.length) {
        setCurrentChapter(bookData.current_page);
      } else {
        setCurrentChapter(0);
      }

      // Update last opened timestamp
      await invoke('update_book_progress', {
        id,
        currentPage: bookData.current_page || 0,
      });
    } catch (err) {
      console.error('Failed to load book:', err);
      setError(`Failed to load book: ${err}`);
      await invoke('show_error_dialog', {
        message: `Failed to load book: ${err}`,
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateProgress(newChapter: number) {
    //if (!book) return;

    try {
      await invoke('update_book_progress', {
        // id: book.id,
        currentPage: newChapter,
      });
      //setBook({ ...book, current_page: newChapter });
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  }

  function goToNextChapter() {
    if (currentChapter < content.length - 1) {
      const newChapter = currentChapter + 1;
      setCurrentChapter(newChapter);
      updateProgress(newChapter);
    }
  }

  function goToPreviousChapter() {
    if (currentChapter > 0) {
      const newChapter = currentChapter - 1;
      setCurrentChapter(newChapter);
      updateProgress(newChapter);
    }
  }

  function goToChapter(index: number) {
    if (index >= 0 && index < content.length) {
      setCurrentChapter(index);
      updateProgress(index);
    }
  }

  if (loading) {
    return (
      <div className={containerStyle}>
        <div className={loadingContainerStyle}>
          <ProgressCircle size="L" isIndeterminate />
          <Text>Loading book...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={containerStyle}>
        <div className={loadingContainerStyle}>
          <IllustratedMessage>
            <Heading>Failed to load book</Heading>
            <Content>{error || 'Book not found'}</Content>
            <Button variant="accent" onPress={() => console.log('Back to Library')}>
              Back to Library
            </Button>
          </IllustratedMessage>
        </div>
      </div>
    );
  }

  return (
    <div className={containerStyle}>
      {/* Header */}
      <div className={headerStyle}>
        <div>
          <Heading level={2}>{'Unknown Title'}</Heading>
          <Text>{'Unknown Author'}</Text>
        </div>
        <div className={toolbarStyle}>
          {/* Table of Contents */}
          {toc.length > 0 && (
            <DialogTrigger>
              <ActionButton>Table of Contents</ActionButton>
              <Dialog>
                {({ close }) => (
                  <>
                    <Heading>Table of Contents</Heading>
                    <Divider />
                    <Content>
                      <div className={tocListStyle}>
                        {toc.map((item, index) => (
                          <button
                            key={index}
                            className={tocItemButtonStyle({})}
                            onClick={() => {
                              goToChapter(index);
                              close();
                            }}
                            type="button"
                          >
                            <Text>{item[0] || `Chapter ${index + 1}`}</Text>
                          </button>
                        ))}
                      </div>
                    </Content>
                  </>
                )}
              </Dialog>
            </DialogTrigger>
          )}

          {/* Book Info */}
          <DialogTrigger>
            <ActionButton>Book Info</ActionButton>
            <Dialog>
              <Heading>Book Information</Heading>
              <Divider />
              <Content>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <Text><strong>Title:</strong> {'Unknown'}</Text>
                  </div>
                  <div>
                    <Text><strong>Author:</strong> {'Unknown'}</Text>
                  </div>
                  {/*{book.publisher && (
                    <div>
                      <Text><strong>Publisher:</strong> {book.publisher}</Text>
                    </div>
                  )}*/}
                  {/*{book.isbn && (
                    <div>
                      <Text><strong>ISBN:</strong> {book.isbn}</Text>
                    </div>
                  )}
                  {book.language && (
                    <div>
                      <Text><strong>Language:</strong> {book.language}</Text>
                    </div>
                  )}
                  {book.publication_date && (
                    <div>
                      <Text><strong>Published:</strong> {book.publication_date}</Text>
                    </div>
                  )}
                  {book.description && (
                    <div>
                      <Text><strong>Description:</strong></Text>
                      <Text>{book.description}</Text>
                    </div>
                  )}*/}
                </div>
              </Content>
            </Dialog>
          </DialogTrigger>

          <ActionButton onPress={() => console.log('Close')}>
            Close
          </ActionButton>
        </div>
      </div>

      {/* Reader Content */}
      <div className={readerContentStyle}>
        {content[currentChapter] ? (
          <div
            className={contentHtmlStyle}
            dangerouslySetInnerHTML={{ __html: content[currentChapter] }}
          />
        ) : (
          <div className={loadingContainerStyle}>
            <Text>No content available for this chapter.</Text>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className={navigationStyle}>
        <Button
          variant="secondary"
          onPress={goToPreviousChapter}
          isDisabled={currentChapter === 0}
        >
          Previous
        </Button>

        <div className={pageInfoStyle}>
          <Text>
            Chapter {currentChapter + 1} of {content.length}
          </Text>
        </div>

        <Button
          variant="secondary"
          onPress={goToNextChapter}
          isDisabled={currentChapter === content.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default ReaderPage;
