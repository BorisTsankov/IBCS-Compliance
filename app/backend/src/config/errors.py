from fastapi import HTTPException


# ─── Error Dictionary ────────────────────────────────────────────────
# Each error has a unique key with: name, code (HTTP status), and message.
# All application errors should reference these keys.

ERRORS: dict[str, dict] = {
    # Auth errors
    "USER_ALREADY_EXISTS": {
        "name": "USER_ALREADY_EXISTS",
        "code": 409,
        "message": "A user with this username already exists.",
    },
    "EMAIL_ALREADY_EXISTS": {
        "name": "EMAIL_ALREADY_EXISTS",
        "code": 409,
        "message": "A user with this email already exists.",
    },
    "INVALID_CREDENTIALS": {
        "name": "INVALID_CREDENTIALS",
        "code": 401,
        "message": "Invalid username or password.",
    },
    "INVALID_TOKEN": {
        "name": "INVALID_TOKEN",
        "code": 401,
        "message": "The provided token is invalid or expired.",
    },
    "TOKEN_EXPIRED": {
        "name": "TOKEN_EXPIRED",
        "code": 401,
        "message": "The token has expired.",
    },
    "MISSING_TOKEN": {
        "name": "MISSING_TOKEN",
        "code": 401,
        "message": "Authentication token is missing.",
    },
    # User errors
    "USER_NOT_FOUND": {
        "name": "USER_NOT_FOUND",
        "code": 404,
        "message": "User not found.",
    },
    # Generic errors
    "INTERNAL_ERROR": {
        "name": "INTERNAL_ERROR",
        "code": 500,
        "message": "An unexpected error occurred.",
    },
}


# ─── Custom Exception ────────────────────────────────────────────────
class AppError(HTTPException):
    """Custom application error that maps to an entry in the ERRORS dictionary."""

    def __init__(self, error_key: str, detail: str | None = None) -> None:
        error = ERRORS.get(error_key)

        if error is None:
            error = ERRORS["INTERNAL_ERROR"]

        super().__init__(
            status_code=error["code"],
            detail={
                "name": error["name"],
                "message": detail or error["message"],
            },
        )
        self.error_name: str = error["name"]
