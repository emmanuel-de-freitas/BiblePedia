"""
Appwrite Database Service Module
Handles database operations and document management
"""

import json
from typing import Optional

from .client import get_databases_service
from .utils import error_response, success_response, handle_error

try:
    from appwrite.id import ID

    APPWRITE_AVAILABLE = True
except ImportError:
    APPWRITE_AVAILABLE = False


def appwrite_database_list_documents(
        database_id: str,
        collection_id: str,
        queries: Optional[str] = None
) -> str:
    """
    List documents in a collection

    Args:
        database_id: Database ID
        collection_id: Collection ID
        queries: Optional JSON string of query filters

    Returns:
        JSON string with list of documents
    """
    service = get_databases_service()
    if not service:
        return error_response("Client not initialized")

    try:
        query_list = []
        if queries:
            query_data = json.loads(queries)
            query_list = query_data if isinstance(query_data, list) else []

        result = service.list_documents(
            database_id=database_id,
            collection_id=collection_id,
            queries=query_list
        )
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


def appwrite_database_create_document(
        database_id: str,
        collection_id: str,
        data: str,
        document_id: Optional[str] = None
) -> str:
    """
    Create a new document

    Args:
        database_id: Database ID
        collection_id: Collection ID
        data: JSON string of document data
        document_id: Optional custom document ID (generates unique ID if not provided)

    Returns:
        JSON string with created document
    """
    service = get_databases_service()
    if not service:
        return error_response("Client not initialized")

    try:
        doc_id = document_id if document_id else ID.unique()
        document_data = json.loads(data)

        result = service.create_document(
            database_id=database_id,
            collection_id=collection_id,
            document_id=doc_id,
            data=document_data
        )
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


def appwrite_database_get_document(
        database_id: str,
        collection_id: str,
        document_id: str
) -> str:
    """
    Get a specific document

    Args:
        database_id: Database ID
        collection_id: Collection ID
        document_id: Document ID

    Returns:
        JSON string with document data
    """
    service = get_databases_service()
    if not service:
        return error_response("Client not initialized")

    try:
        result = service.get_document(
            database_id=database_id,
            collection_id=collection_id,
            document_id=document_id
        )
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


def appwrite_database_update_document(
        database_id: str,
        collection_id: str,
        document_id: str,
        data: str
) -> str:
    """
    Update a document

    Args:
        database_id: Database ID
        collection_id: Collection ID
        document_id: Document ID
        data: JSON string of updated data

    Returns:
        JSON string with updated document
    """
    service = get_databases_service()
    if not service:
        return error_response("Client not initialized")

    try:
        document_data = json.loads(data)
        result = service.update_document(
            database_id=database_id,
            collection_id=collection_id,
            document_id=document_id,
            data=document_data
        )
        return success_response(data=result)
    except Exception as e:
        return handle_error(e)


def appwrite_database_delete_document(
        database_id: str,
        collection_id: str,
        document_id: str
) -> str:
    """
    Delete a document

    Args:
        database_id: Database ID
        collection_id: Collection ID
        document_id: Document ID

    Returns:
        JSON string with deletion result
    """
    service = get_databases_service()
    if not service:
        return error_response("Client not initialized")

    try:
        service.delete_document(
            database_id=database_id,
            collection_id=collection_id,
            document_id=document_id
        )
        return success_response(message="Document deleted")
    except Exception as e:
        return handle_error(e)


print("Appwrite database module loaded")
