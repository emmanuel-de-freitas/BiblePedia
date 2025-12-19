use rusqlite::{params, Connection, Result as SqliteResult};
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::State;
use thiserror::Error;

use crate::epub::EpubMetadata;

#[derive(Error, Debug)]
pub enum DatabaseError {
    #[error("Database error: {0}")]
    Sqlite(#[from] rusqlite::Error),
    #[error("Lock error: {0}")]
    Lock(String),
    #[error("Not found")]
    NotFound,
}

impl Serialize for DatabaseError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

pub struct DatabaseState {
    pub connection: Mutex<Connection>,
}

impl DatabaseState {
    pub fn new(db_path: PathBuf) -> SqliteResult<Self> {
        let conn = Connection::open(db_path)?;
        Ok(Self {
            connection: Mutex::new(conn),
        })
    }

    pub fn init_tables(&self) -> SqliteResult<()> {
        let conn = self.connection.lock().unwrap();

        conn.execute(
            "CREATE TABLE IF NOT EXISTS books (
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
            )",
            [],
        )?;

        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_books_title ON books(title)",
            [],
        )?;

        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_books_author ON books(author)",
            [],
        )?;

        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_books_isbn ON books(isbn)",
            [],
        )?;

        Ok(())
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Book {
    pub id: i64,
    pub title: Option<String>,
    pub author: Option<String>,
    pub publisher: Option<String>,
    pub description: Option<String>,
    pub language: Option<String>,
    pub isbn: Option<String>,
    pub publication_date: Option<String>,
    pub cover_path: Option<String>,
    pub file_path: String,
    pub added_at: String,
    pub last_opened: Option<String>,
    pub current_page: i32,
    pub total_pages: i32,
}

#[tauri::command]
pub async fn init_database(state: State<'_, DatabaseState>) -> Result<(), String> {
    state
        .init_tables()
        .map_err(|e| format!("Failed to initialize database: {}", e))
}

#[tauri::command]
pub async fn save_book_metadata(
    metadata: EpubMetadata,
    state: State<'_, DatabaseState>,
) -> Result<i64, String> {
    let conn = state
        .connection
        .lock()
        .map_err(|e| format!("Lock error: {}", e))?;

    // Check if book already exists
    let exists: bool = conn
        .query_row(
            "SELECT EXISTS(SELECT 1 FROM books WHERE file_path = ?1)",
            params![&metadata.file_path],
            |row| row.get(0),
        )
        .map_err(|e| e.to_string())?;

    if exists {
        // Update existing book
        conn.execute(
            "UPDATE books SET
                title = ?1,
                author = ?2,
                publisher = ?3,
                description = ?4,
                language = ?5,
                isbn = ?6,
                publication_date = ?7,
                cover_path = ?8
            WHERE file_path = ?9",
            params![
                metadata.title,
                metadata.author,
                metadata.publisher,
                metadata.description,
                metadata.language,
                metadata.isbn,
                metadata.publication_date,
                metadata.cover_path,
                &metadata.file_path,
            ],
        )
        .map_err(|e| e.to_string())?;

        // Get the existing book ID
        let id: i64 = conn
            .query_row(
                "SELECT id FROM books WHERE file_path = ?1",
                params![&metadata.file_path],
                |row| row.get(0),
            )
            .map_err(|e| e.to_string())?;

        Ok(id)
    } else {
        // Insert new book
        conn.execute(
            "INSERT INTO books (
                title, author, publisher, description, language,
                isbn, publication_date, cover_path, file_path
            ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)",
            params![
                metadata.title,
                metadata.author,
                metadata.publisher,
                metadata.description,
                metadata.language,
                metadata.isbn,
                metadata.publication_date,
                metadata.cover_path,
                metadata.file_path,
            ],
        )
        .map_err(|e| e.to_string())?;

        Ok(conn.last_insert_rowid())
    }
}

#[tauri::command]
pub async fn get_all_books(state: State<'_, DatabaseState>) -> Result<Vec<Book>, String> {
    let conn = state
        .connection
        .lock()
        .map_err(|e| format!("Lock error: {}", e))?;

    let mut stmt = conn
        .prepare(
            "SELECT id, title, author, publisher, description, language,
                    isbn, publication_date, cover_path, file_path,
                    added_at, last_opened, current_page, total_pages
             FROM books
             ORDER BY added_at DESC",
        )
        .map_err(|e| e.to_string())?;

    let books = stmt
        .query_map([], |row| {
            Ok(Book {
                id: row.get(0)?,
                title: row.get(1)?,
                author: row.get(2)?,
                publisher: row.get(3)?,
                description: row.get(4)?,
                language: row.get(5)?,
                isbn: row.get(6)?,
                publication_date: row.get(7)?,
                cover_path: row.get(8)?,
                file_path: row.get(9)?,
                added_at: row.get(10)?,
                last_opened: row.get(11)?,
                current_page: row.get(12)?,
                total_pages: row.get(13)?,
            })
        })
        .map_err(|e| e.to_string())?
        .collect::<SqliteResult<Vec<Book>>>()
        .map_err(|e| e.to_string())?;

    Ok(books)
}

