// //import { invoke } from '@tauri-apps/api/core';
// import type { Book } from "@/types";

// /**
//  * Load books from the library.
//  * @returns Promise<Book[]> that resolves with an array of books.
//  */
// async function loadBooks(): Promise<Book[]> {
//   try {
//     const allBooks = await invoke<Book[]>('get_all_books');
//     return allBooks;
//   } catch (error) {
//     console.error('Failed to load books:', error);
//     await invoke('show_error_dialog', {
//       message: `Failed to load library: ${error}`,
//     });
//     throw error;
//   } finally {
//     await invoke('show_success_dialog', {
//       message: 'Library loaded successfully',
//     });
//   }
// };

// /**
//  * Search books in the library.
//  * @param query The search query.
//  * @returns Promise<Book[]> that resolves with an array of search results.
//  */
// async function searchBooks(query: string): Promise<Book[]> {
//   try {
//     const searchResults = await invoke<Book[]>('search_books', { query });
//     return searchResults;
//   } catch (error) {
//     console.error('Failed to search books:', error);
//     await invoke('show_error_dialog', {
//       message: `Failed to search library: ${error}`,
//     });
//     throw error;
//   }
// };

// /**
//  * Delete a book from the library.
//  * @param id The ID of the book to delete.
//  * @returns Promise<void> that resolves when the book is deleted.
//  */
// async function deleteBook(id: string): Promise<void> {
//   try {
//     await invoke('delete_book', { id });
//   } catch (error) {
//     console.error('Failed to delete book:', error);
//     await invoke('show_error_dialog', {
//       message: `Failed to delete book: ${error}`,
//     });
//   }
// };

// export {
//   loadBooks,
//   searchBooks,
//   deleteBook,
// }
