from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.api.controllers.auth.auth_controller import AuthController
from src.config.db import get_db
from src.core.schemas.User import ApiResponse, RegisterRequest, TokenResponse, LoginRequest

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=ApiResponse[TokenResponse], status_code=201)
def register(data: RegisterRequest, db: Session = Depends(get_db)) -> ApiResponse[TokenResponse]:
    controller = AuthController(db)
    return controller.register(data)


@router.post("/login", response_model=ApiResponse[TokenResponse], status_code=200)
def login(data: LoginRequest, db: Session = Depends(get_db)) -> ApiResponse[TokenResponse]:
    controller = AuthController(db)
    return controller.login(data)