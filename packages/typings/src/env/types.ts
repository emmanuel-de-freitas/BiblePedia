/**
 * Environment Variable Type Definitions
 *
 * This module provides comprehensive type definitions for all environment variables
 * used across the monorepo, with proper categorization and documentation.
 */

/**
 * Node environment types
 */
export type NodeEnvironment = "development" | "production" | "test" | "staging";

/**
 * Log level types
 */
export type LogLevel = "error" | "warn" | "info" | "debug" | "trace" | "silent";

/**
 * Log output types
 */
export type LogOutput = "console" | "file" | "both" | "json";

/**
 * Core application environment variables
 */
export interface AppEnvironmentVariables {
	/** Node environment */
	NODE_ENV: NodeEnvironment;
	/** Application port */
	PORT?: string;
	/** Application base URL */
	APP_URL?: string;
	/** Application name */
	APP_NAME?: string;
	/** Application version */
	APP_VERSION?: string;
	/** Public URL for assets */
	PUBLIC_URL?: string;
}

/**
 * Database environment variables
 */
export interface DatabaseEnvironmentVariables {
	/** Full database connection URL */
	DATABASE_URL?: string;
	/** Database host */
	DB_HOST?: string;
	/** Database port */
	DB_PORT?: string;
	/** Database user */
	DB_USER?: string;
	/** Database password */
	DB_PASSWORD?: string;
	/** Database name */
	DB_NAME?: string;
	/** Database SSL mode */
	DB_SSL?: string;
	/** Database connection pool size */
	DB_POOL_SIZE?: string;
	/** Database connection timeout in milliseconds */
	DB_CONNECTION_TIMEOUT?: string;
}

/**
 * Authentication environment variables
 */
export interface AuthEnvironmentVariables {
	/** JWT secret key */
	JWT_SECRET?: string;
	/** JWT expiration time */
	JWT_EXPIRES_IN?: string;
	/** JWT refresh token expiration */
	JWT_REFRESH_EXPIRES_IN?: string;
	/** Session secret */
	SESSION_SECRET?: string;
	/** Session max age in milliseconds */
	SESSION_MAX_AGE?: string;
	/** OAuth redirect URL */
	OAUTH_REDIRECT_URL?: string;
}

/**
 * Firebase environment variables (Vite exposed)
 */
export interface FirebaseEnvironmentVariables {
	/** Firebase API key */
	VITE_FIREBASE_API_KEY?: string;
	/** Firebase Auth domain */
	VITE_FIREBASE_AUTH_DOMAIN?: string;
	/** Firebase project ID */
	VITE_FIREBASE_PROJECT_ID?: string;
	/** Firebase storage bucket */
	VITE_FIREBASE_STORAGE_BUCKET?: string;
	/** Firebase messaging sender ID */
	VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
	/** Firebase app ID */
	VITE_FIREBASE_APP_ID?: string;
	/** Firebase measurement ID */
	VITE_FIREBASE_MEASUREMENT_ID?: string;
}

/**
 * Appwrite environment variables (Vite exposed)
 */
export interface AppwriteEnvironmentVariables {
	/** Appwrite endpoint URL */
	VITE_APPWRITE_ENDPOINT?: string;
	/** Appwrite project ID */
	VITE_APPWRITE_PROJECT?: string;
	/** Appwrite database ID */
	VITE_APPWRITE_DATABASE_ID?: string;
	/** Appwrite collection ID */
	VITE_APPWRITE_COLLECTION_ID?: string;
	/** Appwrite API key (server-side only) */
	APPWRITE_API_KEY?: string;
}

/**
 * Tauri-specific environment variables
 */
export interface TauriEnvironmentVariables {
	/** Tauri debug mode flag */
	TAURI_ENV_DEBUG?: string;
	/** Tauri target platform */
	TAURI_ENV_PLATFORM?: string;
	/** Tauri development host */
	TAURI_DEV_HOST?: string;
	/** Tauri environment */
	TAURI_ENV?: string;
}

