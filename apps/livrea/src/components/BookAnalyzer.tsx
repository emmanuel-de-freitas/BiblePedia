/**
 * BookAnalyzer Component
 * Demonstrates how to use Python functions from React/TypeScript
 */

import { useState } from 'react';
import { Button, Text, Heading, ProgressBar, TextArea } from '@react-spectrum/s2';
import { pythonAPI, type TextStatistics, type BookMetadata } from '../api/python';

export function BookAnalyzer() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [statistics, setStatistics] = useState<TextStatistics | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [bookMetadata, setBookMetadata] = useState<BookMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Example book metadata for testing
  const sampleMetadata = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream through the eyes of narrator Nick Carraway.',
  };

  const analyzeText = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Get comprehensive text statistics
      const stats = await pythonAPI.getTextStatistics(text);
      setStatistics(stats);

      // Extract keywords
      const extractedKeywords = await pythonAPI.extractKeywords(text, 10);
      setKeywords(extractedKeywords);

      console.log('Analysis complete:', { stats, keywords: extractedKeywords });
    } catch (err) {
      setError(`Failed to analyze text: ${err}`);
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const processMetadata = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const processed = await pythonAPI.processBookMetadata(sampleMetadata);
      setBookMetadata(processed);
      console.log('Processed metadata:', processed);
    } catch (err) {
      setError(`Failed to process metadata: ${err}`);
      console.error('Metadata processing error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const validateISBN = async () => {
    const isbn = '978-0-7432-7356-5';
    try {
      const isValid = await pythonAPI.validateISBN(isbn);
      alert(`ISBN ${isbn} is ${isValid ? 'valid' : 'invalid'}`);
    } catch (err) {
      setError(`Failed to validate ISBN: ${err}`);
    }
  };

  const cleanTextExample = async () => {
    const dirtyText = '  This   is    some    text   with   extra    spaces   ';
    try {
      const cleaned = await pythonAPI.cleanText(dirtyText);
      alert(`Original: "${dirtyText}"\nCleaned: "${cleaned}"`);
    } catch (err) {
      setError(`Failed to clean text: ${err}`);
    }
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px' }}>
      <Heading level={1}>Book Analyzer - Python Integration Demo</Heading>

      <div style={{ marginTop: '16px' }}>
        <Text>
          This component demonstrates calling Python functions from React using tauri-plugin-python.
        </Text>
      </div>

      {/* Text Analysis Section */}
      <div style={{ marginTop: '32px' }}>
        <Heading level={2}>Text Analysis</Heading>

        <div style={{ marginTop: '16px' }}>
          <TextArea
            id='text-input'
            value={text}
            onChange={(value) => setText(value)}
            label="Enter text to analyze"
            placeholder="Paste or type some text here to analyze..."
            size="L" />
        </div>

        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <Button variant="accent" onPress={analyzeText} isDisabled={isAnalyzing}>
            {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
          </Button>
        </div>

        {isAnalyzing && (
          <div style={{ marginTop: '16px' }}>
            <ProgressBar label="Analyzing..." isIndeterminate />
          </div>
        )}

        {/* Display Results */}
        {statistics && (
          <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Heading level={3}>Analysis Results</Heading>

            {/* Basic Stats */}
            <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
              <Heading level={4}>Basic Statistics</Heading>
              <Text>Word Count: {statistics.basic_stats.word_count}</Text>
              <Text>Character Count: {statistics.basic_stats.char_count}</Text>
              <Text>Sentence Count: {statistics.basic_stats.sentence_count}</Text>
              <Text>Paragraph Count: {statistics.basic_stats.paragraph_count}</Text>
              <Text>Average Word Length: {statistics.basic_stats.average_word_length}</Text>
            </div>

            {/* Readability */}
            <div style={{ backgroundColor: '#dbeafe', padding: '16px', borderRadius: '8px' }}>
              <Heading level={4}>Readability</Heading>
              <Text>Average Words per Sentence: {statistics.readability.average_words_per_sentence}</Text>
              <Text>Average Syllables per Word: {statistics.readability.average_syllables_per_word}</Text>
              <Text>Flesch Reading Ease: {statistics.readability.flesch_reading_ease}</Text>
              <Text>Difficulty Level: {statistics.readability.difficulty_level}</Text>
            </div>

            {/* Reading Time */}
            <div style={{ backgroundColor: '#d1fae5', padding: '16px', borderRadius: '8px' }}>
              <Heading level={4}>Reading Time</Heading>
              <Text>Estimated Time: {statistics.reading_time.minutes} minutes {statistics.reading_time.seconds} seconds</Text>
              <Text>Word Count: {statistics.reading_time.word_count}</Text>
            </div>

            {/* Keywords */}
            {keywords.length > 0 && (
              <div style={{ backgroundColor: '#fef3c7', padding: '16px', borderRadius: '8px' }}>
                <Heading level={4}>Keywords</Heading>
                <div style={{ display: 'flex', gap: '4px', flexDirection: 'row', flexWrap: 'wrap' }}>
                  {keywords.map((keyword, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: '#fed7aa',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      <Text>{keyword}</Text>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Book Metadata Section */}
      <div style={{ marginTop: '48px' }}>
        <Heading level={2}>Book Metadata Processing</Heading>

        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <Button variant="primary" onPress={processMetadata} isDisabled={isAnalyzing}>
            Process Sample Metadata
          </Button>
          <Button variant="secondary" onPress={validateISBN}>
            Validate ISBN Example
          </Button>
          <Button variant="secondary" onPress={cleanTextExample}>
            Clean Text Example
          </Button>
        </div>

        {bookMetadata && (
          <div style={{ marginTop: '32px', backgroundColor: '#e9d5ff', padding: '16px', borderRadius: '8px' }}>
            <Heading level={3}>Processed Metadata</Heading>
            <Text>Title: {bookMetadata.title}</Text>
            <Text>Author: {bookMetadata.author}</Text>
            <Text>ISBN Valid: {bookMetadata.isbn_valid ? 'Yes' : 'No'}</Text>
            <Text>Book Hash: {bookMetadata.book_hash?.substring(0, 16)}...</Text>
            {bookMetadata.description_keywords && (
              <div style={{ marginTop: '8px' }}>
                <Text>Keywords from Description:</Text>
                <Text>{bookMetadata.description_keywords.join(', ')}</Text>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div style={{ marginTop: '16px', backgroundColor: '#fee2e2', padding: '16px', borderRadius: '8px' }}>
          <Text>{error}</Text>
        </div>
      )}
    </div>
  );
}
