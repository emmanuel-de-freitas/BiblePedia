import { invoke } from "@tauri-apps/api/core";
import { listen, type UnlistenFn } from "@tauri-apps/api/event";
import React from "react";

/**
 * Payload structure for splashscreen status updates
 */
export interface SplashscreenStatus {
	message: string;
	progress: number | null;
}

/**
 * Close the splashscreen and show the main dashboard window
 * @throws {string} Error message if the operation fails
 */
export async function closeSplashscreen(): Promise<void> {
	try {
		await invoke("close_splashscreen_command");
	} catch (error) {
		console.error("Failed to close splashscreen:", error);
		throw error;
	}
}

/**
 * Update the splashscreen loading status
 * @param message - Loading message to display
 * @param progress - Optional progress percentage (0-100)
 * @throws {string} Error message if the operation fails
 */
export async function updateSplashscreenStatus(message: string, progress?: number): Promise<void> {
	try {
		await invoke("update_splashscreen_status", {
			message,
			progress: progress ?? null,
		});
	} catch (error) {
		console.error("Failed to update splashscreen status:", error);
		throw error;
	}
}

/**
 * Listen for splashscreen status updates from the Rust backend
 * @param callback - Function to call when status updates are received
 * @returns Promise resolving to an unlisten function
 */
export async function listenToSplashscreenStatus(
	callback: (status: SplashscreenStatus) => void
): Promise<UnlistenFn> {
	return await listen<[string, number | null]>("splashscreen-status", (event) => {
		const [message, progress] = event.payload;
		callback({ message, progress });
	});
}

/**
 * Splashscreen manager class for easier state management
 */
export class SplashscreenManager {
	private unlisten?: UnlistenFn;
	private statusCallback?: (status: SplashscreenStatus) => void;

	/**
	 * Initialize the splashscreen manager and start listening for updates
	 * @param onStatusUpdate - Callback for status updates
	 */
	async initialize(onStatusUpdate: (status: SplashscreenStatus) => void): Promise<void> {
		this.statusCallback = onStatusUpdate;
		this.unlisten = await listenToSplashscreenStatus(onStatusUpdate);
	}

	/**
	 * Update the splashscreen status
	 */
	async updateStatus(message: string, progress?: number): Promise<void> {
		await updateSplashscreenStatus(message, progress);
	}

	/**
	 * Close the splashscreen
	 */
	async close(): Promise<void> {
		await closeSplashscreen();
		this.cleanup();
	}

	/**
	 * Clean up event listeners
	 */
	cleanup(): void {
		if (this.unlisten) {
			this.unlisten();
			this.unlisten = undefined;
		}
	}
}

/**
 * React hook for managing splashscreen (optional, if using React)
 */
export function useSplashscreen(onStatusUpdate?: (status: SplashscreenStatus) => void) {
	const [status, setStatus] = React.useState<SplashscreenStatus>({
		message: "Loading...",
		progress: 0,
	});

	React.useEffect(() => {
		let unlisten: UnlistenFn | undefined;

		const setupListener = async () => {
			unlisten = await listenToSplashscreenStatus((newStatus) => {
				setStatus(newStatus);
				onStatusUpdate?.(newStatus);
			});
		};

		setupListener();

		return () => {
			if (unlisten) {
				unlisten();
			}
		};
	}, [onStatusUpdate]);

	return {
		status,
		close: closeSplashscreen,
		updateStatus: updateSplashscreenStatus,
	};
}
