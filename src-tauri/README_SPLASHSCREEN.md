# Splashscreen Quick Reference

A complete splashscreen implementation for the Livrea Tauri application.

## 📁 Files Created

### Rust Files
- **`src/splashscreen.rs`** - Core splashscreen logic and Tauri commands
- **`src/lib.rs`** - Updated to integrate splashscreen module

### Frontend Files
- **`public/splashscreen.html`** - Standalone HTML splashscreen page
- **`src/services/splashscreen.ts`** - TypeScript service for Tauri commands
- **`src/components/Splashscreen.tsx`** - React component example (optional)

### Configuration
- **`tauri.conf.json`** - Updated with splashscreen window configuration

### Documentation
- **`SPLASHSCREEN.md`** - Complete implementation guide

## 🚀 Quick Start

### 1. Configuration

The `tauri.conf.json` already has two windows configured:

```json
{
  "app": {
    "windows": [
      {
        "label": "splashscreen",
        "url": "splashscreen.html",
        "visible": false,
        "width": 700,
        "height": 400,
        "decorations": false,
        "center": true,
        "alwaysOnTop": true,
        "resizable": false
      },
      {
        "label": "dashboard",
        "create": false,
        "width": 1000,
        "height": 700
      }
    ]
  }
}
```

### 2. Rust Backend

The splashscreen is automatically initialized in `src/lib.rs`:

```rust
use splashscreen::init_splashscreen;

tauri::Builder::default()
    .setup(|app| {
        // Splashscreen starts automatically
        init_splashscreen(&app.handle().clone())?;
        
        // Your initialization code here...
        
        Ok(())
    })
```

### 3. How It Works

1. **App starts** → Splashscreen window shows
2. **Initialization runs** → Progress updates sent to splashscreen
3. **Init completes** → Splashscreen closes, dashboard shows

## 🎨 Customization

### Change Loading Steps

Edit `src/splashscreen.rs`:

```rust
fn perform_initialization(app: &AppHandle) {
    let steps = vec![
        ("Your custom message...", 25),
        ("Another step...", 50),
        ("Almost ready...", 75),
        ("Ready!", 100),
    ];
    
    for (message, progress) in steps {
        update_splashscreen_status(
            app.clone(),
            message.to_string(),
            Some(progress as f32)
        ).ok();
        
        // Do your actual work here
        thread::sleep(Duration::from_millis(500));
    }
}
```

### Change Appearance

Edit `public/splashscreen.html` to customize:
- Background gradient/image
- Logo/icon
- Colors and animations
- Loading bar style
- Text content

### Use React Component

If you prefer React over plain HTML, you can:

1. Create a route for the splashscreen in your React Router config
2. Use the `Splashscreen` component from `src/components/Splashscreen.tsx`
3. Update `tauri.conf.json` to point to your React route instead of `splashscreen.html`

## 🔧 Available Commands

### From Rust

```rust
use splashscreen::{close_splashscreen, update_splashscreen_status};

// Update status
update_splashscreen_status(
    app.clone(),
    "Loading database...".to_string(),
    Some(50.0)
)?;

// Close manually
close_splashscreen(&app)?;
```

### From Frontend (TypeScript)

```typescript
import { closeSplashscreen, updateSplashscreenStatus } from './services/splashscreen';

// Update status
await updateSplashscreenStatus('Custom message', 75);

// Close manually
await closeSplashscreen();
```

### Listen to Updates (Frontend)

```typescript
import { listenToSplashscreenStatus } from './services/splashscreen';

const unlisten = await listenToSplashscreenStatus((status) => {
    console.log(status.message, status.progress);
});

// Clean up
unlisten();
```

## 📊 Progress Updates

Progress updates are sent via Tauri events:

- **Event name**: `splashscreen-status`
- **Payload**: `[string, number | null]` → `[message, progress]`
- **Progress**: `0-100` or `null` for indeterminate

Example in plain JavaScript:

```javascript
const { listen } = window.__TAURI__.event;

listen('splashscreen-status', (event) => {
    const [message, progress] = event.payload;
    document.getElementById('status').textContent = message;
    if (progress !== null) {
        document.getElementById('progress').style.width = `${progress}%`;
    }
});
```

## 🎯 Common Use Cases

### Add Real Initialization Tasks

```rust
fn perform_initialization(app: &AppHandle) {
    // Database
    update_status(app, "Connecting to database...", 20);
    init_database(app);
    
    // User config
    update_status(app, "Loading preferences...", 40);
    load_user_config(app);
    
    // Resources
    update_status(app, "Loading resources...", 60);
    load_resources(app);
    
    // Plugins
    update_status(app, "Initializing plugins...", 80);
    init_plugins(app);
    
    // Done
    update_status(app, "Ready!", 100);
    thread::sleep(Duration::from_millis(300));
}
```

### Error Handling

```rust
fn perform_initialization(app: &AppHandle) {
    if let Err(e) = init_database(app) {
        update_splashscreen_status(
            app.clone(),
            format!("Error: {}", e),
            None
        ).ok();
        
        // Keep splashscreen open or show error
        thread::sleep(Duration::from_secs(5));
        return;
    }
    
    // Continue...
}
```

### Manual Control

To manually control when the splashscreen closes:

1. Remove or comment out the `perform_initialization` thread in `init_splashscreen`
2. Call `close_splashscreen_command` from your frontend when ready

```typescript
// After your app is fully loaded
await closeSplashscreen();
```

## 🐛 Troubleshooting

**Splashscreen doesn't show?**
- Check `visible: false` in config (it's shown programmatically)
- Verify `init_splashscreen` is called in `setup()`

**Dashboard doesn't appear?**
- Ensure dashboard has `"create": false` in config
- Check `close_splashscreen` is being called

**Progress not updating?**
- Verify event listener is set up in frontend
- Check event name is "splashscreen-status"

**Closes too fast/slow?**
- Adjust `Duration` in `perform_initialization`
- Add/remove initialization steps

## 📚 Additional Resources

- See `SPLASHSCREEN.md` for complete documentation
- [Tauri Windows Documentation](https://tauri.app/develop/window/)
- [Tauri Events Documentation](https://tauri.app/develop/events/)

## 🎨 Styling Tips

### Use Custom Background Image

```html
<style>
body {
    background-image: url('/background.jpg');
    background-size: cover;
    background-position: center;
}
</style>
```

### Add Custom Logo

```html
<div class="logo">
    <img src="/logo.png" alt="Logo">
</div>
```

### Change Colors

Update the gradient in `body` CSS:

```css
background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
```

## ✅ Testing

Run in development:

```bash
cargo tauri dev
```

Build for production:

```bash
cargo tauri build
```

The splashscreen is more visible in production builds where startup takes longer.

---

**Need help?** See the full `SPLASHSCREEN.md` documentation for detailed examples and advanced usage.
