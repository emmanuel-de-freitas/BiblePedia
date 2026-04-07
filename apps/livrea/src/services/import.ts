import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import type { ExtractionResult, ProgressUpdate } from "@/types";

/**
 * Imports an EPUB file.
 *
 * @param path Path to the EPUB file to import.
 * @param onProgress Callback function to receive progress updates.
 * @returns Promise<ExtractionResult> that resolves when the import is complete.
 *
 * @example
 * // basic usage
 * const result = await importEpub('/path/to/book.epub');
 *
 * // advanced usage
 * const result = await importEpub('/path/to/book.epub', (progress) => {
 *   console.log(`Progress: ${progress.percent}%`);
 * });
 */
async function importEpub(
	path: string,
	onProgress?: (progress?: ProgressUpdate) => void
): Promise<ExtractionResult> {
	try {
		// Listen for progress updates
		const unlisten = await listen<ProgressUpdate>("extraction-progress", (event) => {
			if (onProgress) onProgress(event.payload);
		});

		// Validate EPUB
		await invoke("open_epub", { filePath: path });

		// Extract metadata
		const result = await invoke<ExtractionResult>("extract_epub_metadata", {
			filePath: path,
		});

		if (!result.success || !result.metadata) {
			await invoke("show_error_dialog", {
				message: result.error || "Failed to extract metadata",
			});
			unlisten();
			throw new Error("Failed to extract metadata");
		}

		// Save to database
		await invoke("save_book_metadata", { metadata: result.metadata });

		await invoke("show_success_dialog", {
			message: `Successfully imported: ${result.metadata.title || "Unknown Title"}`,
		});

		unlisten();
		return result;
	} catch (error) {
		console.error("Import failed:", error);
		await invoke("show_error_dialog", {
			message: `Import failed: ${error}`,
		});
		throw error;
	} finally {
		if (onProgress) onProgress(undefined);
	}
}

/**
 * Browse files using the native file dialog.
 * @returns Promise<string> that resolves with the selected file path.
 */
async function browseFiles(): Promise<string> {
	try {
		const filePath = await invoke<string | null>("open_file_dialog");
		if (filePath) {
			// Extract filename from path
			const fileName = filePath.split(/[\\/]/).pop() || "Unknown";
			return fileName;
		}
		throw new Error("No file selected");
	} catch (error) {
		console.error("File selection failed:", error);
		throw error;
	}
}

export { browseFiles, importEpub };
