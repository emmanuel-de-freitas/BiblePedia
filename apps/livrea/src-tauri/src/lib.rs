mod database;
mod epub;
mod file_dialog;
mod window_manager;
mod theme;

use database::DatabaseState;
use epub::EpubState;
use std::sync::Mutex;
use tauri::Manager;
use window_manager::init_window;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Define Python functions that will be available from JavaScript
    let python_functions = vec![
        // Text processing functions
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
        // Appwrite client functions
        "appwrite_init_client",
        "appwrite_check_initialized",
        // Appwrite Account service
        "appwrite_account_get",
        "appwrite_account_create",
        "appwrite_account_create_email_session",
        "appwrite_account_delete_session",
        "appwrite_account_list_sessions",
        "appwrite_account_update_name",
        "appwrite_account_update_email",
        "appwrite_account_update_password",
        // Appwrite Database service
        "appwrite_database_list_documents",
        "appwrite_database_create_document",
        "appwrite_database_get_document",
        "appwrite_database_update_document",
        "appwrite_database_delete_document",
        // Appwrite Storage service
        "appwrite_storage_list_files",
        "appwrite_storage_get_file",
        "appwrite_storage_delete_file",
        "appwrite_storage_get_file_download_url",
        "appwrite_storage_get_file_view_url",
        // Appwrite Teams service
        "appwrite_teams_list",
        "appwrite_teams_create",
        "appwrite_teams_get",
        "appwrite_teams_update",
        "appwrite_teams_delete",
        "appwrite_teams_list_memberships",
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_python::init_and_register(python_functions))
        // Listen for OS theme changes and forward them to the frontend
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::ThemeChanged(theme) = event {
                theme::handle_theme_changed(window, *theme);
            }
        })
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

            // Initialize theme state and apply default behavior
            theme::init_theme(app)?;

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
            database::get_recently_opened,
            // Theme commands
            theme::get_theme_mode,
            theme::set_theme_mode,
            theme::get_current_theme
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
