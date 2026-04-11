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

// ---------------------------------------------------------------------------
// Sefaria API types
// ---------------------------------------------------------------------------

export interface SefariaVersion {
	versionTitle: string;
	shortVersionTitle?: string;
	language: string;
	actualLanguage?: string;
	languageFamilyName?: string;
	direction: "ltr" | "rtl";
	license?: string;
	versionSource?: string;
	isSource?: boolean;
	isPrimary?: boolean;
	text: string | string[] | string[][];
}

export interface SefariaV3TextsResponse {
	versions: SefariaVersion[];
	available_versions: SefariaVersion[];
	ref: string;
	heRef: string;
	book: string;
	heTitle: string;
	primary_category: string;
	type: string;
	categories: string[];
	sectionNames: string[];
	next: string | null;
	prev: string | null;
}

export interface SefariaTextsResponse {
	ref: string;
	heRef: string;
	book: string;
	text: string | string[];
	he: string | string[];
	versions?: SefariaVersion[];
	next: string | null;
	prev: string | null;
	type: string;
}

export interface SefariaLink {
	_id: string;
	index_title: string;
	category: string;
	type: string;
	ref: string;
	anchorRef: string;
	anchorText?: string;
	he?: string;
	text?: string;
	sourceRef?: string;
	sourceHeRef?: string;
}

export interface SefariaTopic {
	slug: string;
	titles: { text: string; lang: string; primary?: boolean }[];
	primaryTitle?: string;
	description?: string;
	links?: Record<string, unknown>;
	refs?: Array<{ ref: string; expandedRefs: string[] }>;
}

export interface SefariaCalendarItem {
	title: { en: string; he: string };
	displayValue: { en: string; he: string };
	ref: string;
	heRef: string;
	category?: string;
}

export interface SefariaCalendarResponse {
	date: string;
	timezone: string;
	calendar_items: SefariaCalendarItem[];
}

export interface SefariaLexiconEntry {
	headWord: string;
	morph?: string;
	parent_lexicon: string;
	content: { en?: string; morphology?: string };
}

// ---------------------------------------------------------------------------
// Sefaria API query param helpers
// ---------------------------------------------------------------------------

function buildQuery(params: Record<string, string | number | boolean | undefined | null>): string {
	const qs = Object.entries(params)
		.filter(([, v]) => v != null)
		.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
		.join("&");
	return qs ? `?${qs}` : "";
}

