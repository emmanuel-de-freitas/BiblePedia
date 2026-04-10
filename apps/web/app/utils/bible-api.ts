/**
 * BiblePedia API client
 * Typed TypeScript client compatible with bible.helloao.org URL structure.
 */

const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:8000";

let _authToken: string | null = null;

/** Set the Bearer token used for authenticated requests. */
export function setAuthToken(token: string | null): void {
	_authToken = token;
}

function buildHeaders(): HeadersInit {
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
	};
	if (_authToken) {
		headers["Authorization"] = `Bearer ${_authToken}`;
	}
	return headers;
}

async function apiFetch<T>(path: string): Promise<T> {
	const url = `${BASE_URL}${path}`;
	const response = await fetch(url, { headers: buildHeaders() });
	if (!response.ok) {
		throw new Error(`BiblePedia API error ${response.status}: ${response.statusText} (${url})`);
	}
	return response.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Shared content types
// ---------------------------------------------------------------------------

export interface ChapterVerseContentWord {
	text: string;
	poem?: number;
}

export interface ChapterVerseContentNoteRef {
	noteId: string;
}

export interface ChapterVerseContentHeading {
	heading: string;
}

export type ChapterVerseContentItem =
	| string
	| ChapterVerseContentWord
	| ChapterVerseContentNoteRef
	| ChapterVerseContentHeading;

export interface ChapterVerse {
	type: "verse";
	number: number;
	content: ChapterVerseContentItem[];
}

export interface ChapterHeading {
	type: "heading";
	content: string[];
}

export interface ChapterLineBreak {
	type: "line_break";
}

export type ChapterContent = ChapterVerse | ChapterHeading | ChapterLineBreak;

export interface Footnote {
	noteId: string;
	text: string;
	caller: string;
}

// ---------------------------------------------------------------------------
// Translation types
// ---------------------------------------------------------------------------

export interface Translation {
	id: string;
	name: string;
	englishName: string;
	website: string | null;
	licenseUrl: string | null;
	shortName: string | null;
	language: string;
	languageName: string;
	languageEnglishName: string;
	textDirection: string;
	availableFormats: string[] | null;
	numberOfBooks: number;
	totalChapters: number;
	totalVerses: number;
}

export interface TranslationBook {
	id: string;
	translationId: string;
	name: string;
	commonName: string;
	title: string | null;
	order: number;
	numberOfChapters: number;
	firstChapterNumber: number;
	lastChapterNumber: number;
	totalVerses: number;
	isApocryphal: boolean;
}

export interface AvailableTranslations {
	translations: Translation[];
}

export interface TranslationBooks {
	translation: Translation;
	books: TranslationBook[];
}

export interface ChapterData {
	translation: Translation;
	book: TranslationBook;
	thisChapterLink: string;
	thisChapterAudioLinks: Record<string, string> | null;
	nextChapterLink: string | null;
	previousChapterLink: string | null;
	numberOfVerses: number;
	content: ChapterContent[];
	footnotes: Footnote[] | null;
}

export interface TranslationComplete {
	translation: Translation;
	books: TranslationBook[];
	chapters: Array<{
		bookId: string;
		chapterNumber: number;
		numberOfVerses: number;
		content: ChapterContent[];
	}>;
}

// ---------------------------------------------------------------------------
// Commentary types
// ---------------------------------------------------------------------------

export interface Commentary {
	id: string;
	name: string;
	englishName: string;
	website: string | null;
	licenseUrl: string | null;
	shortName: string | null;
	language: string;
	languageName: string;
	languageEnglishName: string;
	textDirection: string;
	introduction: string | null;
	numberOfBooks: number;
	totalChapters: number;
}

export interface CommentaryBook {
	id: string;
	commentaryId: string;
	name: string;
	commonName: string;
	title: string | null;
	order: number;
	numberOfChapters: number;
	firstChapterNumber: number;
	lastChapterNumber: number;
	isApocryphal: boolean;
}

export interface AvailableCommentaries {
	commentaries: Commentary[];
}

export interface CommentaryBooks {
	commentary: Commentary;
	books: CommentaryBook[];
}

export interface CommentaryBookChapter {
	commentary: Commentary;
	book: CommentaryBook;
	thisChapterLink: string;
	nextChapterLink: string | null;
	previousChapterLink: string | null;
	content: ChapterContent[];
}

export interface CommentaryProfile {
	id: string;
	commentaryId: string;
	name: string;
	introduction: string | null;
}

export interface CommentaryProfiles {
	commentary: Commentary;
	profiles: CommentaryProfile[];
}

export interface CommentaryProfileContent {
	commentary: Commentary;
	profile: CommentaryProfile;
	content: unknown[];
}

// ---------------------------------------------------------------------------
// Dataset types
// ---------------------------------------------------------------------------

export interface Dataset {
	id: string;
	name: string;
	englishName: string;
	website: string | null;
	licenseUrl: string | null;
	shortName: string | null;
	language: string;
	languageName: string;
	languageEnglishName: string;
	textDirection: string;
	numberOfBooks: number;
	totalChapters: number;
}

export interface DatasetBook {
	id: string;
	datasetId: string;
	name: string;
	commonName: string;
	title: string | null;
	order: number;
	numberOfChapters: number;
	firstChapterNumber: number;
	lastChapterNumber: number;
	isApocryphal: boolean;
}

export interface AvailableDatasets {
	datasets: Dataset[];
}

export interface DatasetBooks {
	dataset: Dataset;
	books: DatasetBook[];
}

export interface DatasetBookChapter {
	dataset: Dataset;
	book: DatasetBook;
	thisChapterLink: string;
	nextChapterLink: string | null;
	previousChapterLink: string | null;
	content: unknown[];
}

// ---------------------------------------------------------------------------
// API functions — Translations
// ---------------------------------------------------------------------------

export async function getAvailableTranslations(): Promise<AvailableTranslations> {
	return apiFetch<AvailableTranslations>("/api/available_translations.json");
}

export async function getTranslationBooks(translation: string): Promise<TranslationBooks> {
	return apiFetch<TranslationBooks>(`/api/${translation}/books.json`);
}

export async function getChapter(
	translation: string,
	book: string,
	chapter: number,
): Promise<ChapterData> {
	return apiFetch<ChapterData>(`/api/${translation}/${book}/${chapter}.json`);
}

export async function getCompleteTranslation(
	translation: string,
): Promise<TranslationComplete> {
	return apiFetch<TranslationComplete>(`/api/${translation}/complete.json`);
}

// ---------------------------------------------------------------------------
// API functions — Commentaries
// ---------------------------------------------------------------------------

export async function getAvailableCommentaries(): Promise<AvailableCommentaries> {
	return apiFetch<AvailableCommentaries>("/api/available_commentaries.json");
}

export async function getCommentaryBooks(commentary: string): Promise<CommentaryBooks> {
	return apiFetch<CommentaryBooks>(`/api/c/${commentary}/books.json`);
}

export async function getCommentaryChapter(
	commentary: string,
	book: string,
	chapter: number,
): Promise<CommentaryBookChapter> {
	return apiFetch<CommentaryBookChapter>(`/api/c/${commentary}/${book}/${chapter}.json`);
}

export async function getCommentaryProfiles(commentary: string): Promise<CommentaryProfiles> {
	return apiFetch<CommentaryProfiles>(`/api/c/${commentary}/profiles.json`);
}

export async function getCommentaryProfile(
	commentary: string,
	profile: string,
): Promise<CommentaryProfileContent> {
	return apiFetch<CommentaryProfileContent>(`/api/c/${commentary}/profiles/${profile}.json`);
}

// ---------------------------------------------------------------------------
// API functions — Datasets
// ---------------------------------------------------------------------------

export async function getAvailableDatasets(): Promise<AvailableDatasets> {
	return apiFetch<AvailableDatasets>("/api/available_datasets.json");
}

export async function getDatasetBooks(dataset: string): Promise<DatasetBooks> {
	return apiFetch<DatasetBooks>(`/api/d/${dataset}/books.json`);
}

export async function getDatasetChapter(
	dataset: string,
	book: string,
	chapter: number,
): Promise<DatasetBookChapter> {
	return apiFetch<DatasetBookChapter>(`/api/d/${dataset}/${book}/${chapter}.json`);
}
