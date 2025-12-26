mod database;
mod epub;
mod file_dialog;
mod window_manager;

use database::DatabaseState;
use epub::EpubState;
use std::sync::Mutex;
use tauri::Manager;
use window_manager::init_window;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Define Python functions that will be available from JavaScript
    let python_functions = vec![
        "analyze_text",
        "extract_keywords",
        "calculate_reading_time",
        "generate_book_hash",
        "clean_text",
        "extract_sentences",
        "get_text_statistics",
        "process_book_metadata",
        "validate_isbn",
        "format_author_name",
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_python::init_and_register(python_functions))
        .setup(|app| {
            // Initialize window
            let app_handle = app.handle().clone();
            if let Err(e) = init_window(&app_handle) {
                eprintln!("Failed to initialize window: {}", e);
            }

            // Initialize database
            let app_dir = app
                .path()
                .app_data_dir()
                .expect("Failed to get app data directory");

            std::fs::create_dir_all(&app_dir).expect("Failed to create app directory");

            let db_path = app_dir.join("livres.db");
            let db_state = DatabaseState::new(db_path).expect("Failed to create database");
            db_state
                .init_tables()
                .expect("Failed to initialize database tables");

            // Initialize EPUB state
            let epub_state = EpubState {
                current_epub: Mutex::new(None),
            };

            // Add states to app
            app.manage(db_state);
            app.manage(epub_state);

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            // File dialog commands
            file_dialog::open_file_dialog,
            file_dialog::show_success_dialog,
            file_dialog::show_error_dialog,
            file_dialog::show_warning_dialog,
            // EPUB commands
            epub::open_epub,
            epub::extract_epub_metadata,
            epub::get_epub_content,
            epub::get_epub_toc,
            epub::get_chapter_content,
            epub::get_file_content,
            epub::get_epub_stats,
            epub::get_current_epub,
            epub::set_current_epub,
            epub::clear_current_epub,
            // Database commands
            database::init_database,
            database::save_book_metadata,
            database::get_all_books,
            database::get_book_by_id,
            database::search_books,
            database::delete_book,
            database::update_book_progress,
            database::get_recently_opened
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
