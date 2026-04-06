
// /**
//  * BookAnalyzer Component
//  * Demonstrates how to use Python functions from React/TypeScript
//  */

// import {
//   Button,
//   TextArea,
//   Spinner,
//   Card,
//   Chip,
// } from "@heroui/react";
// import { useId, useState } from "react";

// export function BookAnalyzer() {
//   const [text, setText] = useState("");
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [statistics, setStatistics] = useState<TextStatistics | null>(null);
//   const [keywords, setKeywords] = useState<string[]>([]);
//   const [bookMetadata, setBookMetadata] = useState<BookMetadata | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   // Example book metadata for testing
//   const sampleMetadata = {
//     author: "F. Scott Fitzgerald",
//     description:
//       "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream through the eyes of narrator Nick Carraway.",
//     isbn: "978-0-7432-7356-5",
//     title: "The Great Gatsby",
//   };

//   const analyzeText = async () => {
//     if (!text.trim()) {
//       setError("Please enter some text to analyze");
//       return;
//     }

//     setIsAnalyzing(true);
//     setError(null);

//     try {
//       // Get comprehensive text statistics
//       const stats = await pythonAPI.getTextStatistics(text);
//       setStatistics(stats);

//       // Extract keywords
//       const extractedKeywords = await pythonAPI.extractKeywords(text, 10);
//       setKeywords(extractedKeywords);

