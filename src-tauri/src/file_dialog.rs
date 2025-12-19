use tauri::AppHandle;
use tauri_plugin_dialog::{DialogExt, MessageDialogKind};

#[tauri::command]
pub async fn open_file_dialog(app: AppHandle) -> Result<Option<String>, String> {
    let file_path = app
        .dialog()
        .file()
        .add_filter("EPUB Files", &["epub"])
        .blocking_pick_file();

    Ok(file_path.map(|path| match path {
        tauri_plugin_dialog::FilePath::Path(p) => p.to_string_lossy().to_string(),
        tauri_plugin_dialog::FilePath::Url(u) => u.to_string(),
    }))
}

#[tauri::command]
pub async fn show_success_dialog(app: AppHandle, message: String) -> Result<(), String> {
    app.dialog()
        .message(message)
        .kind(MessageDialogKind::Info)
        .title("Success")
        .blocking_show();

    Ok(())
}

#[tauri::command]
pub async fn show_error_dialog(app: AppHandle, message: String) -> Result<(), String> {
    app.dialog()
        .message(message)
        .kind(MessageDialogKind::Error)
        .title("Error")
        .blocking_show();

    Ok(())
}

#[tauri::command]
pub async fn show_warning_dialog(app: AppHandle, message: String) -> Result<(), String> {
    app.dialog()
        .message(message)
        .kind(MessageDialogKind::Warning)
        .title("Warning")
        .blocking_show();

    Ok(())
}
