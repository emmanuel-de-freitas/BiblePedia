/**
 * Environment Variable Schema Validation
 *
 * This module provides Zod schemas for validating environment variables
 * with proper type coercion and validation rules.
 */

import { z } from 'zod';

/**
 * Custom Zod transformers and refinements
 */

/** Transform string to boolean */
const booleanString = z
  .string()
  .transform((val) => val === 'true' || val === '1')
  .or(z.boolean());

/** Transform string to number with optional default */
const numberString = z
  .string()
  .transform((val) => {
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  })
  .optional()
  .or(z.number().optional());

/** Port number validation */
const portNumber = z
  .string()
  .regex(/^\d+$/, 'Port must be a number')
  .transform(Number)
  .refine((n) => n >= 1 && n <= 65535, 'Port must be between 1 and 65535');

/** URL validation */
const urlString = z.string().url('Must be a valid URL');

/** Email validation */
const emailString = z.string().email('Must be a valid email');

/** Non-empty string */
const nonEmptyString = z.string().min(1, 'Cannot be empty');

/**
 * Node environment schema
 */
export const nodeEnvironmentSchema = z.enum(['development', 'production', 'test', 'staging']);

/**
 * Log level schema
 */
export const logLevelSchema = z.enum(['error', 'warn', 'info', 'debug', 'trace', 'silent']);

/**
 * Log output schema
 */
export const logOutputSchema = z.enum(['console', 'file', 'both', 'json']);

/**
 * Core application environment schema
 */
export const appEnvironmentSchema = z.object({
  NODE_ENV: nodeEnvironmentSchema.default('development'),
  PORT: portNumber.optional(),
  APP_URL: urlString.optional(),
  APP_NAME: z.string().optional(),
  APP_VERSION: z.string().optional(),
  PUBLIC_URL: urlString.optional(),
});

/**
 * Database environment schema
 */
export const databaseEnvironmentSchema = z.object({
  DATABASE_URL: z.string().optional(),
  DB_HOST: z.string().optional(),
  DB_PORT: portNumber.optional(),
  DB_USER: z.string().optional(),
  DB_PASSWORD: z.string().optional(),
  DB_NAME: z.string().optional(),
  DB_SSL: booleanString.optional(),
  DB_POOL_SIZE: numberString.optional(),
  DB_CONNECTION_TIMEOUT: numberString.optional(),
});

/**
 * Authentication environment schema
 */
export const authEnvironmentSchema = z.object({
  JWT_SECRET: z.string().optional(),
  JWT_EXPIRES_IN: z.string().optional(),
  JWT_REFRESH_EXPIRES_IN: z.string().optional(),
  SESSION_SECRET: z.string().optional(),
  SESSION_MAX_AGE: numberString.optional(),
  OAUTH_REDIRECT_URL: urlString.optional(),
});

/**
 * Firebase environment schema (client-safe)
 */
export const firebaseEnvironmentSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string().optional(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().optional(),
  VITE_FIREBASE_PROJECT_ID: z.string().optional(),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().optional(),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().optional(),
  VITE_FIREBASE_APP_ID: z.string().optional(),
  VITE_FIREBASE_MEASUREMENT_ID: z.string().optional(),
});

/**
 * Appwrite environment schema
 */
export const appwriteEnvironmentSchema = z.object({
  VITE_APPWRITE_ENDPOINT: urlString.optional(),
  VITE_APPWRITE_PROJECT: z.string().optional(),
  VITE_APPWRITE_DATABASE_ID: z.string().optional(),
  VITE_APPWRITE_COLLECTION_ID: z.string().optional(),
  APPWRITE_API_KEY: z.string().optional(),
});

/**
 * Tauri environment schema
 */
export const tauriEnvironmentSchema = z.object({
  TAURI_ENV_DEBUG: booleanString.optional(),
  TAURI_ENV_PLATFORM: z.string().optional(),
  TAURI_DEV_HOST: z.string().optional(),
  TAURI_ENV: z.string().optional(),
});

/**
 * API environment schema
 */
export const apiEnvironmentSchema = z.object({
  API_KEY: z.string().optional(),
  API_SECRET: z.string().optional(),
  API_BASE_URL: urlString.optional(),
  API_VERSION: z.string().optional(),
  API_TIMEOUT: numberString.optional(),
});

/**
 * AWS environment schema
 */
export const awsEnvironmentSchema = z.object({
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().optional(),
  AWS_S3_BUCKET: z.string().optional(),
  AWS_CLOUDFRONT_DISTRIBUTION_ID: z.string().optional(),
});

/**
 * Stripe environment schema
 */
export const stripeEnvironmentSchema = z.object({
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_API_VERSION: z.string().optional(),
});

/**
 * Email environment schema
 */
