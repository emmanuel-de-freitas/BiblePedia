# Livrea - Turborepo Monorepo

A modern, production-ready monorepo for building full-stack React applications with Tauri, powered by Turborepo.

## 🏗️ Monorepo Structure

This repository is organized as a Turborepo monorepo with the following structure:

```
Livres/
├── apps/
│   └── livrea/          # React Router + Vite app
│       └── src-tauri/   # Tauri desktop app
├── packages/            # Shared packages
│   └── ui/              # @philagora/ui - Shared UI components
├── turbo.json           # Turborepo configuration
├── package.json         # Root workspace configuration
└── bun.lockb            # Bun lockfile
```

## 🚀 Features

- **Turborepo** - High-performance build system with smart caching
- **React Router** - Full-stack React framework with SSR support
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
- `bun run typecheck` - Run TypeScript type checking
- `bun run lint` - Run linting across all apps
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
- **Desktop Framework**: Tauri 2
- **Bundler**: Vite 7
- **CSS**: TailwindCSS 4
- **UI Components**: React Spectrum S2
- **State Management**: Jotai
- **Animation**: Motion
- **Language**: TypeScript 5
- **Code Quality**: Biome
- **Environment Management**: Dotenvx

## 📖 Documentation

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [React Router Documentation](https://reactrouter.com/)
- [Tauri Documentation](https://tauri.app/)
- [Bun Documentation](https://bun.sh/docs)
- [React Spectrum Documentation](https://react-spectrum.adobe.com/)

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
