/**
 * Server Entry Point
 * Initializes server-side features including environment variables
 */

// Initialize dotenvx for environment variables (server-side only)
import '@dotenvx/dotenvx/config';

// Re-export the default server entry
export { default } from '@react-router/dev/dist/config/defaults/entry.server';

// Validate environment variables on server startup
import { validateEnv, getSafeEnvInfo } from './config/env';

// Only run validation in production
if (process.env.NODE_ENV === 'production') {
  try {
    validateEnv();
    console.log('✅ Environment variables validated successfully');
  } catch (error) {
    console.error('❌ Environment validation failed:', error);
    // In production, we might want to exit if env vars are invalid
    // process.exit(1);
  }
}

// Log safe environment info (non-sensitive)
if (process.env.NODE_ENV === 'development') {
  console.log('📋 Environment Info:', getSafeEnvInfo());
}
