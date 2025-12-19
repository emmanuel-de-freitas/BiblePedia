

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

export type {
  Book
}
