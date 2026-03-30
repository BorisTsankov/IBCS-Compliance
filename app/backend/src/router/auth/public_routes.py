from fastapi import APIRouter, Depends

from src.api.controllers.auth.auth_controller import AuthController
from src.core.schemas.User import ApiResponse, TokenResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=ApiResponse[TokenResponse], status_code=201)
def register(response: ApiResponse[TokenResponse] = Depends(AuthController.register)):
    return response


@router.post("/login", response_model=ApiResponse[TokenResponse])
def login(response: ApiResponse[TokenResponse] = Depends(AuthController.login)):
    return response
