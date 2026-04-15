from sqlalchemy.orm import Session

from src.api.contracts import ApiResponse, LoginRequest, RegisterRequest, TokenResponse
from src.core.services.auth.auth_service import AuthService


class AuthController:
    def __init__(self, db: Session) -> None:
        self._service = AuthService(db)

    def register(self, data: RegisterRequest) -> ApiResponse[TokenResponse]:
        token = self._service.register(data)
        return ApiResponse(
            status_code=201,
            message="User registered successfully",
            data=token,
        )

    def login(self, data: LoginRequest) -> ApiResponse[TokenResponse]:
        token = self._service.login(data)
        return ApiResponse(
            status_code=200,
            message="Login successful",
            data=token,
        )