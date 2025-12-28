"""
Utility functions for Appwrite integration
"""

import json
from typing import Any

try:
    from appwrite.exception import AppwriteException
    APPWRITE_AVAILABLE = True
except ImportError:
    APPWRITE_AVAILABLE = False
    AppwriteException = Exception


def to_json(data: Any) -> str:
    """Convert data to JSON string for Rust/JS interop"""
    return json.dumps(data, ensure_ascii=False)


def handle_error(error: Exception) -> str:
    """Handle exceptions and return formatted error response"""
    if APPWRITE_AVAILABLE and isinstance(error, AppwriteException):
        return to_json({
            "success": False,
            "error": {
                "message": error.message,
                "code": error.code,
                "type": error.type,
                "response": error.response
            }
        })
    return to_json({
        "success": False,
        "error": {
            "message": str(error),
            "type": type(error).__name__
        }
    })


def success_response(data: Any = None, message: str = None) -> str:
    """Create a success response"""
    response = {"success": True}
    if data is not None:
        response["data"] = data
    if message is not None:
        response["message"] = message
    return to_json(response)


def error_response(message: str) -> str:
    """Create an error response"""
    return to_json({
        "success": False,
        "error": message
    })
