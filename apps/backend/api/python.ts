/**
 * Python API wrapper for calling Python functions from TypeScript/JavaScript
 * This module provides type-safe interfaces to the Python functions defined in src-tauri/src-python/main.py
 */
// Type definitions for Python function parameters and returns

export interface TextAnalysis {
  word_count: number;
  char_count: number;
  sentence_count: number;
  paragraph_count: number;
  average_word_length: number;
}

export interface ReadingTime {
  minutes: number;
  seconds: number;
  total_seconds: number;
  word_count: number;
}

export interface TextStatistics {
  basic_stats: TextAnalysis;
  readability: {
    average_words_per_sentence: number;
    average_syllables_per_word: number;
    flesch_reading_ease: number;
    difficulty_level: string;
  };
  reading_time: ReadingTime;
}

export interface BookMetadata {
  title?: string;
  title_lowercase?: string;
  author?: string | string[];
  isbn?: string;
  isbn_valid?: boolean;
  description?: string;
  description_keywords?: string[];
  book_hash?: string;
  [key: string]: any;
}

/**
 * Python API class for book processing and text analysis
 */
export class PythonAPI {
  private static instance: PythonAPI;
  private initialized: boolean = false;

  private constructor() {}

  /**
   * Get singleton instance of PythonAPI
   */
  public static getInstance(): PythonAPI {
    if (!PythonAPI.instance) {
      PythonAPI.instance = new PythonAPI();
    }
    return PythonAPI.instance;
  }

  /**
   * Initialize the Python API by registering all functions
   * Call this once at application startup
   */
  public async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      // Register all Python functions for easier calling
      const functions = [
        'analyze_text',
        'extract_keywords',
        'calculate_reading_time',
        'generate_book_hash',
        'clean_text',
        'extract_sentences',
        'get_text_statistics',
        'process_book_metadata',
        'validate_isbn',
        'format_author_name'
      ];

      for (const func of functions) {
        await registerJs(func);
      }

