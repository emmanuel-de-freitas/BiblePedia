"""
Main Python module for Livrea - Book processing and analysis functions
This module provides Python functions that can be called from Rust/JavaScript
"""

import hashlib
import json
import re
import unicodedata
from typing import Any, Dict, List, Optional

# Import Appwrite service functions from the appwrite package
try:
    from appwrite import (
        # Client initialization
        appwrite_init_client,
        appwrite_check_initialized,
        # Account service
        appwrite_account_get,
        appwrite_account_create,
        appwrite_account_create_email_session,
        appwrite_account_delete_session,
        appwrite_account_list_sessions,
        appwrite_account_update_name,
        appwrite_account_update_email,
        appwrite_account_update_password,
        # Database service
        appwrite_database_list_documents,
        appwrite_database_create_document,
        appwrite_database_get_document,
        appwrite_database_update_document,
        appwrite_database_delete_document,
        # Storage service
        appwrite_storage_list_files,
        appwrite_storage_get_file,
        appwrite_storage_delete_file,
        appwrite_storage_get_file_download_url,
        appwrite_storage_get_file_view_url,
        # Teams service
        appwrite_teams_list,
        appwrite_teams_create,
        appwrite_teams_get,
        appwrite_teams_update,
        appwrite_teams_delete,
        appwrite_teams_list_memberships,
    )
    APPWRITE_FUNCTIONS_AVAILABLE = True
except ImportError as e:
    print(f"Warning: Could not import Appwrite functions: {e}")
    APPWRITE_FUNCTIONS_AVAILABLE = False


# Helper function to ensure JSON serialization
def to_json(data):
    """Convert data to JSON string for Rust/JS interop"""
    return json.dumps(data, ensure_ascii=False)


# Register functions that can be called from Rust/JavaScript
_tauri_plugin_functions = [
    # Text processing functions
    "analyze_text",
    "extract_keywords",
    "calculate_reading_time",
    "generate_book_hash",
    "clean_text",
    "extract_sentences",
    "get_text_statistics",
    "process_book_metadata",
    "validate_isbn",
    "format_author_name",
]

# Add Appwrite functions if available
if APPWRITE_FUNCTIONS_AVAILABLE:
    _tauri_plugin_functions.extend([
        # Client initialization
        "appwrite_init_client",
        "appwrite_check_initialized",
        # Account service
        "appwrite_account_get",
        "appwrite_account_create",
        "appwrite_account_create_email_session",
        "appwrite_account_delete_session",
        "appwrite_account_list_sessions",
        "appwrite_account_update_name",
        "appwrite_account_update_email",
        "appwrite_account_update_password",
        # Database service
        "appwrite_database_list_documents",
        "appwrite_database_create_document",
        "appwrite_database_get_document",
        "appwrite_database_update_document",
        "appwrite_database_delete_document",
        # Storage service
        "appwrite_storage_list_files",
        "appwrite_storage_get_file",
        "appwrite_storage_delete_file",
        "appwrite_storage_get_file_download_url",
        "appwrite_storage_get_file_view_url",
        # Teams service
        "appwrite_teams_list",
        "appwrite_teams_create",
        "appwrite_teams_get",
        "appwrite_teams_update",
        "appwrite_teams_delete",
        "appwrite_teams_list_memberships",
    ])


def analyze_text(text: str) -> dict[str, int] | str:
    """
    Analyze text and return various metrics

    Args:
        text: The text to analyze

    Returns:
        Dictionary containing text analysis results
    """
    if not text:
        return {
            "word_count": 0,
            "char_count": 0,
            "sentence_count": 0,
            "paragraph_count": 0,
            "average_word_length": 0
        }

    # Basic text statistics
    words = text.split()
    word_count = len(words)
    char_count = len(text)

    # Count sentences (simple approach)
    sentences = re.split(r'[.!?]+', text)
    sentence_count = len([s for s in sentences if s.strip()])

    # Count paragraphs
    paragraphs = text.split('\n\n')
    paragraph_count = len([p for p in paragraphs if p.strip()])

    # Average word length
    avg_word_length = sum(len(word) for word in words) / word_count if word_count > 0 else 0

    return to_json({
        "word_count": word_count,
        "char_count": char_count,
        "sentence_count": sentence_count,
        "paragraph_count": paragraph_count,
        "average_word_length": round(avg_word_length, 2)
    })