/**
 * API and third-party service environment variables
 */
export interface ApiEnvironmentVariables {
	/** Generic API key */
	API_KEY?: string;
	/** Generic API secret */
	API_SECRET?: string;
	/** API base URL */
	API_BASE_URL?: string;
	/** API version */
	API_VERSION?: string;
	/** API timeout in milliseconds */
	API_TIMEOUT?: string;
}

/**
 * AWS environment variables
 */
export interface AwsEnvironmentVariables {
	/** AWS access key ID */
	AWS_ACCESS_KEY_ID?: string;
	/** AWS secret access key */
	AWS_SECRET_ACCESS_KEY?: string;
	/** AWS region */
	AWS_REGION?: string;
	/** AWS S3 bucket name */
	AWS_S3_BUCKET?: string;
	/** AWS CloudFront distribution ID */
	AWS_CLOUDFRONT_DISTRIBUTION_ID?: string;
}

/**
 * Stripe environment variables
 */
export interface StripeEnvironmentVariables {
	/** Stripe publishable key */
	STRIPE_PUBLISHABLE_KEY?: string;
	/** Stripe secret key */
	STRIPE_SECRET_KEY?: string;
	/** Stripe webhook secret */
	STRIPE_WEBHOOK_SECRET?: string;
	/** Stripe API version */
	STRIPE_API_VERSION?: string;
}

/**
 * Email service environment variables
 */
export interface EmailEnvironmentVariables {
	/** Email service provider */
	EMAIL_PROVIDER?: string;
	/** Email host */
	EMAIL_HOST?: string;
	/** Email port */
	EMAIL_PORT?: string;
	/** Email username */
	EMAIL_USER?: string;
	/** Email password */
	EMAIL_PASSWORD?: string;
	/** Default from address */
	EMAIL_FROM?: string;
	/** Default from name */
	EMAIL_FROM_NAME?: string;
	/** Email secure connection */
	EMAIL_SECURE?: string;
}

/**
 * Feature flags environment variables
 */
export interface FeatureEnvironmentVariables {
	/** Enable analytics */
	ENABLE_ANALYTICS?: string;
	/** Enable debug mode */
	ENABLE_DEBUG_MODE?: string;
	/** Enable beta features */
	ENABLE_BETA_FEATURES?: string;
	/** Enable experimental features */
	ENABLE_EXPERIMENTAL?: string;
	/** Enable maintenance mode */
	ENABLE_MAINTENANCE_MODE?: string;
	/** Enable API rate limiting */
	ENABLE_RATE_LIMITING?: string;
}

/**
 * Logging environment variables
 */
export interface LoggingEnvironmentVariables {
	/** Log level */
	LOG_LEVEL?: LogLevel;
	/** Log output destination */
	LOG_OUTPUT?: LogOutput;
	/** Log file path */
	LOG_FILE_PATH?: string;
	/** Enable structured logging */
	LOG_STRUCTURED?: string;
	/** Log rotation enabled */
	LOG_ROTATION?: string;
	/** Maximum log file size */
	LOG_MAX_SIZE?: string;
	/** Maximum number of log files */
	LOG_MAX_FILES?: string;
}

/**
 * Performance and optimization environment variables
 */
export interface PerformanceEnvironmentVariables {
	/** Cache TTL in seconds */
	CACHE_TTL?: string;
	/** Redis cache URL */
	REDIS_URL?: string;
	/** Maximum upload size in MB */
	MAX_UPLOAD_SIZE?: string;
	/** Request timeout in milliseconds */
	REQUEST_TIMEOUT?: string;
	/** Enable response compression */
	ENABLE_COMPRESSION?: string;
	/** Worker threads count */
	WORKER_THREADS?: string;
}

/**
 * Security environment variables
 */
