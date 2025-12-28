"""
Appwrite Teams Service Module
Handles team and membership management
"""

from typing import Optional

from .client import get_teams_service
from .utils import error_response, success_response, handle_error

try:
    from appwrite.id import ID

    APPWRITE_AVAILABLE = True
except ImportError:
    APPWRITE_AVAILABLE = False


def appwrite_teams_list() -> str:
    """
    List all teams

    Returns:
        JSON string with list of teams
    """
    service = get_teams_service()
    if not service:
        return error_response("Client not initialized")

    try:
        result = service.list()
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


def appwrite_teams_create(name: str, team_id: Optional[str] = None) -> str:
    """
    Create a new team

    Args:
        name: Team name
        team_id: Optional custom team ID

    Returns:
        JSON string with created team
    """
    service = get_teams_service()
    if not service:
        return error_response("Client not initialized")

    try:
        tid = team_id if team_id else ID.unique()
        result = service.create(team_id=tid, name=name)
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


def appwrite_teams_get(team_id: str) -> str:
    """
    Get a team by ID

    Args:
        team_id: Team ID

    Returns:
        JSON string with team data
    """
    service = get_teams_service()
    if not service:
        return error_response("Client not initialized")

    try:
        result = service.get(team_id)
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


def appwrite_teams_update(team_id: str, name: str) -> str:
    """
    Update team name

    Args:
        team_id: Team ID
        name: New team name

    Returns:
        JSON string with updated team
    """
    service = get_teams_service()
    if not service:
        return error_response("Client not initialized")

    try:
        result = service.update_name(team_id, name)
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


def appwrite_teams_delete(team_id: str) -> str:
    """
    Delete a team

    Args:
        team_id: Team ID

    Returns:
        JSON string with deletion result
    """
    service = get_teams_service()
    if not service:
        return error_response("Client not initialized")

    try:
        service.delete(team_id)
        return success_response(message="Team deleted")
    except Exception as e:
        return handle_error(e)


def appwrite_teams_list_memberships(team_id: str) -> str:
    """
    List team memberships

    Args:
        team_id: Team ID

    Returns:
        JSON string with list of memberships
    """
    service = get_teams_service()
    if not service:
        return error_response("Client not initialized")

    try:
        result = service.list_memberships(team_id)
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


print("Appwrite teams module loaded")
