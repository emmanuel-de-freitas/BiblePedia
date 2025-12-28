"""
Appwrite Account Service Module
Handles user authentication and account management
"""

from typing import Optional

from .client import get_account_service
from .utils import error_response, success_response, handle_error

try:
    from appwrite.id import ID

    APPWRITE_AVAILABLE = True
except ImportError:
    APPWRITE_AVAILABLE = False


def appwrite_account_get() -> str:
    """
    Get current account details

    Returns:
        JSON string with account information
    """
    service = get_account_service()
    if not service:
        return error_response("Client not initialized")

    try:
        result = service.get()
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


def appwrite_account_create(email: str, password: str, name: Optional[str] = None) -> str:
    """
    Create a new account

    Args:
        email: User email
        password: User password
        name: Optional user name

    Returns:
        JSON string with account creation result
    """
    service = get_account_service()
    if not service:
        return error_response("Client not initialized")

    try:
        user_id = ID.unique()
        result = service.create(
            user_id=user_id,
            email=email,
            password=password,
            name=name
        )
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


def appwrite_account_create_email_session(email: str, password: str) -> str:
    """
    Create email session (login)

    Args:
        email: User email
        password: User password

    Returns:
        JSON string with session information
    """
    service = get_account_service()
    if not service:
        return error_response("Client not initialized")

    try:
        result = service.create_email_password_session(email, password)
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


def appwrite_account_delete_session(session_id: str) -> str:
    """
    Delete a session (logout)

    Args:
        session_id: Session ID to delete (use 'current' for current session)

    Returns:
        JSON string with deletion result
    """
    service = get_account_service()
    if not service:
        return error_response("Client not initialized")

    try:
        service.delete_session(session_id)
        return success_response(message="Session deleted")
    except Exception as e:
        return handle_error(e)


def appwrite_account_list_sessions() -> str:
    """
    List all active sessions

    Returns:
        JSON string with list of sessions
    """
    service = get_account_service()
    if not service:
        return error_response("Client not initialized")

    try:
        result = service.list_sessions()
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


def appwrite_account_update_name(name: str) -> str:
    """
    Update account name

    Args:
        name: New name

    Returns:
        JSON string with updated account
    """
    service = get_account_service()
    if not service:
        return error_response("Client not initialized")

    try:
        result = service.update_name(name)
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


def appwrite_account_update_email(email: str, password: str) -> str:
    """
    Update account email

    Args:
        email: New email
        password: Current password for verification

    Returns:
        JSON string with updated account
    """
    service = get_account_service()
    if not service:
        return error_response("Client not initialized")

    try:
        result = service.update_email(email, password)
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


def appwrite_account_update_password(password: str, old_password: str) -> str:
    """
    Update account password

    Args:
        password: New password
        old_password: Current password

    Returns:
        JSON string with updated account
    """
    service = get_account_service()
    if not service:
        return error_response("Client not initialized")

    try:
        result = service.update_password(password, old_password)
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


print("Appwrite account module loaded")
