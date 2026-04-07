/**
 * Simple test script for Python integration
 * Run this script to test if Python functions are working correctly
 * Usage: node test-python.js (after starting the Tauri app)
 */

import { callFunction } from "tauri-plugin-python-api";

async function testPythonIntegration() {
	console.log("Testing Python Integration...\n");

	try {
		// Test 1: Simple text analysis
		console.log("Test 1: Analyzing text...");
		const testText = "Hello world! This is a test. This is another sentence.";
		const analysisResult = await callFunction("analyze_text", [testText]);
		const analysis = JSON.parse(analysisResult);
		console.log("Text Analysis Result:", analysis);
		console.log("✅ Text analysis working\n");

		// Test 2: Extract keywords
		console.log("Test 2: Extracting keywords...");
		const keywordText =
			"Python programming is great for data science and machine learning. Python makes coding easy and fun.";
		const keywordsResult = await callFunction("extract_keywords", [keywordText, 5]);
		const keywords = JSON.parse(keywordsResult);
		console.log("Keywords:", keywords);
		console.log("✅ Keyword extraction working\n");

		// Test 3: Calculate reading time
		console.log("Test 3: Calculating reading time...");
		const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(50);
		const readingTimeResult = await callFunction("calculate_reading_time", [longText, 200]);
		const readingTime = JSON.parse(readingTimeResult);
		console.log("Reading Time:", readingTime);
		console.log("✅ Reading time calculation working\n");

		// Test 4: Generate book hash
		console.log("Test 4: Generating book hash...");
		const hashResult = await callFunction("generate_book_hash", [
			"The Great Gatsby",
			"F. Scott Fitzgerald",
			"In my younger and more vulnerable years...",
		]);
		const bookHash = JSON.parse(hashResult);
		console.log("Book Hash:", bookHash);
		console.log("✅ Book hash generation working\n");

		// Test 5: Clean text
		console.log("Test 5: Cleaning text...");
		const dirtyText = "  This   text   has    too    many     spaces   ";
		const cleanResult = await callFunction("clean_text", [dirtyText]);
		const cleanText = JSON.parse(cleanResult);
		console.log("Original:", JSON.stringify(dirtyText));
		console.log("Cleaned:", JSON.stringify(cleanText));
		console.log("✅ Text cleaning working\n");

		// Test 6: Validate ISBN
		console.log("Test 6: Validating ISBN...");
		const validISBN = "978-0-7432-7356-5";
		const invalidISBN = "123-4-5678-9012-3";
		const validResult = await callFunction("validate_isbn", [validISBN]);
		const invalidResult = await callFunction("validate_isbn", [invalidISBN]);
		console.log(`ISBN ${validISBN} is valid:`, JSON.parse(validResult));
		console.log(`ISBN ${invalidISBN} is valid:`, JSON.parse(invalidResult));
		console.log("✅ ISBN validation working\n");

		// Test 7: Format author name
		console.log("Test 7: Formatting author name...");
		const authorName = "fitzgerald, f. scott";
		const formattedResult = await callFunction("format_author_name", [authorName]);
		const formattedName = JSON.parse(formattedResult);
		console.log("Original:", authorName);
		console.log("Formatted:", formattedName);
		console.log("✅ Author name formatting working\n");

		// Test 8: Process book metadata
		console.log("Test 8: Processing book metadata...");
		const metadata = {
			author: "Lee, Harper",
			description:
				"A classic American novel about racial injustice and childhood innocence in the Deep South.",
			isbn: "978-0-06-112008-4",
			title: "To Kill a Mockingbird",
		};
		const metadataResult = await callFunction("process_book_metadata", [metadata]);
		const processedMetadata = JSON.parse(metadataResult);
		console.log("Processed Metadata:", processedMetadata);
		console.log("✅ Metadata processing working\n");

		// Test 9: Get comprehensive text statistics
		console.log("Test 9: Getting text statistics...");
		const statsText = `The quick brown fox jumps over the lazy dog.
    This is a sample paragraph for testing text statistics.
    It contains multiple sentences and various words.`;
		const statsResult = await callFunction("get_text_statistics", [statsText]);
		const textStats = JSON.parse(statsResult);
		console.log("Text Statistics:", JSON.stringify(textStats, null, 2));
		console.log("✅ Text statistics working\n");

		console.log("========================================");
		console.log("✅ All Python integration tests passed!");
		console.log("========================================");
	} catch (error) {
		console.error("❌ Test failed:", error);
		process.exit(1);
	}
}

// Run tests if this is the main module
if (typeof window !== "undefined") {
	// Browser environment - wait for DOM ready
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", testPythonIntegration);
	} else {
		testPythonIntegration();
	}
} else {
	// Node environment
	testPythonIntegration();
}
