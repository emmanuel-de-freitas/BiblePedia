use epub::doc::EpubDoc;
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

    Ok(file_path)
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

    // Open EPUB document
    let mut doc = match EpubDoc::new(&file_path) {
        Ok(d) => d,
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

    // Extract metadata
    let title = doc.mdata("title").map(|m| m.value.clone());
    let author = doc.mdata("creator").map(|m| m.value.clone());
    let publisher = doc.mdata("publisher").map(|m| m.value.clone());
    let description = doc.mdata("description").map(|m| m.value.clone());
    let language = doc.mdata("language").map(|m| m.value.clone());
    let isbn = doc.mdata("identifier").map(|m| m.value.clone());
    let publication_date = doc.mdata("date").map(|m| m.value.clone());

    let _ = window.emit(
        "extraction-progress",
        ProgressUpdate {
            stage: "cover".to_string(),
            progress: 50,
            message: "Extracting cover...".to_string(),
        },
    );

    // Extract cover (optional)
    let cover_path = doc
        .get_cover_id()
        .and_then(|cover_id| doc.get_resource_str(&cover_id))
        .map(|_| "cover extracted".to_string());

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
        publisher,
        description,
        language,
        isbn,
        publication_date,
        cover_path,
        file_path: file_path.clone(),
    };

    Ok(ExtractionResult {
        success: true,
        metadata: Some(metadata),
        error: None,
    })
}

#[tauri::command]
pub async fn get_epub_content(file_path: String) -> Result<Vec<String>, String> {
    let mut doc = EpubDoc::new(&file_path).map_err(|e| e.to_string())?;

    let mut content = Vec::new();

    // Get the spine (reading order)
    let spine_len = doc.get_num_chapters();

    for _ in 0..spine_len {
        if let Some((chapter_content, _)) = doc.get_current_str() {
            content.push(chapter_content);
        }
        doc.go_next();
    }

    Ok(content)
}

#[tauri::command]
pub async fn get_epub_toc(file_path: String) -> Result<Vec<(String, String)>, String> {
    let doc = EpubDoc::new(&file_path).map_err(|e| e.to_string())?;

    let toc = doc
        .toc
        .iter()
        .map(|nav_point| {
            let label = nav_point.label.clone();
            let content = nav_point.content.to_string_lossy().to_string();
            (label, content)
        })
        .collect();

    Ok(toc)
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
