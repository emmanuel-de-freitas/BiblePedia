/**
 * Environment Configuration
 * Centralized environment variable access with type safety
 */

// Define environment variable schema
interface EnvironmentVariables {
  // Application
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: string;
  APP_URL: string;

  // Database
  DATABASE_URL?: string;
  DB_HOST?: string;
  DB_PORT?: string;
  DB_USER?: string;
  DB_PASSWORD?: string;
  DB_NAME?: string;

  // Authentication
  JWT_SECRET?: string;
  SESSION_SECRET?: string;

  // Appwrite (exposed to browser via VITE_ prefix)
  VITE_APPWRITE_ENDPOINT?: string;
  VITE_APPWRITE_PROJECT?: string;
  VITE_APPWRITE_DATABASE_ID?: string;
  VITE_APPWRITE_COLLECTION_ID?: string;

  // API Keys
  API_KEY?: string;
  API_SECRET?: string;

  // Tauri
  TAURI_ENV_DEBUG?: string;
  TAURI_ENV_PLATFORM?: string;

  // Feature Flags
  ENABLE_ANALYTICS?: string;
  ENABLE_DEBUG_MODE?: string;
  ENABLE_BETA_FEATURES?: string;

  // Logging
  LOG_LEVEL?: 'error' | 'warn' | 'info' | 'debug' | 'trace';
  LOG_OUTPUT?: 'console' | 'file' | 'both';

  // Performance
  CACHE_TTL?: string;
  MAX_UPLOAD_SIZE?: string;

  // Development
  HMR_ENABLED?: string;
  GENERATE_SOURCEMAP?: string;
  VITE_DEV_SERVER_HOST?: string;

  // Third-party services
  STRIPE_PUBLIC_KEY?: string;
  STRIPE_SECRET_KEY?: string;
  AWS_ACCESS_KEY_ID?: string;
  AWS_SECRET_ACCESS_KEY?: string;
  AWS_REGION?: string;
  EMAIL_HOST?: string;
  EMAIL_PORT?: string;
  EMAIL_USER?: string;
  EMAIL_PASSWORD?: string;
  EMAIL_FROM?: string;

  // Security
  CORS_ORIGIN?: string;
  RATE_LIMIT_WINDOW?: string;
  RATE_LIMIT_MAX_REQUESTS?: string;
  SECURE_COOKIES?: string;
  CSRF_PROTECTION?: string;

  // CDN
  CDN_URL?: string;
  ASSETS_PREFIX?: string;

  // Monitoring
  SENTRY_DSN?: string;
  SENTRY_ENVIRONMENT?: string;
  GOOGLE_ANALYTICS_ID?: string;
  MIXPANEL_TOKEN?: string;
}

/**
 * Get environment variable with type safety
 */
function getEnvVar<K extends keyof EnvironmentVariables>(
  key: K,
  defaultValue?: EnvironmentVariables[K]
): EnvironmentVariables[K] | undefined {
  // In browser environment, only VITE_ prefixed variables are available
  if (typeof window !== 'undefined') {
    // @ts-ignore - Vite injects these at build time
    const value = import.meta.env[key];
    return value ?? defaultValue;
  }

  // In Node.js environment
  const value = process.env[key] as EnvironmentVariables[K];
  return value ?? defaultValue;
}

/**
 * Get required environment variable (throws if not found)
 */
