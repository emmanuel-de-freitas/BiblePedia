// Firebase service with lazy initialization for Next.js static export
// This module only initializes Firebase on the client side to support SSR/static generation

import type { Analytics } from "firebase/analytics";
import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

// Cached Firebase instances (only populated on client)
let firebaseApp: FirebaseApp | null = null;
let firestoreInstance: Firestore | null = null;
let authInstance: Auth | null = null;
let analyticsInstance: Analytics | null = null;

// Track initialization state
let isInitialized = false;
let initializationPromise: Promise<FirebaseApp | null> | null = null;

/**
 * Check if we're running in a browser environment
 */
function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Get Firebase configuration from environment variables
 * Uses NEXT_PUBLIC_ prefix for Next.js client-side access
 */
function getFirebaseConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
}

/**
 * Validate that required Firebase config values are present
 */
function validateConfig(config: ReturnType<typeof getFirebaseConfig>): boolean {
  const requiredFields = ["apiKey", "authDomain", "projectId", "appId"] as const;

  for (const field of requiredFields) {
    if (!config[field]) {
      console.error(
        `Firebase configuration error: Missing required field "${field}". ` +
        `Make sure NEXT_PUBLIC_FIREBASE_${field.replace(/([A-Z])/g, "_$1").toUpperCase()} is set.`
      );
      return false;
    }
  }

  return true;
}

/**
 * Lazily initialize the Firebase app
 * Only runs on the client side
 * Returns null during SSR/static generation or if config is missing
 */
export async function getFirebaseApp(): Promise<FirebaseApp | null> {
  // Return null during SSR/static generation
  if (!isBrowser()) {
    return null;
  }

  // Return cached instance if already initialized
  if (isInitialized) {
    return firebaseApp;
  }

  // Return existing promise if initialization is in progress
  if (initializationPromise) {
    return initializationPromise;
  }

  // Start initialization
  initializationPromise = (async () => {
    try {
      const config = getFirebaseConfig();

      // Validate configuration
      if (!validateConfig(config)) {
        isInitialized = true;
        return null;
      }

      // Dynamically import Firebase to avoid SSR issues
      const { initializeApp, getApps } = await import("firebase/app");

      // Check if Firebase is already initialized (e.g., from hot reload)
      const existingApps = getApps();
      if (existingApps.length > 0) {
        firebaseApp = existingApps[0];
      } else {
        firebaseApp = initializeApp(config);
      }

      isInitialized = true;
      return firebaseApp;
    } catch (error) {
      console.error("Failed to initialize Firebase:", error);
      isInitialized = true;
      return null;
    }
  })();

  return initializationPromise;
}

/**
 * Get Firestore instance with lazy initialization
 * Returns null during SSR/static generation or if Firebase is not configured
 */
export async function getFirestore(): Promise<Firestore | null> {
  // Return cached instance
  if (firestoreInstance) {
    return firestoreInstance;
  }

  // Get Firebase app first
  const app = await getFirebaseApp();
  if (!app) {
    return null;
  }

  try {
    const { getFirestore: getFirestoreFromSDK } = await import("firebase/firestore");
    firestoreInstance = getFirestoreFromSDK(app);
    return firestoreInstance;
  } catch (error) {
    console.error("Failed to initialize Firestore:", error);
    return null;
  }
}

/**
 * Get Firebase Auth instance with lazy initialization
 * Returns null during SSR/static generation or if Firebase is not configured
 */
export async function getAuth(): Promise<Auth | null> {
  // Return cached instance
  if (authInstance) {
    return authInstance;
  }

  // Get Firebase app first
  const app = await getFirebaseApp();
  if (!app) {
    return null;
  }

  try {
    const { getAuth: getAuthFromSDK } = await import("firebase/auth");
    authInstance = getAuthFromSDK(app);
    return authInstance;
  } catch (error) {
    console.error("Failed to initialize Firebase Auth:", error);
    return null;
  }
}

/**
 * Get Firebase Analytics instance with lazy initialization
 * Only works in browser environments with a valid measurementId
 * Returns null during SSR/static generation, if Firebase is not configured,
 * or if measurementId is not set
 */
export async function getAnalytics(): Promise<Analytics | null> {
  // Analytics only works in browser
  if (!isBrowser()) {
    return null;
  }

  // Return cached instance
  if (analyticsInstance) {
    return analyticsInstance;
  }

  // Get Firebase app first
  const app = await getFirebaseApp();
  if (!app) {
    return null;
  }

  // Check if measurementId is configured
  const config = getFirebaseConfig();
  if (!config.measurementId) {
    console.warn(
      "Firebase Analytics: measurementId is not configured. " +
      "Set NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID to enable analytics."
    );
    return null;
  }

  try {
    const { getAnalytics: getAnalyticsFromSDK, isSupported } = await import("firebase/analytics");

    // Check if analytics is supported in this environment
    const supported = await isSupported();
    if (!supported) {
      console.warn("Firebase Analytics is not supported in this environment.");
      return null;
    }

    analyticsInstance = getAnalyticsFromSDK(app);
    return analyticsInstance;
  } catch (error) {
    console.error("Failed to initialize Firebase Analytics:", error);
    return null;
  }
}
