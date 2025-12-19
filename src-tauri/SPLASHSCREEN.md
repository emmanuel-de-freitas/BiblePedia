# Splashscreen Implementation Guide

This document describes how to use the splashscreen functionality in the Livrea Tauri application.

## Overview

The splashscreen is displayed when the application starts, showing a loading screen while the app initializes. Once initialization is complete, the splashscreen automatically closes and the main dashboard window appears.

## Architecture

### Configuration (`tauri.conf.json`)

Two windows are configured:

1. **Splashscreen Window** (`label: "splashscreen"`)
   - Small, centered window (700x400)
   - No decorations, always on top
   - Non-resizable
   - Loads `splashscreen.html`
   - `visible: false` - shown programmatically after initialization

2. **Dashboard Window** (`label: "dashboard"`)
   - Main application window (1000x700)
   - Transparent title bar
   - Resizable
   - `create: false` - created but hidden initially
   - Shown after splashscreen closes

### Rust Implementation (`src/splashscreen.rs`)

The module provides:

#### Functions

- `init_splashscreen(app: &AppHandle)` - Initializes and shows the splashscreen
- `close_splashscreen(app: &AppHandle)` - Closes splashscreen and shows dashboard
- `perform_initialization(app: &AppHandle)` - Executes initialization steps with progress updates

#### Tauri Commands

- `close_splashscreen_command(app: AppHandle)` - Manually close splashscreen from frontend
- `update_splashscreen_status(app: AppHandle, message: String, progress: Option<f32>)` - Update loading status

## Usage

### Basic Setup

The splashscreen is automatically initialized in `lib.rs`:

```rust
.setup(|app| {
    // Initialize splashscreen
    let app_handle = app.handle().clone();
    if let Err(e) = init_splashscreen(&app_handle) {
        eprintln!("Failed to initialize splashscreen: {}", e);
    }
    
    // ... rest of setup
    Ok(())
})
```

### Customizing Initialization

Edit the `perform_initialization` function in `splashscreen.rs` to customize the loading steps:

```rust
fn perform_initialization(app: &AppHandle) {
    let steps = vec![
        ("Loading database...", 25),
        ("Initializing plugins...", 50),
        ("Loading user preferences...", 75),
        ("Ready!", 100),
    ];

    for (message, progress) in steps {
        update_splashscreen_status(app.clone(), message.to_string(), Some(progress as f32))
            .ok();
        
        // Do actual work here
        thread::sleep(Duration::from_millis(500));
    }
}
```

### Frontend Integration

In your splashscreen HTML (`public/splashscreen.html`), listen for status updates:

```javascript
const { listen } = window.__TAURI__.event;

listen('splashscreen-status', (event) => {
    const [message, progress] = event.payload;
    
    // Update UI
    document.getElementById('status').textContent = message;
    if (progress !== null) {
        document.getElementById('progress').style.width = `${progress}%`;
    }
});
```

### Manual Control

You can manually close the splashscreen from the frontend:

```javascript
const { invoke } = window.__TAURI__.core;

// Close splashscreen manually
await invoke('close_splashscreen_command');
```

Or update status from the frontend:

```javascript
await invoke('update_splashscreen_status', {
    message: 'Custom loading message',
    progress: 45.5
});
```

## Customizing the Splashscreen

### Styling

Edit `public/splashscreen.html` to customize:

- **Background**: Change the gradient in `body` styles
- **Logo**: Replace the SVG or add an image
- **Colors**: Modify color values throughout the CSS
- **Animation**: Adjust keyframes and transitions
- **Size**: Update dimensions in `tauri.conf.json`

### Using a Custom Image

Replace the logo with an image:

```html
<div class="logo">
    <img src="/path/to/logo.png" alt="Logo" style="width: 100%; height: 100%;">
</div>
```

### Adding Background Image

Add to the `body` CSS:

```css
body {
    background-image: url('/path/to/background.jpg');
    background-size: cover;
    background-position: center;
}
```

## Integration with Initialization Tasks

### Database Initialization

Update the setup in `lib.rs` to emit progress:

```rust
.setup(|app| {
    let app_handle = app.handle().clone();
    init_splashscreen(&app_handle)?;
    
    // Update status before database init
    update_splashscreen_status(
        app_handle.clone(),
        "Initializing database...".to_string(),
        Some(20.0)
    ).ok();
    
    // Initialize database
    let db_state = DatabaseState::new(db_path)?;
    db_state.init_tables()?;
    
    // Update progress
    update_splashscreen_status(
        app_handle.clone(),
        "Database ready!".to_string(),
        Some(40.0)
    ).ok();
    
    Ok(())
})
```

### Async Initialization

For async tasks, spawn a runtime:

```rust
use tokio::runtime::Runtime;

thread::spawn(move || {
    let rt = Runtime::new().unwrap();
    
    rt.block_on(async {
        update_splashscreen_status(
            app_handle.clone(),
            "Loading resources...".to_string(),
            Some(50.0)
        ).ok();
        
        // Your async initialization
        load_resources().await;
        
        close_splashscreen(&app_handle).ok();
    });
});
```

## Tips

1. **Keep it Fast**: The splashscreen should be brief. Aim for < 3 seconds total.
2. **Real Progress**: Update progress based on actual completion, not just time.
3. **Error Handling**: Add error states to the splashscreen for failed initialization.
4. **Testing**: Test with `cargo tauri dev` to see the splashscreen in development.
5. **Production**: The splashscreen is more important in production builds where startup is slower.

## Troubleshooting

### Splashscreen doesn't show

- Check that `visible: false` is set in config (it's shown programmatically)
- Verify `init_splashscreen` is called in setup
- Check console for errors

### Dashboard doesn't appear

- Ensure `create: false` is NOT set for dashboard window (or create it manually)
- Verify `close_splashscreen` is being called
- Check that the dashboard window label matches ("dashboard")

### Progress not updating

- Verify event name is "splashscreen-status" in both Rust and JS
- Check that the splashscreen window exists when emitting
- Ensure the frontend is listening before events are emitted

### Splashscreen closes too fast/slow

- Adjust sleep durations in `perform_initialization`
- Move more/less initialization into the background thread
- Add artificial delays if needed for UX

## Example: Complete Custom Implementation

```rust
// In splashscreen.rs
fn perform_initialization(app: &AppHandle) {
    // Step 1: Load config
    update_status(app, "Loading configuration...", 10.0);
    load_config();
    
    // Step 2: Connect to database
    update_status(app, "Connecting to database...", 30.0);
    connect_database();
    
    // Step 3: Load plugins
    update_status(app, "Loading plugins...", 50.0);
    load_plugins();
    
    // Step 4: Restore session
    update_status(app, "Restoring session...", 70.0);
    restore_session();
    
    // Step 5: Prepare UI
    update_status(app, "Preparing interface...", 90.0);
    prepare_ui();
    
    // Final
    update_status(app, "Ready!", 100.0);
    thread::sleep(Duration::from_millis(300));
}

fn update_status(app: &AppHandle, msg: &str, progress: f32) {
    update_splashscreen_status(app.clone(), msg.to_string(), Some(progress)).ok();
    thread::sleep(Duration::from_millis(200));
}
```

## Additional Resources

- [Tauri Window Documentation](https://tauri.app/develop/window/)
- [Tauri Events Documentation](https://tauri.app/develop/events/)
- [Tauri Configuration](https://tauri.app/reference/config/)