export interface SecurityEnvironmentVariables {
	/** CORS allowed origins */
	CORS_ORIGIN?: string;
	/** CORS allowed methods */
	CORS_METHODS?: string;
	/** Rate limit window in milliseconds */
	RATE_LIMIT_WINDOW?: string;
	/** Maximum requests per rate limit window */
	RATE_LIMIT_MAX_REQUESTS?: string;
	/** Enable secure cookies */
	SECURE_COOKIES?: string;
	/** Enable CSRF protection */
	CSRF_PROTECTION?: string;
	/** CSRF token secret */
	CSRF_SECRET?: string;
	/** Content Security Policy */
	CSP_DIRECTIVES?: string;
	/** Trusted proxies */
	TRUSTED_PROXIES?: string;
}

/**
 * Development environment variables
 */
export interface DevelopmentEnvironmentVariables {
	/** Enable HMR */
	HMR_ENABLED?: string;
	/** Generate source maps */
	GENERATE_SOURCEMAP?: string;
	/** Vite development server host */
	VITE_DEV_SERVER_HOST?: string;
	/** Vite development server port */
	VITE_DEV_SERVER_PORT?: string;
	/** Vite development server full URL (used by Electrobun desktop to connect) */
	VITE_DEV_SERVER_URL?: string;
	/** Custom port for the Vite dev server */
	VITE_PORT?: string;
	/** Enable verbose debug logging */
	DEBUG?: string;
	/** Auto-open DevTools on startup */
	OPEN_DEVTOOLS?: string;
	/** Enable React DevTools */
	REACT_DEVTOOLS?: string;
	/** Enable Vue DevTools */
	VUE_DEVTOOLS?: string;
}

/**
 * Electrobun desktop-specific environment variables
 */
export interface ElectrobunEnvironmentVariables {
	/** Vite development server full URL for the Electrobun window to load */
	VITE_DEV_SERVER_URL?: string;
	/** Custom port for the Vite dev server */
	VITE_PORT?: string;
	/** Enable verbose debug logging */
	DEBUG?: string;
	/** Auto-open DevTools on startup */
	OPEN_DEVTOOLS?: string;
}

/**
 * CDN and asset environment variables
 */
export interface CdnEnvironmentVariables {
	/** CDN base URL */
	CDN_URL?: string;
	/** Assets prefix path */
	ASSETS_PREFIX?: string;
	/** Image optimization service URL */
	IMAGE_OPTIMIZATION_URL?: string;
	/** Static files cache control header */
	STATIC_CACHE_CONTROL?: string;
}

/**
 * Monitoring and analytics environment variables
 */
export interface MonitoringEnvironmentVariables {
	/** Sentry DSN */
	SENTRY_DSN?: string;
	/** Sentry environment */
	SENTRY_ENVIRONMENT?: string;
	/** Sentry release */
	SENTRY_RELEASE?: string;
	/** Sentry traces sample rate */
	SENTRY_TRACES_SAMPLE_RATE?: string;
	/** Google Analytics measurement ID */
	GOOGLE_ANALYTICS_ID?: string;
	/** Google Tag Manager ID */
	GTM_ID?: string;
	/** Mixpanel token */
	MIXPANEL_TOKEN?: string;
	/** Segment write key */
	SEGMENT_WRITE_KEY?: string;
	/** New Relic license key */
	NEW_RELIC_LICENSE_KEY?: string;
	/** DataDog API key */
	DATADOG_API_KEY?: string;
}

/**
 * GraphQL environment variables
 */
export interface GraphQLEnvironmentVariables {
	/** GraphQL endpoint URL */
	GRAPHQL_ENDPOINT?: string;
	/** GraphQL WebSocket URL */
	GRAPHQL_WS_ENDPOINT?: string;
	/** GraphQL playground enabled */
	GRAPHQL_PLAYGROUND?: string;
	/** GraphQL introspection enabled */
	GRAPHQL_INTROSPECTION?: string;
	/** GraphQL depth limit */
	GRAPHQL_DEPTH_LIMIT?: string;
	/** GraphQL complexity limit */
	GRAPHQL_COMPLEXITY_LIMIT?: string;
}