export const emailEnvironmentSchema = z.object({
  EMAIL_PROVIDER: z.string().optional(),
  EMAIL_HOST: z.string().optional(),
  EMAIL_PORT: portNumber.optional(),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASSWORD: z.string().optional(),
  EMAIL_FROM: emailString.optional(),
  EMAIL_FROM_NAME: z.string().optional(),
  EMAIL_SECURE: booleanString.optional(),
});

/**
 * Feature flags schema
 */
export const featureEnvironmentSchema = z.object({
  ENABLE_ANALYTICS: booleanString.optional(),
  ENABLE_DEBUG_MODE: booleanString.optional(),
  ENABLE_BETA_FEATURES: booleanString.optional(),
  ENABLE_EXPERIMENTAL: booleanString.optional(),
  ENABLE_MAINTENANCE_MODE: booleanString.optional(),
  ENABLE_RATE_LIMITING: booleanString.optional(),
});

/**
 * Logging environment schema
 */
export const loggingEnvironmentSchema = z.object({
  LOG_LEVEL: logLevelSchema.optional(),
  LOG_OUTPUT: logOutputSchema.optional(),
  LOG_FILE_PATH: z.string().optional(),
  LOG_STRUCTURED: booleanString.optional(),
  LOG_ROTATION: booleanString.optional(),
  LOG_MAX_SIZE: z.string().optional(),
  LOG_MAX_FILES: numberString.optional(),
});

/**
 * Performance environment schema
 */
export const performanceEnvironmentSchema = z.object({
  CACHE_TTL: numberString.optional(),
  REDIS_URL: z.string().optional(),
  MAX_UPLOAD_SIZE: numberString.optional(),
  REQUEST_TIMEOUT: numberString.optional(),
  ENABLE_COMPRESSION: booleanString.optional(),
  WORKER_THREADS: numberString.optional(),
});

/**
 * Security environment schema
 */
export const securityEnvironmentSchema = z.object({
  CORS_ORIGIN: z.string().optional(),
  CORS_METHODS: z.string().optional(),
  RATE_LIMIT_WINDOW: numberString.optional(),
  RATE_LIMIT_MAX_REQUESTS: numberString.optional(),
  SECURE_COOKIES: booleanString.optional(),
  CSRF_PROTECTION: booleanString.optional(),
  CSRF_SECRET: z.string().optional(),
  CSP_DIRECTIVES: z.string().optional(),
  TRUSTED_PROXIES: z.string().optional(),
});

/**
 * Development environment schema
 */
export const developmentEnvironmentSchema = z.object({
  HMR_ENABLED: booleanString.optional(),
  GENERATE_SOURCEMAP: booleanString.optional(),
  VITE_DEV_SERVER_HOST: z.string().optional(),
  VITE_DEV_SERVER_PORT: portNumber.optional(),
  REACT_DEVTOOLS: booleanString.optional(),
  VUE_DEVTOOLS: booleanString.optional(),
});

/**
 * CDN environment schema
 */
export const cdnEnvironmentSchema = z.object({
  CDN_URL: urlString.optional(),
  ASSETS_PREFIX: z.string().optional(),
  IMAGE_OPTIMIZATION_URL: urlString.optional(),
  STATIC_CACHE_CONTROL: z.string().optional(),
});

/**
 * Monitoring environment schema
 */
export const monitoringEnvironmentSchema = z.object({
  SENTRY_DSN: z.string().optional(),
  SENTRY_ENVIRONMENT: z.string().optional(),
  SENTRY_RELEASE: z.string().optional(),
  SENTRY_TRACES_SAMPLE_RATE: numberString.optional(),
  GOOGLE_ANALYTICS_ID: z.string().optional(),
  GTM_ID: z.string().optional(),
  MIXPANEL_TOKEN: z.string().optional(),
  SEGMENT_WRITE_KEY: z.string().optional(),
  NEW_RELIC_LICENSE_KEY: z.string().optional(),
  DATADOG_API_KEY: z.string().optional(),
});

/**
 * GraphQL environment schema
 */
export const graphqlEnvironmentSchema = z.object({
  GRAPHQL_ENDPOINT: urlString.optional(),
  GRAPHQL_WS_ENDPOINT: z.string().optional(),
  GRAPHQL_PLAYGROUND: booleanString.optional(),
  GRAPHQL_INTROSPECTION: booleanString.optional(),
  GRAPHQL_DEPTH_LIMIT: numberString.optional(),
  GRAPHQL_COMPLEXITY_LIMIT: numberString.optional(),
});

/**
 * Complete environment schema
 */
