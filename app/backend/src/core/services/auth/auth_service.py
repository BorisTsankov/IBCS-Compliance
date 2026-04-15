from datetime import datetime, timedelta, timezone

import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from src.config.config import settings
from src.config.errors import AppError
from src.api.contracts import LoginRequest, RegisterRequest, TokenResponse
from src.core.models.user_model import UserModel
from src.dal.repo.user_repo import UserRepository


class AuthService:
    """Handles registration, login, password hashing, and JWT token management."""

    # Use pbkdf2_sha256 to avoid bcrypt backend/runtime compatibility issues.
    _pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

    def __init__(self, db: Session) -> None:
        self._repo = UserRepository(db)

    # ─── Public Methods ──────────────────────────────────────────────

    def register(self, data: RegisterRequest) -> TokenResponse:
        """Register a new user and return a JWT token."""

        # Check for duplicate username
        if self._repo.find_by_username(data.username):
            raise AppError("USER_ALREADY_EXISTS")

        # Check for duplicate email
        if self._repo.find_by_email(data.email):
            raise AppError("EMAIL_ALREADY_EXISTS")

        user = UserModel(
            username=data.username,
            email=data.email,
            password_hash=self._hash_password(data.password),
        )

        created_user = self._repo.create(user)
        token = self._create_token(created_user.id)

        return TokenResponse(access_token=token)

    def login(self, data: LoginRequest) -> TokenResponse:
        """Authenticate a user and return a JWT token."""

        user = self._repo.find_by_username(data.username)

        if user is None or not self._verify_password(data.password, user.password_hash):
            raise AppError("INVALID_CREDENTIALS")

        token = self._create_token(user.id)
        return TokenResponse(access_token=token)

    @staticmethod
    def decode_token(token: str) -> dict:
        """Decode and validate a JWT token. Returns the payload."""
        try:
            payload: dict = jwt.decode(
                token,
                settings.JWT_SECRET_KEY,
                algorithms=[settings.JWT_ALGORITHM],
            )
            return payload
        except jwt.ExpiredSignatureError:
            raise AppError("TOKEN_EXPIRED")
        except jwt.InvalidTokenError:
            raise AppError("INVALID_TOKEN")

    # ─── Private Helpers ─────────────────────────────────────────────

    @classmethod
    def _hash_password(cls, password: str) -> str:
        return cls._pwd_context.hash(password)

    @classmethod
    def _verify_password(cls, plain: str, hashed: str) -> bool:
        return cls._pwd_context.verify(plain, hashed)

    @staticmethod
    def _create_token(user_id: str) -> str:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.JWT_EXPIRATION_MINUTES)
        payload = {"sub": user_id, "exp": expire}
        return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
