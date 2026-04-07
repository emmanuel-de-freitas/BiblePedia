# Livrea - Turborepo Monorepo

A modern, production-ready monorepo for building full-stack React applications with Tauri, powered by Turborepo.

## 🏗️ Monorepo Structure

This repository is organized as a Turborepo monorepo with the following structure:

```
Livres/
├── apps/
│   ├── desktop/         # Electrobun desktop app (native)
│   ├── livrea/          # React Router + Vite app
│   │   └── src-tauri/   # Tauri desktop app
│   └── web/             # React Router + Vite web app
├── packages/            # Shared packages
│   └── ui/              # @philagora/ui - Shared UI components
├── turbo.json           # Turborepo configuration
├── package.json         # Root workspace configuration
└── bun.lockb            # Bun lockfile
```

> **📘 For AI Assistants**: See [CLAUDE.MD](CLAUDE.MD) for comprehensive codebase context, tech stack details, and development workflows.

## 🚀 Features

- **Turborepo** - High-performance build system with smart caching
- **React Router** - Full-stack React framework with SSR support
- **Electrobun** - Fast, native desktop apps with hot reload support
- **Tauri** - Build smaller, faster, and more secure desktop applications
- **Vite** - Lightning fast HMR and optimized builds
- **Bun** - Fast all-in-one JavaScript runtime & package manager
- **TypeScript** - Type safety by default
- **TailwindCSS** - Utility-first CSS framework
- **React Spectrum S2** - Adobe's design system