export const environmentSchema = z
  .object({})
  .merge(appEnvironmentSchema)
  .merge(databaseEnvironmentSchema)
  .merge(authEnvironmentSchema)
  .merge(firebaseEnvironmentSchema)
  .merge(appwriteEnvironmentSchema)
  .merge(tauriEnvironmentSchema)
  .merge(apiEnvironmentSchema)
  .merge(awsEnvironmentSchema)
  .merge(stripeEnvironmentSchema)
  .merge(emailEnvironmentSchema)
  .merge(featureEnvironmentSchema)
  .merge(loggingEnvironmentSchema)
  .merge(performanceEnvironmentSchema)
  .merge(securityEnvironmentSchema)
  .merge(developmentEnvironmentSchema)
  .merge(cdnEnvironmentSchema)
  .merge(monitoringEnvironmentSchema)
  .merge(graphqlEnvironmentSchema)
  .passthrough(); // Allow additional custom environment variables

/**
 * Client-safe environment schema (browser accessible)
 */
export const clientEnvironmentSchema = z.object({
  NODE_ENV: nodeEnvironmentSchema,
  // All VITE_ prefixed variables
  VITE_FIREBASE_API_KEY: z.string().optional(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().optional(),
  VITE_FIREBASE_PROJECT_ID: z.string().optional(),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().optional(),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().optional(),
  VITE_FIREBASE_APP_ID: z.string().optional(),
  VITE_FIREBASE_MEASUREMENT_ID: z.string().optional(),
  VITE_APPWRITE_ENDPOINT: urlString.optional(),
  VITE_APPWRITE_PROJECT: z.string().optional(),
  VITE_APPWRITE_DATABASE_ID: z.string().optional(),
  VITE_APPWRITE_COLLECTION_ID: z.string().optional(),
  VITE_DEV_SERVER_HOST: z.string().optional(),
  VITE_DEV_SERVER_PORT: portNumber.optional(),
  PUBLIC_URL: urlString.optional(),
}).passthrough(); // Allow custom VITE_ variables

/**
 * Production required environment schema
 */
export const productionRequiredSchema = z.object({
  NODE_ENV: z.literal('production'),
  JWT_SECRET: nonEmptyString,
  SESSION_SECRET: nonEmptyString,
  DATABASE_URL: nonEmptyString,
});

/**
 * Development required environment schema
 */
export const developmentRequiredSchema = z.object({
  NODE_ENV: z.literal('development'),
});

/**
 * Get required schema based on environment
 */
export function getRequiredSchema(env: string = process.env.NODE_ENV || 'development') {
  switch (env) {
    case 'production':
      return productionRequiredSchema;
    case 'development':
      return developmentRequiredSchema;
    default:
      return z.object({ NODE_ENV: nodeEnvironmentSchema });
  }
}

/**
 * Validate environment variables
 */
export function validateEnvironment(
  env: Record<string, string | undefined>,
  schema: z.ZodSchema = environmentSchema
): z.infer<typeof schema> {
  return schema.parse(env);
}

/**
 * Safe validate environment variables (doesn't throw)
 */
export function safeValidateEnvironment(
  env: Record<string, string | undefined>,
  schema: z.ZodSchema = environmentSchema
): { success: true; data: z.infer<typeof schema> } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(env);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Create typed environment object with defaults
 */
export function createEnvironment<T extends z.ZodSchema>(
  schema: T,
  env: Record<string, string | undefined> = process.env
): z.infer<T> {
  return validateEnvironment(env, schema);
}

/**
 * Type guards for environment checking
 */
export const isProduction = (env: { NODE_ENV?: string } = process.env): boolean =>
  env.NODE_ENV === 'production';

export const isDevelopment = (env: { NODE_ENV?: string } = process.env): boolean =>
  env.NODE_ENV === 'development';

export const isTest = (env: { NODE_ENV?: string } = process.env): boolean =>
  env.NODE_ENV === 'test';

export const isStaging = (env: { NODE_ENV?: string } = process.env): boolean =>
  env.NODE_ENV === 'staging';

/**
 * Export all schemas for individual use
 */
export const schemas = {
  app: appEnvironmentSchema,
  database: databaseEnvironmentSchema,
  auth: authEnvironmentSchema,
  firebase: firebaseEnvironmentSchema,
  appwrite: appwriteEnvironmentSchema,
  tauri: tauriEnvironmentSchema,
  api: apiEnvironmentSchema,
  aws: awsEnvironmentSchema,
  stripe: stripeEnvironmentSchema,
  email: emailEnvironmentSchema,
  features: featureEnvironmentSchema,
  logging: loggingEnvironmentSchema,
  performance: performanceEnvironmentSchema,
  security: securityEnvironmentSchema,
  development: developmentEnvironmentSchema,
  cdn: cdnEnvironmentSchema,
  monitoring: monitoringEnvironmentSchema,
  graphql: graphqlEnvironmentSchema,
  complete: environmentSchema,
  client: clientEnvironmentSchema,
  productionRequired: productionRequiredSchema,
  developmentRequired: developmentRequiredSchema,
} as const;
