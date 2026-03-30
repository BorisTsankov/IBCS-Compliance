from fastapi import APIRouter, Depends

from src.api.controllers.user_controller import UserController
from src.core.schemas.User import ApiResponse, UserResponse

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=ApiResponse[UserResponse])
def get_me(response: ApiResponse[UserResponse] = Depends(UserController.get_me)):
    return response
