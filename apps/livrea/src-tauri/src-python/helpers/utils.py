import json
from typing import Any

try:
    from appwrite.exception import AppwriteException

    APPWRITE_AVAILABLE = True
except ImportError:
    APPWRITE_AVAILABLE = False
    print("Warning: Appwrite SDK not installed. Install with: pip install appwrite")


# Helper function to ensure JSON serialization
def to_json(data: Any) -> str:
    """Convert data to JSON string for Rust/JS interop"""
    return json.dumps(data, ensure_ascii=False)


def _handle_error(error: Exception) -> str:
    """Handle exceptions and return formatted error response"""
    if isinstance(error, AppwriteException):
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


__name__ = 'utils'
