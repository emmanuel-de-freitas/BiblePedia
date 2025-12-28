"""
Appwrite SDK Integration Package for Livrea
"""

# Import account service functions
from .account import (
    appwrite_account_get,
    appwrite_account_create,
    appwrite_account_create_email_session,
    appwrite_account_delete_session,
    appwrite_account_list_sessions,
    appwrite_account_update_name,
    appwrite_account_update_email,
    appwrite_account_update_password,
)
# Import client initialization functions
from .client import (
    appwrite_init_client,
    appwrite_check_initialized,
)
# Import database service functions
from .database import (
    appwrite_database_list_documents,
    appwrite_database_create_document,
    appwrite_database_get_document,
    appwrite_database_update_document,
    appwrite_database_delete_document,
)
# Import storage service functions
from .storage import (
    appwrite_storage_list_files,
    appwrite_storage_get_file,
    appwrite_storage_delete_file,
    appwrite_storage_get_file_download_url,
    appwrite_storage_get_file_view_url,
)
# Import teams service functions
from .teams import (
    appwrite_teams_list,
    appwrite_teams_create,
    appwrite_teams_get,
    appwrite_teams_update,
    appwrite_teams_delete,
    appwrite_teams_list_memberships,
)

# Export all functions
__all__ = [
    # Client
    "appwrite_init_client",
    "appwrite_check_initialized",
    # Account
    "appwrite_account_get",
    "appwrite_account_create",
    "appwrite_account_create_email_session",
    "appwrite_account_delete_session",
    "appwrite_account_list_sessions",
    "appwrite_account_update_name",
    "appwrite_account_update_email",
    "appwrite_account_update_password",
    # Database
    "appwrite_database_list_documents",
    "appwrite_database_create_document",
    "appwrite_database_get_document",
    "appwrite_database_update_document",
    "appwrite_database_delete_document",
    # Storage
    "appwrite_storage_list_files",
    "appwrite_storage_get_file",
    "appwrite_storage_delete_file",
    "appwrite_storage_get_file_download_url",
    "appwrite_storage_get_file_view_url",
    # Teams
    "appwrite_teams_list",
    "appwrite_teams_create",
    "appwrite_teams_get",
    "appwrite_teams_update",
    "appwrite_teams_delete",
    "appwrite_teams_list_memberships",
]

print("Appwrite package loaded successfully for Livrea")
