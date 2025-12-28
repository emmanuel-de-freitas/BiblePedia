// Commands to manage theme settings, and listeners to the OS scheme.
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::{Emitter, Manager, Window};

// Event name emitted to the frontend when the theme changes
pub const THEME_CHANGED_EVENT: &str = "theme-changed";

// Frontend-facing theme type (simple and serializable)
#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum ThemeKind {
    Light,
    Dark
}

impl From<tauri::Theme> for ThemeKind {
    fn from(value: tauri::Theme) -> Self {
        match value {
            tauri::Theme::Light => ThemeKind::Light,
            tauri::Theme::Dark => ThemeKind::Dark,
            // Fallback for any additional variants (e.g., HighContrast on some platforms)
            _ => ThemeKind::Light,
        }
    }
}

// Whether we follow the system (Dynamic) or force Light/Dark
#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum ThemeMode {
    Light,
    Dark,
    Dynamic,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ThemePayload {
    pub mode: ThemeMode,
    pub theme: ThemeKind,
}

pub struct ThemeState(Mutex<ThemeInner>);

#[derive(Debug, Clone, Copy)]
struct ThemeInner {
    mode: ThemeMode,
    current: ThemeKind,
}

impl ThemeState {
    fn new(initial_mode: ThemeMode, current: ThemeKind) -> Self {
        Self(Mutex::new(ThemeInner {
            mode: initial_mode,
            current,
        }))
    }

    fn get_mode(&self) -> ThemeMode {
        self.0.lock().unwrap().mode
    }

    fn set_mode(&self, mode: ThemeMode) {
        self.0.lock().unwrap().mode = mode;
    }

    fn get_current(&self) -> ThemeKind {
        self.0.lock().unwrap().current
    }

    fn set_current(&self, theme: ThemeKind) {
        self.0.lock().unwrap().current = theme;
    }
}

// Initialize theme state and broadcast initial payload
pub fn init_theme<R: tauri::Runtime>(app: &tauri::App<R>) -> tauri::Result<()> {
    // Default to Dynamic following the system
    let mode = ThemeMode::Dynamic;

    // Try to infer current theme from any existing window (e.g., "dashboard")
    let current = infer_system_theme_from_any_window(app).unwrap_or(ThemeKind::Light);

    app.manage(ThemeState::new(mode, current));

    // Emit initial theme to all windows
    let payload = ThemePayload { mode, theme: current };
    app.emit(THEME_CHANGED_EVENT, &payload)?;
    Ok(())
}

// Works with both App and AppHandle via the Manager trait.
// Specify the Runtime type parameter explicitly to avoid inference issues on stable Rust.
fn infer_system_theme_from_any_window<R: tauri::Runtime>(app: &impl Manager<R>) -> Option<ThemeKind> {
    // Prefer a specific known window if it exists
    if let Some(win) = app.get_webview_window("dashboard") {
        // Be explicit to help type inference on stable Rust
        return win.theme().ok().map(ThemeKind::from);
    }
    // Fallback to the first available window
    for win in app.webview_windows().values() {
        if let Ok(t) = win.theme() {
            return Some(ThemeKind::from(t));
        }
    }
    None
}

// Called from lib.rs on WindowEvent::ThemeChanged
pub fn handle_theme_changed(window: &Window, theme: tauri::Theme) {
    let app = window.app_handle();
    if let Some(state) = app.try_state::<ThemeState>() {
        // Only react to OS changes when in Dynamic mode
        if state.get_mode() == ThemeMode::Dynamic {
            let new_kind: ThemeKind = theme.into();
            state.set_current(new_kind);
            let payload = ThemePayload {
                mode: ThemeMode::Dynamic,
                theme: new_kind,
            };
            // Broadcast to all windows so UI can update
            let _ = app.emit(THEME_CHANGED_EVENT, &payload);
        }
    }
}

// --- Commands ---

#[tauri::command]
pub fn get_theme_mode(state: tauri::State<ThemeState>) -> ThemeMode {
    state.get_mode()
}

#[tauri::command]
pub fn get_current_theme(state: tauri::State<ThemeState>) -> ThemeKind {
    state.get_current()
}

#[tauri::command]
pub fn set_theme_mode(window: Window, state: tauri::State<ThemeState>, mode: ThemeMode) -> Result<(), String> {
    state.set_mode(mode);
    let app = window.app_handle();

    // Update current theme immediately depending on the selected mode
    let new_current = match mode {
        ThemeMode::Light => ThemeKind::Light,
        ThemeMode::Dark => ThemeKind::Dark,
        ThemeMode::Dynamic => infer_system_theme_from_any_window(app).unwrap_or(ThemeKind::Light),
    };
    state.set_current(new_current);

    // Broadcast the change
    let payload = ThemePayload {
        mode,
        theme: new_current,
    };
    app.emit(THEME_CHANGED_EVENT, &payload)
        .map_err(|e| e.to_string())?;

    Ok(())
}

