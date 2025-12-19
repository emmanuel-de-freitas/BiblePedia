# Splashscreen Configuration Examples

This document provides various configuration examples for customizing your splashscreen.

## Example 1: Minimal Splashscreen (Current Default)

```json
{
  "label": "splashscreen",
  "url": "splashscreen.html",
  "width": 700,
  "height": 400,
  "center": true,
  "decorations": false,
  "alwaysOnTop": true,
  "resizable": false,
  "visible": false
}
```

**Features:**
- Clean, undecorated window
- Fixed size 700x400
- Always on top of other windows
- Shown programmatically when ready

## Example 2: Larger Splashscreen with Rounded Corners

```json
{
  "label": "splashscreen",
  "url": "splashscreen.html",
  "width": 900,
  "height": 600,
  "center": true,
  "decorations": false,
  "transparent": true,
  "alwaysOnTop": true,
  "resizable": false,
  "visible": false
}
```

**CSS for rounded corners:**
```css
body {
  border-radius: 20px;
  overflow: hidden;
}
```

## Example 3: Minimal Loading Indicator

For a very small, unobtrusive loading window:

```json
{
  "label": "splashscreen",
  "url": "splashscreen.html",
  "width": 300,
  "height": 300,
  "center": true,
  "decorations": false,
  "transparent": true,
  "alwaysOnTop": true,
  "resizable": false,
  "visible": false,
  "skipTaskbar": true
}
```

## Example 4: Full-Screen Splash

```json
{
  "label": "splashscreen",
  "url": "splashscreen.html",
  "fullscreen": true,
  "decorations": false,
  "alwaysOnTop": true,
  "visible": false
}
```

## Rust Timing Examples

### Fast Initialization (< 2 seconds)

```rust
fn perform_initialization(app: &AppHandle) {
    update_status(app, "Loading...", 50);
    thread::sleep(Duration::from_millis(800));
    
    update_status(app, "Ready!", 100);
    thread::sleep(Duration::from_millis(200));
}
```

### Standard Initialization (2-4 seconds)

```rust
fn perform_initialization(app: &AppHandle) {
    let steps = vec![
        ("Initializing...", 20),
        ("Loading database...", 40),
        ("Setting up...", 60),
        ("Almost ready...", 80),
        ("Ready!", 100),
    ];
    
    for (message, progress) in steps {
        update_status(app, message, progress);
        thread::sleep(Duration::from_millis(600));
    }
}
```

### Detailed Initialization (4+ seconds)

```rust
fn perform_initialization(app: &AppHandle) {
    // Step 1: Database
    update_status(app, "Connecting to database...", 10);
    thread::sleep(Duration::from_millis(500));
    
    update_status(app, "Loading schema...", 15);
    thread::sleep(Duration::from_millis(300));
    
    update_status(app, "Database ready", 25);
    thread::sleep(Duration::from_millis(200));
    
    // Step 2: Configuration
    update_status(app, "Loading configuration...", 30);
    thread::sleep(Duration::from_millis(400));
    
    update_status(app, "Applying preferences...", 40);
    thread::sleep(Duration::from_millis(400));
    
    // Step 3: Resources
    update_status(app, "Loading resources...", 50);
    thread::sleep(Duration::from_millis(600));
    
    update_status(app, "Caching assets...", 60);
    thread::sleep(Duration::from_millis(500));
    
    // Step 4: Plugins
    update_status(app, "Initializing plugins...", 70);
    thread::sleep(Duration::from_millis(500));
    
    update_status(app, "Registering handlers...", 80);
    thread::sleep(Duration::from_millis(400));
    
    // Step 5: Final prep
    update_status(app, "Preparing interface...", 90);
    thread::sleep(Duration::from_millis(400));
    
    update_status(app, "Ready!", 100);
    thread::sleep(Duration::from_millis(300));
}
```

## HTML/CSS Style Examples

### Example 1: Minimalist Dark Theme

```html
<style>
body {
    background: #1a1a1a;
    color: #ffffff;
}

.logo {
    background: #2a2a2a;
    border: 2px solid #3a3a3a;
}

.loading-bar {
    background: #2a2a2a;
}

.loading-progress {
    background: #667eea;
}
</style>
```

### Example 2: Gradient with Image Overlay

```html
<style>
body {
    background: 
        linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
        url('/background.jpg');
    background-size: cover;
    background-position: center;
}

.logo {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
}
</style>
```

### Example 3: Modern Glassmorphism

```html
<style>
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.splashscreen-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 60px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.logo {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
}
</style>
```

### Example 4: Animated Gradient Background

```html
<style>
@keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

body {
    background: linear-gradient(
        -45deg,
        #667eea,
        #764ba2,
        #f093fb,
        #f5576c
    );
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}
</style>
```

### Example 5: Pulsing Logo Animation

```html
<style>
@keyframes pulse-glow {
    0%, 100% {
        box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
        transform: scale(1);
    }
    50% {
        box-shadow: 0 0 40px rgba(102, 126, 234, 0.8);
        transform: scale(1.05);
    }
}

.logo {
    animation: pulse-glow 2s ease-in-out infinite;
}
</style>
```

