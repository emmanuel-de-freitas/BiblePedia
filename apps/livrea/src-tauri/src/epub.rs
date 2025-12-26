use epubie_lib::Epub;
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::{Emitter, State};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct EpubMetadata {
    pub title: Option<String>,
    pub author: Option<String>,
    pub publisher: Option<String>,
    pub description: Option<String>,
    pub language: Option<String>,
    pub isbn: Option<String>,
    pub publication_date: Option<String>,
    pub cover_path: Option<String>,
    pub file_path: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ChapterInfo {
    pub title: String,
    pub file_count: usize,
    pub files: Vec<FileInfo>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct FileInfo {
    pub id: String,
    pub href: String,
    pub title: Option<String>,
    pub media_type: String,
    pub is_html: bool,
    pub content_length: usize,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct TocEntry {
    pub title: String,
    pub href: String,
    pub level: u32,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ProgressUpdate {
    pub stage: String,
    pub progress: u8,
    pub message: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ExtractionResult {
    pub success: bool,
    pub metadata: Option<EpubMetadata>,
    pub error: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EpubContent {
    pub chapters: Vec<ChapterInfo>,
    pub toc: Vec<TocEntry>,
    pub total_chapters: usize,
    pub total_files: usize,
}

pub struct EpubState {
    pub current_epub: Mutex<Option<EpubMetadata>>,
}

#[tauri::command]
pub async fn open_epub(file_path: String) -> Result<String, String> {
    // Validate file exists and is an epub
    let path = PathBuf::from(&file_path);

    if !path.exists() {
        return Err("File does not exist".to_string());
    }

    if path.extension().and_then(|s| s.to_str()) != Some("epub") {
        return Err("File is not an EPUB".to_string());
    }

    // Try to open with epubie-lib to validate it's a valid EPUB
    match Epub::new(file_path.clone()) {
        Ok(_) => Ok(file_path),
        Err(e) => Err(format!("Invalid EPUB file: {}", e)),
    }
}

#[tauri::command]
pub async fn extract_epub_metadata(
    file_path: String,
    window: tauri::Window,
) -> Result<ExtractionResult, String> {
    // Send initial progress
    let _ = window.emit(
        "extraction-progress",
        ProgressUpdate {
            stage: "init".to_string(),
            progress: 0,
            message: "Starting extraction...".to_string(),
        },
    );

    // Open EPUB document with epubie-lib
    let epub = match Epub::new(file_path.clone()) {
        Ok(epub) => epub,
        Err(e) => {
            let _ = window.emit(
                "extraction-progress",
                ProgressUpdate {
                    stage: "error".to_string(),
                    progress: 0,
                    message: format!("Failed to open EPUB: {}", e),
                },
            );
            return Ok(ExtractionResult {
                success: false,
                metadata: None,
                error: Some(format!("Failed to open EPUB: {}", e)),
            });
        }
    };

    let _ = window.emit(
        "extraction-progress",
        ProgressUpdate {
            stage: "metadata".to_string(),
            progress: 25,
            message: "Extracting metadata...".to_string(),
        },
    );

    // Extract metadata using epubie-lib
    let title = if epub.get_title().is_empty() {
        None
    } else {
        Some(epub.get_title().to_string())
    };

    let author = if epub.get_creator().is_empty() {
        None
    } else {
        Some(epub.get_creator().to_string())
    };

    let publisher = epub.get_publisher();
    let description = epub.get_description();

    let language = if epub.get_language().is_empty() {
        None
    } else {
        Some(epub.get_language().to_string())
    };

    let isbn = if epub.get_identifier().is_empty() {
        None
    } else {
        Some(epub.get_identifier().to_string())
    };

    let publication_date = if epub.get_date().is_empty() {
        None
    } else {
        Some(epub.get_date().to_string())
    };

    let _ = window.emit(
        "extraction-progress",
        ProgressUpdate {
            stage: "cover".to_string(),
            progress: 50,
            message: "Extracting cover...".to_string(),
        },
    );

    // Extract cover information
    let cover_path = epub.get_cover();

    let _ = window.emit(
        "extraction-progress",
        ProgressUpdate {
            stage: "complete".to_string(),
            progress: 100,
            message: "Extraction complete!".to_string(),
        },
    );

    let metadata = EpubMetadata {
        title,
        author,
        publisher: publisher.map(|s| s.to_string()),
        description: description.map(|s| s.to_string()),
        language,
        isbn,
        publication_date,
        cover_path: cover_path.map(|s| s.to_string()),
        file_path: file_path.clone(),
    };

    Ok(ExtractionResult {
        success: true,
        metadata: Some(metadata),
        error: None,
    })
}

#[tauri::command]
pub async fn get_epub_content(file_path: String) -> Result<EpubContent, String> {
    let epub = Epub::new(file_path).map_err(|e| e.to_string())?;

    let mut chapters = Vec::new();

    // Process chapters
    for chapter in epub.get_chapters() {
        let mut files = Vec::new();

        // Process files in each chapter
        for file in chapter.get_files() {
            let file_info = FileInfo {
                id: file.get_id().to_string(),
                href: file.get_href().to_string(),
                title: file.get_title().map(|s| s.to_string()),
                media_type: file.get_media_type().to_string(),
                is_html: file.is_html(),
                content_length: file.get_content().len(),
            };
            files.push(file_info);
        }

        let chapter_info = ChapterInfo {
            title: chapter.get_title().to_string(),
            file_count: chapter.get_file_count(),
            files,
        };
        chapters.push(chapter_info);
    }

    // Process table of contents
    let toc = epub.get_table_of_contents();
    let toc_entries: Vec<TocEntry> = toc
        .get_entries()
        .iter()
        .map(|entry| TocEntry {
            title: entry.get_title().to_string(),
            href: entry.get_href().to_string(),
            level: entry.get_level() as u32,
        })
        .collect();

    let content = EpubContent {
        total_chapters: epub.get_chapter_count(),
        total_files: epub.get_file_count(),
        chapters,
        toc: toc_entries,
    };

    Ok(content)
}

#[tauri::command]
pub async fn get_epub_toc(file_path: String) -> Result<Vec<TocEntry>, String> {
    let epub = Epub::new(file_path).map_err(|e| e.to_string())?;

    let toc = epub.get_table_of_contents();
    let toc_entries: Vec<TocEntry> = toc
        .get_entries()
        .iter()
        .map(|entry| TocEntry {
            title: entry.get_title().to_string(),
            href: entry.get_href().to_string(),
            level: entry.get_level() as u32,
        })
        .collect();

    Ok(toc_entries)
}

#[tauri::command]
pub async fn get_chapter_content(
    file_path: String,
    chapter_index: usize,
) -> Result<Vec<String>, String> {
    let epub = Epub::new(file_path).map_err(|e| e.to_string())?;

    let chapters = epub.get_chapters();

    if chapter_index >= chapters.len() {
        return Err("Chapter index out of bounds".to_string());
    }

    let chapter = &chapters[chapter_index];
    let mut content = Vec::new();

    for file in chapter.get_files() {
        if file.is_html() {
            content.push(file.get_content().to_string());
        }
    }

    Ok(content)
}

#[tauri::command]
pub async fn get_file_content(file_path: String, file_href: String) -> Result<String, String> {
    let epub = Epub::new(file_path).map_err(|e| e.to_string())?;

    // Find the file with the matching href
    for file in epub.get_all_files() {
        if file.get_href() == file_href {
            return Ok(file.get_content().to_string());
        }
    }

    Err("File not found".to_string())
}

#[tauri::command]
pub async fn get_epub_stats(file_path: String) -> Result<(usize, usize, usize), String> {
    let epub = Epub::new(file_path).map_err(|e| e.to_string())?;

    let chapter_count = epub.get_chapter_count();
    let file_count = epub.get_file_count();
    let toc_count = epub.get_table_of_contents().get_entry_count();

    Ok((chapter_count, file_count, toc_count))
}

#[tauri::command]
pub async fn get_current_epub(state: State<'_, EpubState>) -> Result<Option<EpubMetadata>, String> {
    let current = state.current_epub.lock().map_err(|e| e.to_string())?;
    Ok(current.clone())
}

#[tauri::command]
pub async fn set_current_epub(
    metadata: EpubMetadata,
    state: State<'_, EpubState>,
) -> Result<(), String> {
    let mut current = state.current_epub.lock().map_err(|e| e.to_string())?;
    *current = Some(metadata);
    Ok(())
}

#[tauri::command]
pub async fn clear_current_epub(state: State<'_, EpubState>) -> Result<(), String> {
    let mut current = state.current_epub.lock().map_err(|e| e.to_string())?;
    *current = None;
    Ok(())
}
