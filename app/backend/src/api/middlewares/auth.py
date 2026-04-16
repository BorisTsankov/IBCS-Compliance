from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from src.config.errors import AppError
from src.core.services.auth.auth_service import AuthService

bearer_scheme = HTTPBearer(auto_error=False)


def get_current_user_id(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> str:
    """FastAPI dependency that extracts and validates the JWT from the
    Authorization header and returns the authenticated user's ID.

    Usage:
        @router.get("/me")
        def me(user_id: str = Depends(get_current_user_id)):
            ...
    """
    if credentials is None:
        raise AppError("MISSING_TOKEN")

    token = credentials.credentials
    payload = AuthService.decode_token(token)

    user_id: str | None = payload.get("sub")

    if user_id is None:
        raise AppError("INVALID_TOKEN")

    return user_id


def get_optional_current_user_id(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> str | None:
    if credentials is None:
        return None

    token = credentials.credentials

    try:
        payload = AuthService.decode_token(token)
        user_id: str | None = payload.get("sub")
        return user_id
    except Exception:
        return None