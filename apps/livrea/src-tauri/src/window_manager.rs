use tauri::{AppHandle, Manager};
// Initialize the splashscreen and handle the transition to the main window
pub fn init_window(app: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let dashboard_window = app
        .get_webview_window("dashboard")
        .ok_or("Failed to get dashboard window")?;

    // Create the dashboard initially
    dashboard_window.show()?;

    Ok(())
}
