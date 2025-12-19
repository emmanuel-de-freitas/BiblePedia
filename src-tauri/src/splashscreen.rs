use std::thread;
use std::time::Duration;
use tauri::{AppHandle, Emitter, Manager};

/// Initialize the splashscreen and handle the transition to the main window
pub fn init_splashscreen(app: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let splashscreen_window = app
        .get_webview_window("splashscreen")
        .ok_or("Failed to get splashscreen window")?;
    let dashboard_window = app
        .get_webview_window("dashboard")
        .ok_or("Failed to get dashboard window")?;

    // Show the splashscreen
    splashscreen_window.show()?;

    // Hide the dashboard initially
    dashboard_window.hide()?;

    // Clone handles for the thread
    let app_handle = app.clone();

    // Spawn a thread to perform initialization tasks
    thread::spawn(move || {
        // Perform initialization with progress updates
        perform_initialization(&app_handle);

        // After initialization, transition to the main window
        if let Err(e) = close_splashscreen(&app_handle) {
            eprintln!("Error closing splashscreen: {}", e);
        }
    });

    Ok(())
}

/// Perform initialization steps with progress updates
fn perform_initialization(app: &AppHandle) {
    let steps = vec![
        ("Initializing application...", 10),
        ("Loading database...", 30),
        ("Setting up resources...", 50),
        ("Loading configuration...", 70),
        ("Preparing interface...", 90),
        ("Ready!", 100),
    ];

    for (message, progress) in steps {
        // Update splashscreen status
        if let Err(e) =
            update_splashscreen_status(app.clone(), message.to_string(), Some(progress as f32))
        {
            eprintln!("Failed to update status: {}", e);
        }

        // Simulate work being done
        thread::sleep(Duration::from_millis(400));
    }

    // Small delay before closing
    thread::sleep(Duration::from_millis(300));
}

/// Close the splashscreen and show the main dashboard window
pub fn close_splashscreen(app: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let splashscreen_window = app
        .get_webview_window("splashscreen")
        .ok_or("Failed to get splashscreen window")?;
    let dashboard_window = app
        .get_webview_window("dashboard")
        .ok_or("Failed to get dashboard window")?;

    // Show the main dashboard
    dashboard_window.show()?;
    dashboard_window.set_focus()?;

    // Close the splashscreen
    splashscreen_window.close()?;

    Ok(())
}

/// Command to manually close the splashscreen from the frontend
#[tauri::command]
pub fn close_splashscreen_command(app: AppHandle) -> Result<(), String> {
    close_splashscreen(&app).map_err(|e| format!("Failed to close splashscreen: {}", e))
}

/// Command to update splashscreen loading progress or message
#[tauri::command]
pub fn update_splashscreen_status(
    app: AppHandle,
    message: String,
    progress: Option<f32>,
) -> Result<(), String> {
    let splashscreen_window = app
        .get_webview_window("splashscreen")
        .ok_or("Failed to get splashscreen window")?;

    // Emit an event to the splashscreen with the status update
    splashscreen_window
        .emit("splashscreen-status", (message, progress))
        .map_err(|e| format!("Failed to emit status: {}", e))?;

    Ok(())
}
