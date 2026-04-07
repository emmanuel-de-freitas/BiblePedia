interface ProgressUpdate {
	stage: string;
	progress: number;
	message: string;
}

interface ExtractionResult {
	success: boolean;
	metadata: any;
	error: string | null;
}

export type { ExtractionResult, ProgressUpdate };
