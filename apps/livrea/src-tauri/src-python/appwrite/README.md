# Appwrite Package

A modular Python package that integrates the Appwrite SDK for use with Tauri/Rust applications.

## Package Structure

```
appwrite/
├── __init__.py       # Package exports and initialization
├── client.py         # Client initialization and configuration
├── account.py        # Account service (authentication, sessions)
├── database.py       # Database service (documents, collections)
├── storage.py        # Storage service (files, buckets)
├── teams.py          # Teams service (teams, memberships)
└── utils.py          # Shared utilities (JSON serialization, error handling)
```

## Modules

### `client.py`

Handles Appwrite client initialization and provides service getters.

**Functions:**

- `appwrite_init_client(endpoint, project_id, api_key?)` - Initialize the client
- `appwrite_check_initialized()` - Check if client is initialized
- `get_client()` - Get the client instance
- `get_account_service()` - Get Account service
- `get_databases_service()` - Get Databases service
- `get_storage_service()` - Get Storage service
- `get_teams_service()` - Get Teams service

### `account.py`

User authentication and account management.

**Functions:**

- `appwrite_account_get()` - Get current account
- `appwrite_account_create(email, password, name?)` - Create account
- `appwrite_account_create_email_session(email, password)` - Login
- `appwrite_account_delete_session(session_id)` - Logout
- `appwrite_account_list_sessions()` - List sessions
- `appwrite_account_update_name(name)` - Update name
- `appwrite_account_update_email(email, password)` - Update email
- `appwrite_account_update_password(password, old_password)` - Update password

### `database.py`

Document and collection management.

**Functions:**

- `appwrite_database_list_documents(database_id, collection_id, queries?)` - List documents
- `appwrite_database_create_document(database_id, collection_id, data, document_id?)` - Create document
- `appwrite_database_get_document(database_id, collection_id, document_id)` - Get document
- `appwrite_database_update_document(database_id, collection_id, document_id, data)` - Update document
- `appwrite_database_delete_document(database_id, collection_id, document_id)` - Delete document

### `storage.py`

File and bucket management.

**Functions:**

- `appwrite_storage_list_files(bucket_id)` - List files
- `appwrite_storage_get_file(bucket_id, file_id)` - Get file metadata
- `appwrite_storage_delete_file(bucket_id, file_id)` - Delete file
- `appwrite_storage_get_file_download_url(bucket_id, file_id)` - Get download URL
- `appwrite_storage_get_file_view_url(bucket_id, file_id)` - Get view URL

### `teams.py`

Team and membership management.

**Functions:**

- `appwrite_teams_list()` - List all teams
- `appwrite_teams_create(name, team_id?)` - Create team
- `appwrite_teams_get(team_id)` - Get team
- `appwrite_teams_update(team_id, name)` - Update team
- `appwrite_teams_delete(team_id)` - Delete team
- `appwrite_teams_list_memberships(team_id)` - List memberships

### `utils.py`

Shared utilities for the package.

**Functions:**

- `to_json(data)` - Convert data to JSON string
- `handle_error(error)` - Handle exceptions and format errors
- `success_response(data?, message?)` - Create success response
- `error_response(message)` - Create error response

## Usage

### From Python

```python
from appwrite import appwrite_init_client, appwrite_account_get

# Initialize client
result = appwrite_init_client(
    endpoint='https://cloud.appwrite.io/v1',
    project_id='YOUR_PROJECT_ID'
)

# Use services
account = appwrite_account_get()
```

### From Tauri/Rust (via main.py)

All functions are automatically exposed to Rust/JavaScript through the main.py module:

```javascript
import { invoke } from '@tauri-apps/api/core';

// Initialize
await invoke('call_python', {
  function: 'appwrite_init_client',
  args: {
    endpoint: 'https://cloud.appwrite.io/v1',
    project_id: 'YOUR_PROJECT_ID'
  }
});

// Use services
const account = await invoke('call_python', {
  function: 'appwrite_account_get'
});
```

## Response Format

All functions return JSON strings with a consistent format:

### Success

```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message"
}
```

### Error

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": 404,
    "type": "error_type"
  }
}
```

## Design Principles

1. **Modularity**: Each service is in its own module for better organization
2. **Consistency**: All functions follow the same naming convention and return format
3. **Error Handling**: Comprehensive error handling with detailed error messages
4. **Type Safety**: Full type hints for all functions
5. **Documentation**: Clear docstrings for every function
6. **Graceful Degradation**: Package works even if Appwrite SDK is not installed

## Adding New Services

To add a new Appwrite service:

1. Create a new module (e.g., `functions.py`)
2. Import utilities and client getter from respective modules
3. Implement service functions following the existing pattern
4. Export functions in `__init__.py`
5. Update `main.py` to import and register the new functions
6. Update `lib.rs` to register the functions with Rust

## Dependencies

- `appwrite>=7.0.0` - Appwrite Python SDK

Install with:

```bash
pip install -r requirements.txt
```