async function apiFetchPost<T>(path: string, body: unknown): Promise<T> {
	const url = `${BASE_URL}${path}`;
	const response = await fetch(url, {
		method: "POST",
		headers: buildHeaders(),
		body: JSON.stringify(body),
	});
	if (!response.ok) {
		throw new Error(`BiblePedia API error ${response.status}: ${response.statusText} (${url})`);
	}
	return response.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Sefaria API functions — Text
// ---------------------------------------------------------------------------

export async function sefariaGetV3Texts(
	tref: string,
	params: {
		version?: string;
		fill_in_missing_segments?: "0" | "1";
		return_format?: "default" | "wrap_all_entities" | "strip_only_footnotes" | "text_only";
	} = {},
): Promise<SefariaV3TextsResponse> {
	return apiFetch<SefariaV3TextsResponse>(`/api/v3/texts/${encodeURIComponent(tref)}${buildQuery(params)}`);
}

export async function sefariaGetTexts(
	tref: string,
	params: {
		context?: "0" | "1";
		commentary?: number;
		ven?: string;
		vhe?: string;
		pad?: "0" | "1";
		alts?: "0" | "1";
		wrapLinks?: "0" | "1";
		stripItags?: "0" | "1";
		multiple?: "0" | "1";
		transLangPref?: string;
		sheets?: "0" | "1";
	} = {},
): Promise<SefariaTextsResponse> {
	return apiFetch<SefariaTextsResponse>(`/api/texts/${encodeURIComponent(tref)}${buildQuery(params)}`);
}

export async function sefariaGetVersions(index: string): Promise<SefariaVersion[]> {
	return apiFetch<SefariaVersion[]>(`/api/texts/versions/${encodeURIComponent(index)}`);
}

export async function sefariaGetTranslationLanguages(): Promise<Record<string, unknown>> {
	return apiFetch<Record<string, unknown>>("/api/texts/translations");
}

export async function sefariaGetTranslationsByLang(lang: string): Promise<Record<string, unknown>> {
	return apiFetch<Record<string, unknown>>(`/api/texts/translations/${lang}`);
}

export async function sefariaGetRandomText(params: {
	titles?: string;
	categories?: string;
} = {}): Promise<SefariaTextsResponse> {
	return apiFetch<SefariaTextsResponse>(`/api/texts/random${buildQuery(params)}`);
}

export async function sefariaGetRandomByTopic(): Promise<SefariaTextsResponse> {
	return apiFetch<SefariaTextsResponse>("/api/texts/random-by-topic");
}

export async function sefariaGetManuscripts(tref: string): Promise<Record<string, unknown>> {
	return apiFetch<Record<string, unknown>>(`/api/manuscripts/${encodeURIComponent(tref)}`);
}

// ---------------------------------------------------------------------------
// Sefaria API functions — Index
// ---------------------------------------------------------------------------

export async function sefariaGetIndexV2(indexTitle: string): Promise<Record<string, unknown>> {
	return apiFetch<Record<string, unknown>>(`/api/v2/raw/index/${encodeURIComponent(indexTitle)}`);
}

export async function sefariaGetTableOfContents(params: {
	include_authors?: 0 | 1;
} = {}): Promise<Record<string, unknown>[]> {
	return apiFetch<Record<string, unknown>[]>(`/api/index${buildQuery(params)}`);
}

export async function sefariaGetShape(
	title: string,
	params: { depth?: number; dependents?: boolean } = {},
): Promise<Record<string, unknown>> {
	return apiFetch<Record<string, unknown>>(`/api/shape/${encodeURIComponent(title)}${buildQuery(params)}`);
}

// ---------------------------------------------------------------------------
// Sefaria API functions — Related
// ---------------------------------------------------------------------------

export async function sefariaGetRelated(tref: string): Promise<Record<string, unknown>> {
	return apiFetch<Record<string, unknown>>(`/api/related/${encodeURIComponent(tref)}`);
}

export async function sefariaGetRelatedWebsites(tref: string): Promise<Record<string, unknown>> {
	return apiFetch<Record<string, unknown>>(`/api/related/${encodeURIComponent(tref)}/websites`);
}

export async function sefariaGetLinks(
	tref: string,
	params: {
		with_text?: "0" | "1";
		with_sheet_links?: "0" | "1";
		category?: string;
		categories?: string;
	} = {},
): Promise<SefariaLink[]> {
	return apiFetch<SefariaLink[]>(`/api/links/${encodeURIComponent(tref)}${buildQuery(params)}`);
}

export async function sefariaGetRefTopicLinks(tref: string): Promise<Record<string, unknown>[]> {
	return apiFetch<Record<string, unknown>[]>(`/api/ref-topic-links/${encodeURIComponent(tref)}`);
}

// ---------------------------------------------------------------------------
// Sefaria API functions — Calendars
// ---------------------------------------------------------------------------

export async function sefariaGetCalendars(params: {
	diaspora?: "0" | "1";
	custom?: "ashkenazi" | "sephardi" | "edot%20hamizrach";
	year?: number;
	month?: number;
	day?: number;
	timezone?: string;
} = {}): Promise<SefariaCalendarResponse> {
	return apiFetch<SefariaCalendarResponse>(`/api/calendars${buildQuery(params)}`);
}

export async function sefariaGetNextRead(parasha: string): Promise<Record<string, unknown>> {
	return apiFetch<Record<string, unknown>>(`/api/calendars/next-read/${encodeURIComponent(parasha)}`);
}

// ---------------------------------------------------------------------------
// Sefaria API functions — Lexicon
// ---------------------------------------------------------------------------

export async function sefariaGetWords(
	word: string,
	params: {
		lookup_ref?: string;
		never_split?: string;
		always_split?: string;
		always_consonants?: string;
	} = {},
): Promise<SefariaLexiconEntry[]> {
	return apiFetch<SefariaLexiconEntry[]>(`/api/words/${encodeURIComponent(word)}${buildQuery(params)}`);
}

export async function sefariaGetWordCompletion(
	word: string,
	lexicon: string,
	params: { limit?: number } = {},
): Promise<Record<string, unknown>> {
	return apiFetch<Record<string, unknown>>(
		`/api/words/completion/${encodeURIComponent(word)}/${encodeURIComponent(lexicon)}${buildQuery(params)}`,
	);
}

// ---------------------------------------------------------------------------
// Sefaria API functions — Topics
// ---------------------------------------------------------------------------

export async function sefariaGetTopicV2(
	topicSlug: string,
	params: {
		with_links?: 0 | 1;
		annotate_links?: 0 | 1;
		annotate_time_period?: 0 | 1;
		group_related?: 0 | 1;
		with_refs?: 0 | 1;
	} = {},
): Promise<SefariaTopic> {
	return apiFetch<SefariaTopic>(`/api/v2/topics/${topicSlug}${buildQuery(params)}`);
}

export async function sefariaGetTopic(
	topicSlug: string,
	params: {
		with_links?: 0 | 1;
		annotate_links?: 0 | 1;
		group_related?: 0 | 1;
		with_refs?: 0 | 1;
		annotate_time_period?: 0 | 1;
	} = {},
): Promise<SefariaTopic> {
	return apiFetch<SefariaTopic>(`/api/topics/${topicSlug}${buildQuery(params)}`);
}

export async function sefariaGetAllTopics(params: {
	limit?: number;
} = {}): Promise<SefariaTopic[]> {
	return apiFetch<SefariaTopic[]>(`/api/topics${buildQuery(params)}`);
}

export async function sefariaGetTopicGraph(
	topicSlug: string,
	params: { link_type?: string } = {},
): Promise<Record<string, unknown>> {
	return apiFetch<Record<string, unknown>>(`/api/topics-graph/${topicSlug}${buildQuery(params)}`);
}

export async function sefariaGetRecommendedTopics(refList: string): Promise<SefariaTopic[]> {
	return apiFetch<SefariaTopic[]>(`/api/recommend/topics/${encodeURIComponent(refList)}`);
}

// ---------------------------------------------------------------------------
// Sefaria API functions — Terms
// ---------------------------------------------------------------------------

export async function sefariaGetTerm(name: string): Promise<Record<string, unknown>> {
	return apiFetch<Record<string, unknown>>(`/api/terms/${encodeURIComponent(name)}`);
}

export async function sefariaGetName(
	name: string,
	params: {
		limit?: number;
		type?: "ref" | "Collection" | "Topic" | "TocCategory" | "Term" | "User";
	} = {},
): Promise<Record<string, unknown>> {
	return apiFetch<Record<string, unknown>>(`/api/name/${encodeURIComponent(name)}${buildQuery(params)}`);
}

// ---------------------------------------------------------------------------
// Sefaria API functions — Misc
// ---------------------------------------------------------------------------

export async function sefariaFindRefs(body: {
	text: { body: string; lang?: "en" | "he" };
	lang?: "en" | "he";
}): Promise<Record<string, unknown>> {
	return apiFetchPost<Record<string, unknown>>("/api/find-refs", body);
}

export async function sefariaSearch(body: {
	query: string;
	type?: "text" | "sheet" | "collection";
	field?: string;
	language?: "hebrew" | "english";
	filters?: string[];
	size?: number;
	from?: number;
}): Promise<Record<string, unknown>> {
	return apiFetchPost<Record<string, unknown>>("/api/search-wrapper", body);
}

export async function sefariaGetCategory(categoryPath: string): Promise<Record<string, unknown>> {
	return apiFetch<Record<string, unknown>>(`/api/category/${encodeURIComponent(categoryPath)}`);
}