function getRequiredEnvVar<K extends keyof EnvironmentVariables>(
  key: K
): EnvironmentVariables[K] {
  const value = getEnvVar(key);
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

/**
 * Check if running in development mode
 */
const isDevelopment = (): boolean => {
  const env = getEnvVar('NODE_ENV', 'development');
  return env === 'development';
};

/**
 * Check if running in production mode
 */
const isProduction = (): boolean => {
  const env = getEnvVar('NODE_ENV', 'development');
  return env === 'production';
};

/**
 * Check if running in test mode
 */
const isTest = (): boolean => {
  const env = getEnvVar('NODE_ENV', 'development');
  return env === 'test';
};

/**
 * Check if running in Tauri context
 */
const isTauri = (): boolean => {
  if (typeof window === 'undefined') return false;
  // @ts-ignore - Tauri injects this
  return Boolean(window.__TAURI__);
};

/**
 * Parse boolean environment variable
 */
const parseBoolean = (value: string | undefined): boolean => {
  if (!value) return false;
  return value.toLowerCase() === 'true' || value === '1';
};

/**
 * Parse number environment variable
 */
const parseNumber = (value: string | undefined, defaultValue: number = 0): number => {
  if (!value) return defaultValue;
  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Environment configuration object
 */
export const env = {
  // Application
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),
  PORT: getEnvVar('PORT', '5173'),
  APP_URL: getEnvVar('APP_URL', 'http://localhost:5173'),

  // Database
  DATABASE_URL: getEnvVar('DATABASE_URL'),
  DB_HOST: getEnvVar('DB_HOST'),
  DB_PORT: getEnvVar('DB_PORT'),
  DB_USER: getEnvVar('DB_USER'),
  DB_PASSWORD: getEnvVar('DB_PASSWORD'),
  DB_NAME: getEnvVar('DB_NAME'),

  // Authentication
  JWT_SECRET: getEnvVar('JWT_SECRET'),
  SESSION_SECRET: getEnvVar('SESSION_SECRET'),

  // Appwrite
  APPWRITE: {
    ENDPOINT: getEnvVar('VITE_APPWRITE_ENDPOINT'),
    PROJECT: getEnvVar('VITE_APPWRITE_PROJECT'),
    DATABASE_ID: getEnvVar('VITE_APPWRITE_DATABASE_ID'),
    COLLECTION_ID: getEnvVar('VITE_APPWRITE_COLLECTION_ID'),
  },

  // API
  API_KEY: getEnvVar('API_KEY'),
  API_SECRET: getEnvVar('API_SECRET'),

  // Feature Flags
  FEATURES: {
    ANALYTICS: parseBoolean(getEnvVar('ENABLE_ANALYTICS')),
    DEBUG_MODE: parseBoolean(getEnvVar('ENABLE_DEBUG_MODE')),
    BETA_FEATURES: parseBoolean(getEnvVar('ENABLE_BETA_FEATURES')),
  },

  // Logging
  LOG: {
    LEVEL: getEnvVar('LOG_LEVEL', 'info'),
    OUTPUT: getEnvVar('LOG_OUTPUT', 'console'),
  },

  // Performance
  CACHE_TTL: parseNumber(getEnvVar('CACHE_TTL'), 3600),
  MAX_UPLOAD_SIZE: parseNumber(getEnvVar('MAX_UPLOAD_SIZE'), 10),

  // Development
  HMR_ENABLED: parseBoolean(getEnvVar('HMR_ENABLED')),
  GENERATE_SOURCEMAP: parseBoolean(getEnvVar('GENERATE_SOURCEMAP')),

  // Helpers
  isDevelopment,
  isProduction,
  isTest,
  isTauri,
};

/**
 * Validate required environment variables
 * Call this at app startup to ensure all required vars are present
 */
export function validateEnv(): void {
  const required: (keyof EnvironmentVariables)[] = [];

  // Add production-specific required variables
  if (isProduction()) {
    required.push(
      'JWT_SECRET',
      'SESSION_SECRET',
      'DATABASE_URL'
    );
  }

  const missing: string[] = [];
  for (const key of required) {
    if (!getEnvVar(key)) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }
}

/**
 * Get safe environment info for logging (excludes sensitive values)
 */
export function getSafeEnvInfo(): Record<string, any> {
  return {
    NODE_ENV: env.NODE_ENV,
    PORT: env.PORT,
    APP_URL: env.APP_URL,
    FEATURES: env.FEATURES,
    LOG: env.LOG,
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),
    isTauri: isTauri(),
    // Mask sensitive values
    hasDatabase: Boolean(env.DATABASE_URL),
    hasJWT: Boolean(env.JWT_SECRET),
    hasAppwrite: Boolean(env.APPWRITE.ENDPOINT),
  };
}

// Export utility functions
export { getEnvVar, getRequiredEnvVar, parseBoolean, parseNumber };