## Loading Bar Styles

### Example 1: Striped Progress Bar

```css
.loading-progress {
    background: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
    );
    background-size: 20px 20px;
    animation: move-stripes 1s linear infinite;
}

@keyframes move-stripes {
    0% { background-position: 0 0; }
    100% { background-position: 20px 0; }
}
```

### Example 2: Gradient Progress Bar

```css
.loading-progress {
    background: linear-gradient(
        90deg,
        #667eea 0%,
        #764ba2 50%,
        #f093fb 100%
    );
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.6);
}
```

### Example 3: Circular Progress

```html
<div class="circular-progress">
    <svg width="100" height="100">
        <circle 
            cx="50" 
            cy="50" 
            r="40" 
            stroke="rgba(255,255,255,0.2)" 
            stroke-width="8" 
            fill="none"
        />
        <circle 
            id="progress-circle"
            cx="50" 
            cy="50" 
            r="40" 
            stroke="white" 
            stroke-width="8" 
            fill="none"
            stroke-dasharray="251.2"
            stroke-dashoffset="251.2"
            transform="rotate(-90 50 50)"
            style="transition: stroke-dashoffset 0.3s ease;"
        />
    </svg>
</div>

<script>
listen('splashscreen-status', (event) => {
    const [message, progress] = event.payload;
    if (progress !== null) {
        const circumference = 251.2;
        const offset = circumference - (progress / 100) * circumference;
        document.getElementById('progress-circle').style.strokeDashoffset = offset;
    }
});
</script>
```

## Advanced Features

### Example: Error State Display

```rust
fn perform_initialization(app: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    update_status(app, "Loading database...", 25);
    
    match init_database() {
        Ok(_) => {
            update_status(app, "Database loaded", 50);
        }
        Err(e) => {
            // Show error in splashscreen
            update_status(app, &format!("Error: {}", e), 25);
            
            // Keep splashscreen open for user to see error
            thread::sleep(Duration::from_secs(3));
            
            // Don't close splashscreen, let user restart
            return Err(e);
        }
    }
    
    // Continue with other steps...
    Ok(())
}
```

### Example: Conditional Splashscreen

Only show splashscreen for slow initialization:

```rust
pub fn init_splashscreen(app: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let start = std::time::Instant::now();
    
    // Try quick initialization first
    let result = quick_init(app);
    
    let elapsed = start.elapsed();
    
    if elapsed < Duration::from_millis(500) {
        // Fast enough, skip splashscreen
        show_dashboard_directly(app)?;
    } else {
        // Show splashscreen for remaining work
        show_splashscreen(app)?;
        finish_initialization(app)?;
        close_splashscreen(app)?;
    }
    
    Ok(())
}
```

### Example: Multi-Language Support

```rust
fn get_loading_messages(lang: &str) -> Vec<(&str, f32)> {
    match lang {
        "fr" => vec![
            ("Initialisation...", 20),
            ("Chargement de la base de données...", 40),
            ("Configuration...", 60),
            ("Préparation...", 80),
            ("Prêt!", 100),
        ],
        "es" => vec![
            ("Inicializando...", 20),
            ("Cargando base de datos...", 40),
            ("Configurando...", 60),
            ("Preparando...", 80),
            ("¡Listo!", 100),
        ],
        _ => vec![
            ("Initializing...", 20),
            ("Loading database...", 40),
            ("Setting up...", 60),
            ("Preparing...", 80),
            ("Ready!", 100),
        ],
    }
}
```

## Tips for Production

1. **Keep it brief**: Users tolerate 2-3 seconds, anything longer needs justification
2. **Be honest**: Don't fake progress - use real initialization milestones
3. **Add personality**: Use your brand colors, logo, and voice
4. **Test cold starts**: The splashscreen matters most on first launch
5. **Optimize loading**: Defer non-critical initialization to after the dashboard shows
6. **Error handling**: Always have a fallback if initialization fails
7. **Accessibility**: Ensure text has sufficient contrast and size

## Performance Considerations

```rust
// ❌ Bad: Blocking the entire initialization
fn perform_initialization(app: &AppHandle) {
    // Everything happens sequentially, slowing startup
    load_everything_synchronously();
}

// ✅ Good: Parallel initialization where possible
fn perform_initialization(app: &AppHandle) {
    use std::sync::mpsc;
    
    let (tx, rx) = mpsc::channel();
    
    // Start multiple tasks
    let tx1 = tx.clone();
    thread::spawn(move || {
        load_database();
        tx1.send(25).unwrap();
    });
    
    let tx2 = tx.clone();
    thread::spawn(move || {
        load_config();
        tx2.send(25).unwrap();
    });
    
    // Update progress as tasks complete
    let mut total_progress = 0;
    for progress in rx.iter().take(2) {
        total_progress += progress;
        update_status(app, "Loading...", total_progress as f32);
    }
}
```

---

Choose the configuration that best fits your app's brand and initialization needs!
