from fastapi import Depends, Request
from sqlalchemy.orm import Session

from src.config.db import get_db
from src.config.errors import AppError
from src.core.services.auth.auth_service import AuthService


def get_current_user_id(request: Request, db: Session = Depends(get_db)) -> str:
    """FastAPI dependency that extracts and validates the JWT from the
    Authorization header and returns the authenticated user's ID.

    Usage:
        @router.get("/me")
        def me(user_id: str = Depends(get_current_user_id)):
            ...
    """
    auth_header: str | None = request.headers.get("Authorization")

    if auth_header is None or not auth_header.startswith("Bearer "):
        raise AppError("MISSING_TOKEN")

    token = auth_header.split(" ", 1)[1]
    payload = AuthService.decode_token(token)

    user_id: str | None = payload.get("sub")

    if user_id is None:
        raise AppError("INVALID_TOKEN")

    return user_id