#[tauri::command]
pub async fn get_book_by_id(id: i64, state: State<'_, DatabaseState>) -> Result<Book, String> {
    let conn = state
        .connection
        .lock()
        .map_err(|e| format!("Lock error: {}", e))?;

    let book = conn
        .query_row(
            "SELECT id, title, author, publisher, description, language,
                    isbn, publication_date, cover_path, file_path,
                    added_at, last_opened, current_page, total_pages
             FROM books WHERE id = ?1",
            params![id],
            |row| {
                Ok(Book {
                    id: row.get(0)?,
                    title: row.get(1)?,
                    author: row.get(2)?,
                    publisher: row.get(3)?,
                    description: row.get(4)?,
                    language: row.get(5)?,
                    isbn: row.get(6)?,
                    publication_date: row.get(7)?,
                    cover_path: row.get(8)?,
                    file_path: row.get(9)?,
                    added_at: row.get(10)?,
                    last_opened: row.get(11)?,
                    current_page: row.get(12)?,
                    total_pages: row.get(13)?,
                })
            },
        )
        .map_err(|e| e.to_string())?;

    Ok(book)
}

#[tauri::command]
pub async fn search_books(
    query: String,
    state: State<'_, DatabaseState>,
) -> Result<Vec<Book>, String> {
    let conn = state
        .connection
        .lock()
        .map_err(|e| format!("Lock error: {}", e))?;

    let search_query = format!("%{}%", query);

    let mut stmt = conn
        .prepare(
            "SELECT id, title, author, publisher, description, language,
                    isbn, publication_date, cover_path, file_path,
                    added_at, last_opened, current_page, total_pages
             FROM books
             WHERE title LIKE ?1 OR author LIKE ?1 OR isbn LIKE ?1
             ORDER BY added_at DESC",
        )
        .map_err(|e| e.to_string())?;

    let books = stmt
        .query_map(params![search_query], |row| {
            Ok(Book {
                id: row.get(0)?,
                title: row.get(1)?,
                author: row.get(2)?,
                publisher: row.get(3)?,
                description: row.get(4)?,
                language: row.get(5)?,
                isbn: row.get(6)?,
                publication_date: row.get(7)?,
                cover_path: row.get(8)?,
                file_path: row.get(9)?,
                added_at: row.get(10)?,
                last_opened: row.get(11)?,
                current_page: row.get(12)?,
                total_pages: row.get(13)?,
            })
        })
        .map_err(|e| e.to_string())?
        .collect::<SqliteResult<Vec<Book>>>()
        .map_err(|e| e.to_string())?;

    Ok(books)
}

#[tauri::command]
pub async fn delete_book(id: i64, state: State<'_, DatabaseState>) -> Result<(), String> {
    let conn = state
        .connection
        .lock()
        .map_err(|e| format!("Lock error: {}", e))?;

    conn.execute("DELETE FROM books WHERE id = ?1", params![id])
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn update_book_progress(
    id: i64,
    current_page: i32,
    state: State<'_, DatabaseState>,
) -> Result<(), String> {
    let conn = state
        .connection
        .lock()
        .map_err(|e| format!("Lock error: {}", e))?;

    conn.execute(
        "UPDATE books SET current_page = ?1, last_opened = CURRENT_TIMESTAMP WHERE id = ?2",
        params![current_page, id],
    )
    .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn get_recently_opened(
    limit: i32,
    state: State<'_, DatabaseState>,
) -> Result<Vec<Book>, String> {
    let conn = state
        .connection
        .lock()
        .map_err(|e| format!("Lock error: {}", e))?;

    let mut stmt = conn
        .prepare(
            "SELECT id, title, author, publisher, description, language,
                    isbn, publication_date, cover_path, file_path,
                    added_at, last_opened, current_page, total_pages
             FROM books
             WHERE last_opened IS NOT NULL
             ORDER BY last_opened DESC
             LIMIT ?1",
        )
        .map_err(|e| e.to_string())?;

    let books = stmt
        .query_map(params![limit], |row| {
            Ok(Book {
                id: row.get(0)?,
                title: row.get(1)?,
                author: row.get(2)?,
                publisher: row.get(3)?,
                description: row.get(4)?,
                language: row.get(5)?,
                isbn: row.get(6)?,
                publication_date: row.get(7)?,
                cover_path: row.get(8)?,
                file_path: row.get(9)?,
                added_at: row.get(10)?,
                last_opened: row.get(11)?,
                current_page: row.get(12)?,
                total_pages: row.get(13)?,
            })
        })
        .map_err(|e| e.to_string())?
        .collect::<SqliteResult<Vec<Book>>>()
        .map_err(|e| e.to_string())?;

    Ok(books)
}