def extract_keywords(text: str, max_keywords: int = 10) -> str:
    """
    Extract keywords from text using simple frequency analysis

    Args:
        text: The text to extract keywords from
        max_keywords: Maximum number of keywords to return

    Returns:
        List of extracted keywords
    """
    if not text:
        return to_json([])

    # Common stop words to filter out
    stop_words = {
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
        'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
        'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
        'could', 'should', 'may', 'might', 'must', 'can', 'could', 'this',
        'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'
    }

    # Clean and tokenize text
    words = re.findall(r'\b[a-z]+\b', text.lower())

    # Filter out stop words and short words
    meaningful_words = [w for w in words if w not in stop_words and len(w) > 3]

    # Count word frequency
    word_freq = {}
    for word in meaningful_words:
        word_freq[word] = word_freq.get(word, 0) + 1

    # Sort by frequency and return top keywords
    sorted_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)
    return to_json([word for word, _ in sorted_words[:max_keywords]])


def calculate_reading_time(text: str, words_per_minute: int = 200) -> str:
    """
    Calculate estimated reading time for text

    Args:
        text: The text to calculate reading time for
        words_per_minute: Average reading speed (default 200 WPM)

    Returns:
        Dictionary with minutes and seconds
    """
    if not text:
        return to_json({"minutes": 0, "seconds": 0})

    word_count = len(text.split())
    total_seconds = (word_count / words_per_minute) * 60

    minutes = int(total_seconds // 60)
    seconds = int(total_seconds % 60)

    return to_json({
        "minutes": minutes,
        "seconds": seconds,
        "total_seconds": int(total_seconds),
        "word_count": word_count
    })


def generate_book_hash(title: str, author: str, content: Optional[str] = None) -> str:
    """
    Generate a unique hash for a book based on title, author, and optionally content

    Args:
        title: Book title
        author: Book author
        content: Optional book content for more unique hash

    Returns:
        SHA256 hash string
    """
    # Normalize the input
    normalized_title = title.lower().strip() if title else ""
    normalized_author = author.lower().strip() if author else ""

    # Create hash input
    hash_input = f"{normalized_title}:{normalized_author}"

    if content:
        # Add the first 1000 characters of content if available
        hash_input += f":{content[:1000]}"

    # Generate SHA256 hash
    return to_json(hashlib.sha256(hash_input.encode('utf-8')).hexdigest())


def clean_text(text: str) -> str:
    """
    Clean and normalize text by removing extra whitespace, special characters, etc.

    Args:
        text: Text to clean

    Returns:
        Cleaned text
    """
    if not text:
        return ""

    # Normalize unicode characters
    text = unicodedata.normalize('NFKD', text)

    # Remove control characters
    text = ''.join(char for char in text if not unicodedata.category(char).startswith('C'))

    # Replace multiple whitespaces with single space
    text = re.sub(r'\s+', ' ', text)

    # Remove leading/trailing whitespace
    text = text.strip()

    return to_json(text)


def extract_sentences_internal(text: str, max_sentences: Optional[int] = None) -> List[str]:
    """
    Extract sentences from text

    Args:
        text: Text to extract sentences from
        max_sentences: Maximum number of sentences to return (None for all)

    Returns:
        List of sentences
    """
    if not text:
        return []

    # Split by sentence endings
    sentences = re.split(r'(?<=[.!?])\s+', text)

    # Clean up sentences
    sentences = [s.strip() for s in sentences if s.strip()]

    if max_sentences:
        return sentences[:max_sentences]

    return sentences


def extract_sentences(text: str, max_sentences: Optional[int] = None) -> str:
    """
    Extract sentences from text (JSON wrapper)
    """
    return to_json(extract_sentences_internal(text, max_sentences))


def get_text_statistics(text: str) -> str:
    """
    Get comprehensive text statistics

    Args:
        text: Text to analyze

    Returns:
        Dictionary with detailed statistics
    """
    if not text:
        return to_json({
            "basic_stats": {},
            "readability": {},
            "complexity": {}
        })

    # Basic analysis - parse JSON result back
    basic_stats = json.loads(analyze_text(text))

    # Readability metrics
    words = text.split()
    sentences = extract_sentences_internal(text)

    avg_words_per_sentence = len(words) / len(sentences) if sentences else 0

    # Simple readability score (Flesch Reading Ease approximation)
    # This is a simplified version
    syllable_count = sum(count_syllables(word) for word in words)
    avg_syllables_per_word = syllable_count / len(words) if words else 0

    readability_score = 206.835 - 1.015 * avg_words_per_sentence - 84.6 * avg_syllables_per_word
    readability_score = max(0, min(100, readability_score))  # Clamp between 0-100

    return to_json({
        "basic_stats": basic_stats,
        "readability": {
            "average_words_per_sentence": round(avg_words_per_sentence, 2),
            "average_syllables_per_word": round(avg_syllables_per_word, 2),
            "flesch_reading_ease": round(readability_score, 2),
            "difficulty_level": get_difficulty_level(readability_score)
        },
        "reading_time": json.loads(calculate_reading_time(text))
    })


def count_syllables(word: str) -> int:
    """
    Count syllables in a word (simple approximation)

    Args:
        word: Word to count syllables in

    Returns:
        Number of syllables
    """
    word = word.lower()
    vowels = 'aeiouy'
    syllable_count = 0
    previous_was_vowel = False

    for char in word:
        is_vowel = char in vowels
        if is_vowel and not previous_was_vowel:
            syllable_count += 1
        previous_was_vowel = is_vowel

    # Adjust for silent e
    if word.endswith('e'):
        syllable_count -= 1

    # Ensure at least one syllable
    if syllable_count <= 0:
        syllable_count = 1

    return syllable_count


def get_difficulty_level(score: float) -> str:
    """
    Get difficulty level from Flesch Reading Ease score

    Args:
        score: Flesch Reading Ease score

    Returns:
        Difficulty level string
    """
    if score >= 90:
        return "Very Easy"
    elif score >= 80:
        return "Easy"
    elif score >= 70:
        return "Fairly Easy"
    elif score >= 60:
        return "Standard"
    elif score >= 50:
        return "Fairly Difficult"
    elif score >= 30:
        return "Difficult"
    else:
        return "Very Difficult"


def process_book_metadata(metadata: Dict[str, Any]) -> str:
    """
    Process and enhance book metadata

    Args:
        metadata: Raw book metadata

    Returns:
        Processed metadata
    """
    processed = metadata.copy()

    # Clean title
    if "title" in processed:
        processed["title"] = clean_text(processed["title"])
        processed["title_lowercase"] = processed["title"].lower()

    # Format author(s)
    if "author" in processed:
        if isinstance(processed["author"], str):
            processed["author"] = format_author_name(processed["author"])
        elif isinstance(processed["author"], list):
            processed["author"] = [format_author_name(a) for a in processed["author"]]

    # Validate and format ISBN
    if "isbn" in processed:
        processed["isbn_valid"] = validate_isbn(processed["isbn"])

    # Add generated fields
    if "title" in processed and "author" in processed:
        author_str = processed["author"] if isinstance(processed["author"], str) else ", ".join(processed["author"])
        processed["book_hash"] = generate_book_hash(processed["title"], author_str)

    # Process description if available
    if "description" in processed and processed["description"]:
        processed["description_keywords"] = json.loads(extract_keywords(processed["description"], 5))

    return to_json(processed)


def validate_isbn(isbn: str) -> str:
    """
    Validate ISBN-10 or ISBN-13

    Args:
        isbn: ISBN string to validate

    Returns:
        True if valid, False otherwise
    """
    if not isbn:
        return to_json(False)

    # Remove hyphens and spaces
    isbn = isbn.replace('-', '').replace(' ', '')

    # Check ISBN-10
    if len(isbn) == 10:
        try:
            total = sum((10 - i) * (10 if c == 'X' else int(c))
                        for i, c in enumerate(isbn))
            return to_json(total % 11 == 0)
        except (ValueError, IndexError):
            return to_json(False)

    # Check ISBN-13
    elif len(isbn) == 13:
        try:
            total = sum(int(isbn[i]) * (3 if i % 2 else 1)
                        for i in range(12))
            check = (10 - (total % 10)) % 10
            return to_json(check == int(isbn[12]))
        except (ValueError, IndexError):
            return to_json(False)

    return to_json(False)


def format_author_name(author: str) -> str:
    """
    Format author name consistently

    Args:
        author: Author name to format

    Returns:
        Formatted author name
    """
    if not author:
        return to_json("")

    # Clean the name (inline to avoid circular dependency)
    author = author.strip()
    author = re.sub(r'\s+', ' ', author)

    # Handle "Last, First" format
    if ',' in author:
        parts = author.split(',', 1)
        if len(parts) == 2:
            last_name = parts[0].strip()
            first_name = parts[1].strip()
            author = f"{first_name} {last_name}"

    # Capitalize properly
    words = author.split()
    formatted_words = []

    for word in words:
        # Handle special cases (e.g., "van", "de", "O'Brien")
        if word.lower() in ['van', 'de', 'der', 'von', 'la', 'le']:
            formatted_words.append(word.lower())
        elif "'" in word:
            # Handle names like O'Brien
            parts = word.split("'")
            formatted_words.append("'".join(p.capitalize() for p in parts))
        else:
            formatted_words.append(word.capitalize())

    return to_json(' '.join(formatted_words))


# Initialize any required resources when the module loads
print("Python module loaded successfully for Livrea")
