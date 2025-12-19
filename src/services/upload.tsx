import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

import {
  DropZone,
  Heading,
  Content,
  Text,
  ProgressCircle,
  IllustratedMessage,
  ActionButton,
  ButtonGroup,
  Button,
} from '@react-spectrum/s2';
import CloudUpload from '@react-spectrum/s2/illustrations/gradient/generic1/CloudUpload';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };

interface ProgressUpdate {
  stage: string;
  progress: number;
  message: string;
}

interface ExtractionResult {
  success: boolean;
  metadata: any;
  error: string | null;
}

const containerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: 'layer-1',
  paddingX: 24,
  paddingY: 24,
});

const progressContainerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  paddingY: 32,
});

const actionsStyle = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 12,
  marginTop: 24,
});

const headerStyle = style({
  textAlign: 'center',
  marginBottom: 32,
});

function UploadPage() {

  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState<ProgressUpdate | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  async function handleFileImport(filePath: string) {
    setImporting(true);
    setProgress(null);

    try {
      // Listen for progress updates
      const unlisten = await listen<ProgressUpdate>('extraction-progress', (event) => {
        setProgress(event.payload);
      });

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
        setUploadedFile(null);
        return;
      }

      // Save to database
      await invoke('save_book_metadata', { metadata: result.metadata });

      await invoke('show_success_dialog', {
        message: `Successfully imported: ${result.metadata.title || 'Unknown Title'}`,
      });

      // Navigate to library
      // navigate('/library');

      unlisten();
    } catch (error) {
      console.error('Import failed:', error);
      await invoke('show_error_dialog', {
        message: `Import failed: ${error}`,
      });
      setUploadedFile(null);
    } finally {
      setImporting(false);
      setProgress(null);
    }
  }

  async function handleBrowseFiles() {
    try {
      const filePath = await invoke<string | null>('open_file_dialog');
      if (filePath) {
        // Extract filename from path
        const fileName = filePath.split(/[\\/]/).pop() || 'Unknown';
        setUploadedFile(fileName);
        await handleFileImport(filePath);
      }
    } catch (error) {
      console.error('File selection failed:', error);
    }
  }

  if (importing) {
    return (
      <div className={containerStyle}>
        <div className={progressContainerStyle}>
          <ProgressCircle
            size="L"
            value={progress?.progress}
            isIndeterminate={!progress}
          />
          <Heading level={3}>{progress?.stage || 'Importing...'}</Heading>
          <Text>{progress?.message || 'Please wait...'}</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={containerStyle}>
      <div className={headerStyle}>
        <Heading level={1}>Import EPUB</Heading>
        <Text>
          Select an EPUB file from your computer to add it to your library
        </Text>
      </div>

      <DropZone
        styles={style({ width: 600, maxWidth: '90%' })}
        size="L"
        isFilled={!!uploadedFile}
        replaceMessage="Drop file to replace"
        getDropOperation={(types) =>
          types.has('application/epub+zip') || types.has('application/epub')
            ? 'copy'
            : 'cancel'
        }
        onDrop={async (event) => {
          // Find EPUB file
          const item = event.items.find(
            (item) =>
              item.kind === 'file' &&
              (item.type === 'application/epub+zip' ||
                item.type === 'application/epub' ||
                item.name?.endsWith('.epub'))
          );

          if (item?.kind === 'file') {
            // Since Tauri needs native file paths, we'll use the file picker instead
            // The drag and drop will just trigger the file picker
            await handleBrowseFiles();
          }
        }}
      >
        {uploadedFile ? (
          <IllustratedMessage>
            <CloudUpload />
            <Heading>File ready to import</Heading>
            <Content>{uploadedFile}</Content>
            <ButtonGroup>
              <Button variant="accent" onPress={handleBrowseFiles}>
                Choose another file
              </Button>
            </ButtonGroup>
          </IllustratedMessage>
        ) : (
          <IllustratedMessage>
            <CloudUpload />
            <Heading>Drag and drop your EPUB file</Heading>
            <Content>Or, select a file from your computer</Content>
            <ButtonGroup>
              <Button variant="accent" onPress={handleBrowseFiles}>
                Browse files
              </Button>
            </ButtonGroup>
          </IllustratedMessage>
        )}
      </DropZone>

      <div className={actionsStyle}>
        <ActionButton onPress={() => console.log('/library')}>
          Go to Library
        </ActionButton>
      </div>
    </div>
  );
}

export default UploadPage;