## 📦 Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.0 or later)
- [Rust](https://rustup.rs/) (for Tauri development)
- macOS, Linux, or Windows

### Installation

Install dependencies:

```zsh
bun install
```

### Development

Start the development server:

```bash
# Run the React app
bun run dev

# Or run with Turborepo (recommended)
turbo dev

# Run the Tauri app in development
bun run tauri:dev

# Run the Electrobun desktop app with hot reload
bun run desktop        # Starts both web dev server and Electrobun app

# Run with environment variables (using dotenvx)
bun run dev:env        # Uses .env.development
bun run build:env      # Uses .env.production
```

Your application will be available at `http://localhost:5173`.

### Building for Production

Build all apps:

```bash
turbo build
```

Build the Tauri app:

```bash
bun run tauri:build
```

## 🎯 Available Scripts

### Root Level Scripts

- `bun run dev` - Start development server using Turborepo
- `bun run build` - Build all apps using Turborepo
- `bun run desktop` - Start Electrobun desktop app with hot reload (web + desktop)
- `bun run typecheck` - Run TypeScript type checking
- `bun run format` - Format all code with Biome
- `bun run format:check` - Check code formatting (CI)
- `bun run lint` - Lint all code with Biome
- `bun run lint:fix` - Lint and auto-fix issues
- `bun run check` - Format + Lint + Organize imports
- `bun run check:fix` - All checks with auto-fix
- `bun run clean` - Clean all build artifacts and dependencies
- `bun run tauri` - Run Tauri CLI commands
- `bun run tauri:dev` - Start Tauri in development mode
- `bun run tauri:build` - Build Tauri for production

### App Level Scripts (apps/livrea)

- `bun run dev` - Start React Router dev server
- `bun run build` - Build the React app
- `bun run typecheck` - Type check the React app
- `bun run lint` - Lint the React app code
- `bun run clean` - Clean build artifacts

## 🔧 Turborepo Configuration

The monorepo uses Turborepo for orchestrating builds and development. Key features:

- **Smart Caching** - Only rebuild what changed
- **Parallel Execution** - Run tasks in parallel when possible
- **Remote Caching** - Share cache artifacts across machines (when configured)

Tasks are configured in `turbo.json`:

```json
{
  "tasks": {
    "build": {
      "dependsOn": [
        "^build"
      ],
      "outputs": [
        "build/**",
        ".react-router/**"
      ]
    },
    "dev": {
      "persistent": true,
      "cache": false
    },
    "typecheck": {
      "dependsOn": [
        "^typecheck"
      ]
    },
    "lint": {
      "dependsOn": [
        "^lint"
      ]
    }
  }
}
```

## 📁 Project Structure

### apps/livrea

The main React application built with:

- React Router for routing and SSR
- Vite for bundling and HMR
- React Spectrum S2 for UI components
- TailwindCSS for styling
- Jotai for state management

### apps/desktop

The Electrobun desktop application for BiblePedia:

- Built with Electrobun - a fast, lightweight alternative to Electron
- Uses Bun runtime and native webviews (no bundled Chromium)
- Connects to Vite dev server for hot module replacement
- Multi-window support for different routes
- Fast startup and minimal resource usage

**Development with Hot Reload:**

```bash
# Run from monorepo root (recommended)
bun run desktop

# Or verify setup first
cd apps/desktop
bun run verify

# Manual control
cd apps/web && bun run dev    # Terminal 1: Start Vite dev server
cd apps/desktop && bun run dev # Terminal 2: Start Electrobun
```

**Hot reload works for:**
- ✅ React components and TypeScript changes
- ✅ CSS and Tailwind styles  
- ✅ Desktop app Bun code changes
- ✅ Multi-window updates

See `apps/desktop/README.md` for detailed documentation.

### apps/web

The web application built with React Router and Vite:

- React Router 7 for routing and SSR
- Vite dev server with HMR on port 5173
- React Spectrum S2 for UI components
- TailwindCSS for styling
- Serves content to both web browsers and desktop app

### apps/livrea/src-tauri

The Tauri backend that wraps the React app as a desktop application:

- Located within the livrea app directory
- Written in Rust
- Provides native OS integrations
- Handles file system operations for ebook management
- Manages SQLite database for metadata

### packages

Reserved for shared packages and libraries that can be used across apps.

## 🛠️ Technology Stack

- **Runtime**: Bun
- **Build System**: Turborepo
- **Frontend Framework**: React 19
- **Routing**: React Router 7
- **Desktop Frameworks**: Electrobun 1.16, Tauri 2
- **Bundler**: Vite 8
- **CSS**: TailwindCSS 4
- **UI Components**: React Spectrum S2
- **State Management**: Jotai
- **Animation**: Motion
- **Language**: TypeScript 6
- **Code Quality**: Biome (formatting & linting)
- **Environment Management**: Dotenvx
- **Editor**: Zed (recommended)

## 📖 Documentation

- [CLAUDE.MD](CLAUDE.MD) - **Comprehensive AI assistant context** (tech stack, conventions, workflows)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [React Router Documentation](https://reactrouter.com/)
- [Electrobun Documentation](https://electrobun.dev/docs)
- [Tauri Documentation](https://tauri.app/)
- [Bun Documentation](https://bun.sh/docs)
- [React Spectrum Documentation](https://react-spectrum.adobe.com/)
- [Desktop App Hot Reload Guide](apps/desktop/README.md)
- [Biome Setup Guide](docs/BIOME_SETUP.md)

## 🎨 Code Quality with Biome

This project uses [Biome](https://biomejs.dev) for fast, modern code formatting and linting.

### Quick Commands

```bash
# Format all code
bun run format

# Lint all code
bun run lint

# Format + Lint + Organize imports
bun run check:fix
```

### IDE Setup (Zed)

The project includes Zed configuration in `.zed/settings.json` with:
- Format on save enabled
- Automatic import organization
- Biome LSP integration
- Hard tabs (width 2)
- Line width: 100 characters

Install the Biome extension in Zed for the best experience.

For detailed setup and configuration, see the [Biome Setup Guide](docs/BIOME_SETUP.md).

## 🔐 Environment Variables

This project uses [dotenvx](https://dotenvx.com/) for secure environment variable management.

### Setup

1. **Initialize environment files:**
   ```bash
   bun run setup:env
   ```

2. **Create your `.env` file from the example:**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Encrypt your environment files:**
   ```bash
   bun run env:encrypt
   ```

4. **Store the private key securely:**
    - The `DOTENV_PRIVATE_KEY` is generated in `.env.keys`
    - Store this key in your secrets manager (AWS Secrets Manager, HashiCorp Vault, etc.)
    - Never commit `.env.keys` to version control

### Environment Files

- `.env` - Default environment variables
- `.env.development` - Development-specific variables
- `.env.production` - Production-specific variables
- `.env.example` - Template with all available variables
- `.env.keys` - Private keys for decryption (gitignored)

### Available Commands

```bash
# Environment management
bun run env:encrypt    # Encrypt .env files
bun run env:decrypt    # Decrypt .env files
bun run env:set        # Set a variable
bun run env:get        # Get a variable
bun run env:ls         # List all variables

# Run with specific environment
bun run dev:env        # Development with .env.development
bun run build:env      # Build with .env.production

# Setup and utilities
bun run setup:env      # Interactive setup wizard
bun run precommit      # Pre-commit checks
bun run prebuild       # Pre-build validation
```

### Security Best Practices

1. **Never commit unencrypted secrets** - Always encrypt before committing
2. **Use different keys per environment** - Separate keys for dev/staging/prod
3. **Rotate keys regularly** - Update encryption keys periodically
4. **Limit access** - Only share keys with authorized team members
5. **Monitor usage** - Track who accesses encrypted files

### Accessing Variables in Code

```typescript
import {env} from '@/config/env';

// Use typed environment variables
console.log(env.APP_URL);
console.log(env.FEATURES.ANALYTICS);

// Check environment
if (env.isDevelopment()) {
    // Development-only code
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using React Router, Tauri, and Turborepo.
