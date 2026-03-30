from fastapi import Depends
from sqlalchemy.orm import Session

from src.api.middlewares.auth import get_current_user_id
from src.config.db import get_db
from src.core.schemas.User import ApiResponse, UserResponse
from src.core.services.user_service import UserService


class UserController:

    @staticmethod
    def get_me(
        user_id: str = Depends(get_current_user_id),
        db: Session = Depends(get_db),
    ) -> ApiResponse[UserResponse]:
        service = UserService(db)
        user = service.get_current_user(user_id)
        return ApiResponse(status_code=200, message="User retrieved successfully", data=user)
