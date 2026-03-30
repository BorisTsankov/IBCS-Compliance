from fastapi import Depends
from sqlalchemy.orm import Session

from src.config.db import get_db
from src.core.schemas.User import ApiResponse, LoginRequest, RegisterRequest, TokenResponse
from src.core.services.auth.auth_service import AuthService


class AuthController:

    @staticmethod
    def register(data: RegisterRequest, db: Session = Depends(get_db)) -> ApiResponse[TokenResponse]:
        service = AuthService(db)
        token = service.register(data)
        return ApiResponse(status_code=201, message="User registered successfully", data=token)

    @staticmethod
    def login(data: LoginRequest, db: Session = Depends(get_db)) -> ApiResponse[TokenResponse]:
        service = AuthService(db)
        token = service.login(data)
        return ApiResponse(status_code=200, message="Login successful", data=token)
