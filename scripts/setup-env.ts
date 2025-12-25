#!/usr/bin/env bun

/**
 * Environment Setup Script
 * Helps set up environment files and encrypt them with dotenvx
 */

import { existsSync, readFileSync, writeFileSync, copyFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> =>
  new Promise((resolve) => rl.question(query, resolve));

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

// Helper functions for colored output
const log = {
  info: (msg: string) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg: string) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg: string) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg: string) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  header: (msg: string) => console.log(`\n${colors.cyan}${colors.bright}${msg}${colors.reset}\n`),
};

// Environment types
type Environment = 'development' | 'production' | 'test' | 'custom';

// Check if dotenvx is installed
function checkDotenvx(): boolean {
  try {
    execSync('bunx dotenvx --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Install dotenvx if not present
async function installDotenvx(): Promise<void> {
  log.info('Installing @dotenvx/dotenvx...');
  try {
    execSync('bun add -D @dotenvx/dotenvx', { stdio: 'inherit' });
    log.success('Dotenvx installed successfully');
  } catch (error) {
    log.error('Failed to install dotenvx');
    throw error;
  }
}

// Create environment file from example
async function createEnvFile(environment: Environment): Promise<void> {
  const envFile = environment === 'custom'
    ? await question('Enter custom environment file name (e.g., .env.staging): ')
    : `.env${environment === 'development' ? '' : `.${environment}`}`;

  const exampleFile = '.env.example';

  if (!existsSync(exampleFile)) {
    log.error(`${exampleFile} not found. Please create it first.`);
    return;
  }

  if (existsSync(envFile)) {
    const overwrite = await question(`${envFile} already exists. Overwrite? (y/N): `);
    if (overwrite.toLowerCase() !== 'y') {
      log.info('Skipping file creation');
      return;
    }
  }

  // Copy example file
  copyFileSync(exampleFile, envFile);
  log.success(`Created ${envFile} from ${exampleFile}`);

  // Prompt to edit the file
  const edit = await question('Would you like to edit the file now? (y/N): ');
  if (edit.toLowerCase() === 'y') {
    log.info(`Opening ${envFile} in your default editor...`);
    try {
      // Try to open in VS Code first, then fallback to system default
      try {
        execSync(`code ${envFile}`, { stdio: 'inherit' });
      } catch {
        execSync(`open ${envFile}`, { stdio: 'inherit' });
      }
    } catch {
      log.warning('Could not open editor. Please edit the file manually.');
    }

    await question('Press Enter when you\'re done editing...');
  }
}

// Encrypt environment file
async function encryptEnvFile(envFile?: string): Promise<void> {
  const file = envFile || '.env';

  if (!existsSync(file)) {
    log.error(`${file} not found`);
    return;
  }

  log.info(`Encrypting ${file}...`);

  try {
    const result = execSync(`bunx dotenvx encrypt -f ${file}`, {
      encoding: 'utf-8',
      stdio: 'pipe'
    });

    console.log(result);
    log.success(`${file} encrypted successfully`);

    // Check if .env.keys exists and remind to secure it
    if (existsSync('.env.keys')) {
      log.warning('IMPORTANT: Store the DOTENV_PRIVATE_KEY from .env.keys in a secure location');
      log.warning('Never commit .env.keys to version control');

      const showKey = await question('Show the private key? (y/N): ');
      if (showKey.toLowerCase() === 'y') {
        const keysContent = readFileSync('.env.keys', 'utf-8');
        const privateKey = keysContent.match(/DOTENV_PRIVATE_KEY="([^"]+)"/)?.[1];
        if (privateKey) {
          console.log(`\n${colors.yellow}Private Key:${colors.reset}`);
          console.log(`${colors.bright}${privateKey}${colors.reset}\n`);
          log.warning('Store this key in your secrets manager (AWS Secrets Manager, HashiCorp Vault, etc.)');
        }
      }
    }
  } catch (error) {
    log.error('Failed to encrypt file');
    console.error(error);
  }
}

// Decrypt environment file
async function decryptEnvFile(envFile?: string): Promise<void> {
  const file = envFile || '.env';

  if (!existsSync(file)) {
    log.error(`${file} not found`);
    return;
  }

  const privateKey = await question('Enter DOTENV_PRIVATE_KEY (or press Enter to use .env.keys): ');

  log.info(`Decrypting ${file}...`);

  try {
    let command = `bunx dotenvx decrypt -f ${file}`;
    if (privateKey) {
      command = `DOTENV_PRIVATE_KEY="${privateKey}" ${command}`;
    }

    execSync(command, { stdio: 'inherit' });
    log.success(`${file} decrypted successfully`);
  } catch (error) {
    log.error('Failed to decrypt file');
    console.error(error);
  }
}

// List all environment files
function listEnvFiles(): void {
  const envFiles = [
    '.env',
    '.env.development',
    '.env.production',
    '.env.test',
    '.env.local',
    '.env.example',
  ].filter(existsSync);

  if (envFiles.length === 0) {
    log.warning('No environment files found');
    return;
  }

  log.header('Environment Files:');
  envFiles.forEach(file => {
    const content = readFileSync(file, 'utf-8');
    const isEncrypted = content.includes('DOTENV_PUBLIC_KEY');
    const status = isEncrypted ?
      `${colors.green}encrypted${colors.reset}` :
      `${colors.yellow}plain${colors.reset}`;

    console.log(`  • ${file} (${status})`);
  });
}

// Set up git hooks for dotenvx
async function setupGitHooks(): Promise<void> {
  log.info('Setting up git hooks for dotenvx...');

  try {
    // Set up precommit hook
    execSync('bunx dotenvx ext precommit', { stdio: 'inherit' });
    log.success('Precommit hook installed');

    // Set up prebuild hook
    execSync('bunx dotenvx ext prebuild', { stdio: 'inherit' });
    log.success('Prebuild hook installed');
  } catch (error) {
    log.error('Failed to set up git hooks');
    console.error(error);
  }
}

// Main menu
async function main() {
  log.header('🔐 Dotenvx Environment Setup');

  // Check if dotenvx is installed
  if (!checkDotenvx()) {
    log.warning('Dotenvx is not installed');
    const install = await question('Would you like to install it? (Y/n): ');
    if (install.toLowerCase() !== 'n') {
      await installDotenvx();
    } else {
      log.error('Dotenvx is required for this script');
      process.exit(1);
    }
  }

  let running = true;

  while (running) {
    console.log('\nWhat would you like to do?');
    console.log('1. Create new environment file');
    console.log('2. Encrypt environment file');
    console.log('3. Decrypt environment file');
    console.log('4. List environment files');
    console.log('5. Setup git hooks');
    console.log('6. Show environment info');
    console.log('0. Exit');

    const choice = await question('\nEnter your choice: ');

    switch (choice) {
      case '1':
        console.log('\nSelect environment:');
        console.log('1. Development');
        console.log('2. Production');
        console.log('3. Test');
        console.log('4. Custom');

        const envChoice = await question('Enter your choice: ');
        const environments: Environment[] = ['development', 'production', 'test', 'custom'];
        const env = environments[parseInt(envChoice) - 1];

        if (env) {
          await createEnvFile(env);
        } else {
          log.error('Invalid choice');
        }
        break;

      case '2':
        const encryptFile = await question('Enter file to encrypt (default: .env): ');
        await encryptEnvFile(encryptFile || undefined);
        break;

      case '3':
        const decryptFile = await question('Enter file to decrypt (default: .env): ');
        await decryptEnvFile(decryptFile || undefined);
        break;

      case '4':
        listEnvFiles();
        break;

      case '5':
        await setupGitHooks();
        break;

      case '6':
        console.log('\n📋 Environment Info:');
        console.log(`  • Current directory: ${process.cwd()}`);
        console.log(`  • Node environment: ${process.env.NODE_ENV || 'not set'}`);

        if (existsSync('.env.keys')) {
          console.log(`  • ${colors.green}✓${colors.reset} .env.keys exists`);
        } else {
          console.log(`  • ${colors.yellow}⚠${colors.reset} .env.keys not found`);
        }

        if (existsSync('.gitignore')) {
          const gitignore = readFileSync('.gitignore', 'utf-8');
          if (gitignore.includes('.env.keys')) {
            console.log(`  • ${colors.green}✓${colors.reset} .env.keys is in .gitignore`);
          } else {
            console.log(`  • ${colors.red}✗${colors.reset} .env.keys is NOT in .gitignore`);
          }
        }
        break;

      case '0':
        running = false;
        break;

      default:
        log.error('Invalid choice');
    }
  }

  log.success('Goodbye!');
  rl.close();
}

// Run the script
main().catch(error => {
  log.error('An error occurred:');
  console.error(error);
  process.exit(1);
});