//       console.log("Analysis complete:", {
//         keywords: extractedKeywords,
//         stats,
//       });
//     } catch (err) {
//       setError(`Failed to analyze text: ${err}`);
//       console.error("Analysis error:", err);
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const processMetadata = async () => {
//     setIsAnalyzing(true);
//     setError(null);

//     try {
//       const processed = await pythonAPI.processBookMetadata(sampleMetadata);
//       setBookMetadata(processed);
//       console.log("Processed metadata:", processed);
//     } catch (err) {
//       setError(`Failed to process metadata: ${err}`);
//       console.error("Metadata processing error:", err);
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const validateISBN = async () => {
//     const isbn = "978-0-7432-7356-5";
//     try {
//       const isValid = await pythonAPI.validateISBN(isbn);
//       alert(`ISBN ${isbn} is ${isValid ? "valid" : "invalid"}`);
//     } catch (err) {
//       setError(`Failed to validate ISBN: ${err}`);
//     }
//   };

//   const cleanTextExample = async () => {
//     const dirtyText =
//       "  This   is    some    text   with   extra    spaces   ";
//     try {
//       const cleaned = await pythonAPI.cleanText(dirtyText);
//       alert(`Original: "${dirtyText}"\nCleaned: "${cleaned}"`);
//     } catch (err) {
//       setError(`Failed to clean text: ${err}`);
//     }
//   };

//   const id = `text-input-${useId()}`;

//   return (
//     <div className="max-w-5xl p-8">
//       <h1 className="text-3xl font-bold mb-2">
//         Book Analyzer - Python Integration Demo
//       </h1>

//       <p className="text-default-600 mb-8">
//         This component demonstrates calling Python functions from React using
//         tauri-plugin-python.
//       </p>

//       {/* Text Analysis Section */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold mb-4">Text Analysis</h2>

//         <TextArea
//           id={id}
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Paste or type some text here to analyze..."
//           className="mb-4 min-h-[120px]"
//         />

//         <div className="flex gap-2 mb-4">
//           <Button
//             variant="primary"
//             onPress={analyzeText}
//             isDisabled={isAnalyzing}
//           >
//             {isAnalyzing ? "Analyzing..." : "Analyze Text"}
//           </Button>
//         </div>

//         {isAnalyzing && (
//           <div className="flex items-center gap-3 my-4">
//             <Spinner size="sm" />
//             <span className="text-default-500">Analyzing...</span>
//           </div>
//         )}

//         {/* Display Results */}
//         {statistics && (
//           <div className="grid gap-4 mt-8">
//             <h3 className="text-xl font-semibold">Analysis Results</h3>

//             {/* Basic Stats */}
//             <Card className="p-4">
//               <h4 className="text-lg font-medium mb-2">Basic Statistics</h4>
//               <div className="space-y-1">
//                 <p>Word Count: {statistics.basic_stats.word_count}</p>
//                 <p>Character Count: {statistics.basic_stats.char_count}</p>
//                 <p>Sentence Count: {statistics.basic_stats.sentence_count}</p>
//                 <p>Paragraph Count: {statistics.basic_stats.paragraph_count}</p>
//                 <p>
//                   Average Word Length: {statistics.basic_stats.average_word_length}
//                 </p>
//               </div>
//             </Card>

//             {/* Readability */}
//             <Card className="p-4 bg-primary-50">
//               <h4 className="text-lg font-medium mb-2">Readability</h4>
//               <div className="space-y-1">
//                 <p>
//                   Average Words per Sentence:{" "}
//                   {statistics.readability.average_words_per_sentence}
//                 </p>
//                 <p>
//                   Average Syllables per Word:{" "}
//                   {statistics.readability.average_syllables_per_word}
//                 </p>
//                 <p>
//                   Flesch Reading Ease:{" "}
//                   {statistics.readability.flesch_reading_ease}
//                 </p>
//                 <p>
//                   Difficulty Level: {statistics.readability.difficulty_level}
//                 </p>
//               </div>
//             </Card>

//             {/* Reading Time */}
//             <Card className="p-4 bg-success-50">
//               <h4 className="text-lg font-medium mb-2">Reading Time</h4>
//               <div className="space-y-1">
//                 <p>
//                   Estimated Time: {statistics.reading_time.minutes} minutes{" "}
//                   {statistics.reading_time.seconds} seconds
//                 </p>
//                 <p>Word Count: {statistics.reading_time.word_count}</p>
//               </div>
//             </Card>

//             {/* Keywords */}
//             {keywords.length > 0 && (
//               <Card className="p-4 bg-warning-50">
//                 <h4 className="text-lg font-medium mb-2">Keywords</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {keywords.map((keyword, index) => (
//                     <Chip key={index} variant="soft">
//                       {keyword}
//                     </Chip>
//                   ))}
//                 </div>
//               </Card>
//             )}
//           </div>
//         )}
//       </section>

//       {/* Book Metadata Section */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold mb-4">Book Metadata Processing</h2>

//         <div className="flex gap-2 mb-4">
//           <Button variant="secondary" onPress={processMetadata} isDisabled={isAnalyzing}>
//             Process Sample Metadata
//           </Button>
//           <Button variant="outline" onPress={validateISBN}>
//             Validate ISBN Example
//           </Button>
//           <Button variant="outline" onPress={cleanTextExample}>
//             Clean Text Example
//           </Button>
//         </div>

//         {bookMetadata && (
//           <Card className="p-4 bg-secondary-50 mt-8">
//             <h3 className="text-lg font-medium mb-2">Processed Metadata</h3>
//             <div className="space-y-1">
//               <p>Title: {bookMetadata.title}</p>
//               <p>Author: {bookMetadata.author}</p>
//               <p>ISBN Valid: {bookMetadata.isbn_valid ? "Yes" : "No"}</p>
//               <p>Book Hash: {bookMetadata.book_hash?.substring(0, 16)}...</p>
//               {bookMetadata.description_keywords && (
//                 <div className="mt-2">
//                   <p className="font-medium">Keywords from Description:</p>
//                   <p>{bookMetadata.description_keywords.join(", ")}</p>
//                 </div>
//               )}
//             </div>
//           </Card>
//         )}
//       </section>

//       {/* Error Display */}
//       {error && (
//         <Card className="p-4 bg-danger-50 border border-danger">
//           <p className="text-danger">{error}</p>
//         </Card>
//       )}
//     </div>
//   );
// }