      this.initialized = true;
      console.log('Python API initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Python API:', error);
      throw error;
    }
  }

  /**
   * Analyze text and return various metrics
   * @param text The text to analyze
   * @returns Text analysis results
   */
  public async analyzeText(text: string): Promise<TextAnalysis> {
    try {
      const result = await callFunction('analyze_text', [text]);
      return JSON.parse(result);
    } catch (error) {
      console.error('Error analyzing text:', error);
      throw error;
    }
  }

  /**
   * Extract keywords from text using frequency analysis
   * @param text The text to extract keywords from
   * @param maxKeywords Maximum number of keywords to return (default: 10)
   * @returns List of extracted keywords
   */
  public async extractKeywords(text: string, maxKeywords: number = 10): Promise<string[]> {
    try {
      const result = await callFunction('extract_keywords', [text, maxKeywords]);
      return JSON.parse(result);
    } catch (error) {
      console.error('Error extracting keywords:', error);
      throw error;
    }
  }

  /**
   * Calculate estimated reading time for text
   * @param text The text to calculate reading time for
   * @param wordsPerMinute Average reading speed (default: 200 WPM)
   * @returns Reading time information
   */
  public async calculateReadingTime(text: string, wordsPerMinute: number = 200): Promise<ReadingTime> {
    try {
      const result = await callFunction('calculate_reading_time', [text, wordsPerMinute]);
      return JSON.parse(result);
    } catch (error) {
      console.error('Error calculating reading time:', error);
      throw error;
    }
  }

  /**
   * Generate a unique hash for a book
   * @param title Book title
   * @param author Book author
   * @param content Optional book content for more unique hash
   * @returns SHA256 hash string
   */
  public async generateBookHash(title: string, author: string, content?: string): Promise<string> {
    try {
      const result = await callFunction('generate_book_hash', [title, author, content]);
      return JSON.parse(result);
    } catch (error) {
      console.error('Error generating book hash:', error);
      throw error;
    }
  }

  /**
   * Clean and normalize text
   * @param text Text to clean
   * @returns Cleaned text
   */
  public async cleanText(text: string): Promise<string> {
    try {
      const result = await callFunction('clean_text', [text]);
      return JSON.parse(result);
    } catch (error) {
      console.error('Error cleaning text:', error);
      throw error;
    }
  }

  /**
   * Extract sentences from text
   * @param text Text to extract sentences from
   * @param maxSentences Maximum number of sentences to return (optional)
   * @returns List of sentences
   */
  public async extractSentences(text: string, maxSentences?: number): Promise<string[]> {
    try {
      const params = maxSentences !== undefined ? [text, maxSentences] : [text, null];
      const result = await callFunction('extract_sentences', params);
      return JSON.parse(result);
    } catch (error) {
      console.error('Error extracting sentences:', error);
      throw error;
    }
  }

  /**
   * Get comprehensive text statistics
   * @param text Text to analyze
   * @returns Detailed statistics including readability metrics
   */
  public async getTextStatistics(text: string): Promise<TextStatistics> {
    try {
      const result = await callFunction('get_text_statistics', [text]);
      return JSON.parse(result);
    } catch (error) {
      console.error('Error getting text statistics:', error);
      throw error;
    }
  }

  /**
   * Process and enhance book metadata
   * @param metadata Raw book metadata
   * @returns Processed metadata with additional fields
   */
  public async processBookMetadata(metadata: Record<string, any>): Promise<BookMetadata> {
    try {
      const result = await callFunction('process_book_metadata', [metadata]);
      return JSON.parse(result);
    } catch (error) {
      console.error('Error processing book metadata:', error);
      throw error;
    }
  }

  /**
   * Validate ISBN-10 or ISBN-13
   * @param isbn ISBN string to validate
   * @returns True if valid, false otherwise
   */
  public async validateISBN(isbn: string): Promise<boolean> {
    try {
      const result = await callFunction('validate_isbn', [isbn]);
      return JSON.parse(result);
    } catch (error) {
      console.error('Error validating ISBN:', error);
      throw error;
    }
  }

  /**
   * Format author name consistently
   * @param author Author name to format
   * @returns Formatted author name
   */
  public async formatAuthorName(author: string): Promise<string> {
    try {
      const result = await callFunction('format_author_name', [author]);
      return JSON.parse(result);
    } catch (error) {
      console.error('Error formatting author name:', error);
      throw error;
    }
  }

  /**
   * Direct call to any Python function (for development/testing)
   * Use with caution - prefer typed methods above
   * @param functionName Name of the Python function to call
   * @param args Arguments to pass to the function
   * @returns Result from the Python function
   */
  public async callPythonFunction<T = any>(functionName: string, args: any[] = []): Promise<T> {
    try {
      const result = await callFunction(functionName, args);
      return JSON.parse(result);
    } catch (error) {
      console.error(`Error calling Python function ${functionName}:`, error);
      throw error;
    }
  }
}

// Export singleton instance
export const pythonAPI = PythonAPI.getInstance();

// Export convenience functions for direct use
export const python = {
  analyzeText: (text: string) => pythonAPI.analyzeText(text),
  extractKeywords: (text: string, maxKeywords?: number) => pythonAPI.extractKeywords(text, maxKeywords),
  calculateReadingTime: (text: string, wordsPerMinute?: number) => pythonAPI.calculateReadingTime(text, wordsPerMinute),
  generateBookHash: (title: string, author: string, content?: string) => pythonAPI.generateBookHash(title, author, content),
  cleanText: (text: string) => pythonAPI.cleanText(text),
  extractSentences: (text: string, maxSentences?: number) => pythonAPI.extractSentences(text, maxSentences),
  getTextStatistics: (text: string) => pythonAPI.getTextStatistics(text),
  processBookMetadata: (metadata: Record<string, any>) => pythonAPI.processBookMetadata(metadata),
  validateISBN: (isbn: string) => pythonAPI.validateISBN(isbn),
  formatAuthorName: (author: string) => pythonAPI.formatAuthorName(author),
};

// Initialize Python API when module is imported
// You may want to call this explicitly in your app initialization instead
if (typeof window !== 'undefined') {
  pythonAPI.initialize().catch(console.error);
}
