import { Client, Account, Databases } from "appwrite";
import { env } from "../config/env";

// Initialize Appwrite client with environment variables
const client = new Client()
    .setEndpoint(env.APPWRITE.ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(env.APPWRITE.PROJECT || "philagora");

// Initialize Appwrite services
const account = new Account(client);
const databases = new Databases(client);

// Export configured services
export { client, account, databases };

// Helper function to check if Appwrite is properly configured
export function isAppwriteConfigured(): boolean {
    return Boolean(env.APPWRITE.ENDPOINT && env.APPWRITE.PROJECT);
}

// Database helpers
export const db = {
    // Get database ID from environment
    getDatabaseId: () => env.APPWRITE.DATABASE_ID || "default",

    // Get collection ID from environment
    getCollectionId: () => env.APPWRITE.COLLECTION_ID || "default",

    // Helper to create a document
    createDocument: async (data: any, collectionId?: string, databaseId?: string) => {
        return databases.createDocument(
            databaseId || db.getDatabaseId(),
            collectionId || db.getCollectionId(),
            "unique()",
            data
        );
    },

    // Helper to list documents
    listDocuments: async (queries?: string[], collectionId?: string, databaseId?: string) => {
        return databases.listDocuments(
            databaseId || db.getDatabaseId(),
            collectionId || db.getCollectionId(),
            queries
        );
    },

    // Helper to get a document
    getDocument: async (documentId: string, collectionId?: string, databaseId?: string) => {
        return databases.getDocument(
            databaseId || db.getDatabaseId(),
            collectionId || db.getCollectionId(),
            documentId
        );
    },

    // Helper to update a document
    updateDocument: async (documentId: string, data: any, collectionId?: string, databaseId?: string) => {
        return databases.updateDocument(
            databaseId || db.getDatabaseId(),
            collectionId || db.getCollectionId(),
            documentId,
            data
        );
    },

    // Helper to delete a document
    deleteDocument: async (documentId: string, collectionId?: string, databaseId?: string) => {
        return databases.deleteDocument(
            databaseId || db.getDatabaseId(),
            collectionId || db.getCollectionId(),
            documentId
        );
    }
};

// Auth helpers
export const auth = {
    // Create email session
    createEmailSession: async (email: string, password: string) => {
        return account.createEmailPasswordSession(email, password);
    },

    // Create account
    createAccount: async (email: string, password: string, name?: string) => {
        return account.create("unique()", email, password, name);
    },

    // Get current user
    getCurrentUser: async () => {
        try {
            return await account.get();
        } catch (error) {
            return null;
        }
    },

    // Logout
    logout: async () => {
        return account.deleteSession("current");
    },

    // Check if user is logged in
    isLoggedIn: async () => {
        const user = await auth.getCurrentUser();
        return user !== null;
    }
};
