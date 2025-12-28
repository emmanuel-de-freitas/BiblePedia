"""
Appwrite Storage Service Module
Handles file storage operations
"""

from .client import get_storage_service, get_client
from .utils import error_response, success_response, handle_error


def appwrite_storage_list_files(bucket_id: str) -> str:
    """
    List files in a storage bucket

    Args:
        bucket_id: Bucket ID

    Returns:
        JSON string with list of files
    """
    service = get_storage_service()
    if not service:
        return error_response("Client not initialized")

    try:
        result = service.list_files(bucket_id)
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


def appwrite_storage_get_file(bucket_id: str, file_id: str) -> str:
    """
    Get file metadata

    Args:
        bucket_id: Bucket ID
        file_id: File ID

    Returns:
        JSON string with file metadata
    """
    service = get_storage_service()
    if not service:
        return error_response("Client not initialized")

    try:
        result = service.get_file(bucket_id, file_id)
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


def appwrite_storage_delete_file(bucket_id: str, file_id: str) -> str:
    """
    Delete a file

    Args:
        bucket_id: Bucket ID
        file_id: File ID

    Returns:
        JSON string with deletion result
    """
    service = get_storage_service()
    if not service:
        return error_response("Client not initialized")

    try:
        service.delete_file(bucket_id, file_id)
        return success_response(message="File deleted")
    except Exception as e:
        return handle_error(e)


def appwrite_storage_get_file_download_url(bucket_id: str, file_id: str) -> str:
    """
    Get file download URL

    Args:
        bucket_id: Bucket ID
        file_id: File ID

    Returns:
        JSON string with download URL
    """
    client = get_client()
    if not client:
        return error_response("Client not initialized")

    try:
        endpoint = client._endpoint
        project_id = client._project

        url = f"{endpoint}/storage/buckets/{bucket_id}/files/{file_id}/download?project={project_id}"
        return success_response(data={"url": url})
    except Exception as e:
        return handle_error(e)


def appwrite_storage_get_file_view_url(bucket_id: str, file_id: str) -> str:
    """
    Get file view URL

    Args:
        bucket_id: Bucket ID
        file_id: File ID

    Returns:
        JSON string with view URL
    """
    client = get_client()
    if not client:
        return error_response("Client not initialized")

    try:
        endpoint = client._endpoint
        project_id = client._project

        url = f"{endpoint}/storage/buckets/{bucket_id}/files/{file_id}/view?project={project_id}"
        return success_response(data={"url": url})
    except Exception as e:
        return handle_error(e)


print("Appwrite storage module loaded")
