"""
Appwrite Client Initialization Module
"""

from typing import Optional

from .utils import success_response, error_response, handle_error

try:
    from appwrite.client import Client
    from appwrite.services.account import Account
    from appwrite.services.databases import Databases
    from appwrite.services.storage import Storage
    from appwrite.services.teams import Teams
    from appwrite.services.users import Users

    APPWRITE_AVAILABLE = True
except ImportError:
    APPWRITE_AVAILABLE = False
    print("Warning: Appwrite SDK not installed. Install with: pip install appwrite")

# Global client instance and services
_appwrite_client: Optional[Client] = None
_account_service: Optional[Account] = None
_databases_service: Optional[Databases] = None
_storage_service: Optional[Storage] = None
_teams_service: Optional[Teams] = None
_users_service: Optional[Users] = None


def get_client() -> Optional[Client]:
    """Get the global Appwrite client instance"""
    return _appwrite_client


def get_account_service() -> Optional[Account]:
    """Get the Account service instance"""
    return _account_service


def get_databases_service() -> Optional[Databases]:
    """Get the Databases service instance"""
    return _databases_service


def get_storage_service() -> Optional[Storage]:
    """Get the Storage service instance"""
    return _storage_service


def get_teams_service() -> Optional[Teams]:
    """Get the Teams service instance"""
    return _teams_service


def get_users_service() -> Optional[Users]:
    """Get the Users service instance"""
    return _users_service


def appwrite_init_client(endpoint: str, project_id: str, api_key: Optional[str] = None) -> str:
    """
    Initialize Appwrite client with configuration

    Args:
        endpoint: Appwrite API endpoint (e.g., 'https://cloud.appwrite.io/v1')
        project_id: Appwrite project ID
        api_key: Optional API key for server-side operations

    Returns:
        JSON string with success status
    """
    if not APPWRITE_AVAILABLE:
        return error_response("Appwrite SDK not installed")

    try:
        global _appwrite_client, _account_service, _databases_service, _storage_service, _teams_service, _users_service

        _appwrite_client = Client()
        _appwrite_client.set_endpoint(endpoint)
        _appwrite_client.set_project(project_id)

        if api_key:
            _appwrite_client.set_key(api_key)

        # Initialize services
        _account_service = Account(_appwrite_client)
        _databases_service = Databases(_appwrite_client)
        _storage_service = Storage(_appwrite_client)
        _teams_service = Teams(_appwrite_client)
        _users_service = Users(_appwrite_client)

        return success_response(message="Appwrite client initialized successfully")
    except Exception as e:
        return handle_error(e)


def appwrite_check_initialized() -> str:
    """Check if Appwrite client is initialized"""
    return success_response(data={
        "initialized": _appwrite_client is not None,
        "available": APPWRITE_AVAILABLE
    })


print("Appwrite client module loaded")