/**
 * Complete environment variables interface combining all categories
 */
export interface EnvironmentVariables
	extends AppEnvironmentVariables,
		DatabaseEnvironmentVariables,
		AuthEnvironmentVariables,
		FirebaseEnvironmentVariables,
		AppwriteEnvironmentVariables,
		TauriEnvironmentVariables,
		ApiEnvironmentVariables,
		AwsEnvironmentVariables,
		StripeEnvironmentVariables,
		EmailEnvironmentVariables,
		FeatureEnvironmentVariables,
		LoggingEnvironmentVariables,
		PerformanceEnvironmentVariables,
		SecurityEnvironmentVariables,
		DevelopmentEnvironmentVariables,
		CdnEnvironmentVariables,
		MonitoringEnvironmentVariables,
		GraphQLEnvironmentVariables {
	// Allow for custom environment variables
	[key: string]: string | undefined;
}

/**
 * Client-side safe environment variables (exposed to browser)
 * Only includes variables with VITE_ or PUBLIC_ prefix
 */
export interface ClientEnvironmentVariables {
	NODE_ENV: NodeEnvironment;
	// Firebase (all VITE_ prefixed)
	VITE_FIREBASE_API_KEY?: string;
	VITE_FIREBASE_AUTH_DOMAIN?: string;
	VITE_FIREBASE_PROJECT_ID?: string;
	VITE_FIREBASE_STORAGE_BUCKET?: string;
	VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
	VITE_FIREBASE_APP_ID?: string;
	VITE_FIREBASE_MEASUREMENT_ID?: string;
	// Appwrite (all VITE_ prefixed)
	VITE_APPWRITE_ENDPOINT?: string;
	VITE_APPWRITE_PROJECT?: string;
	VITE_APPWRITE_DATABASE_ID?: string;
	VITE_APPWRITE_COLLECTION_ID?: string;
	// Development
	VITE_DEV_SERVER_HOST?: string;
	VITE_DEV_SERVER_PORT?: string;
	// Public URLs
	PUBLIC_URL?: string;
	// Allow for custom VITE_ prefixed variables
	[key: `VITE_${string}`]: string | undefined;
}

/**
 * Server-side only environment variables (never exposed to browser)
 */
export interface ServerEnvironmentVariables
	extends Omit<EnvironmentVariables, keyof ClientEnvironmentVariables> {
	// Explicitly server-only sensitive variables
	JWT_SECRET: string;
	SESSION_SECRET: string;
	DATABASE_URL: string;
	API_KEY: string;
	API_SECRET: string;
	AWS_ACCESS_KEY_ID: string;
	AWS_SECRET_ACCESS_KEY: string;
	STRIPE_SECRET_KEY: string;
	EMAIL_PASSWORD: string;
	APPWRITE_API_KEY: string;
}

/**
 * Required environment variables for production
 */
export interface RequiredProductionVariables {
	NODE_ENV: "production";
	JWT_SECRET: string;
	SESSION_SECRET: string;
	DATABASE_URL: string;
}

/**
 * Environment variable validation error
 */
export class EnvironmentValidationError extends Error {
	constructor(
		public readonly missingVariables: string[],
		public readonly invalidVariables: Record<string, string>
	) {
		const message = [
			missingVariables.length > 0 && `Missing required variables: ${missingVariables.join(", ")}`,
			Object.keys(invalidVariables).length > 0 &&
				`Invalid variables: ${Object.entries(invalidVariables)
					.map(([key, error]) => `${key} (${error})`)
					.join(", ")}`,
		]
			.filter(Boolean)
			.join("\n");

		super(message);
		this.name = "EnvironmentValidationError";
	}
}
