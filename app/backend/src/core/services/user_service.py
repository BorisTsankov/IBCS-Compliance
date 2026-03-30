from sqlalchemy.orm import Session

from src.config.errors import AppError
from src.core.schemas.User import UserResponse
from src.dal.repo.user_repo import UserRepository


class UserService:
    def __init__(self, db: Session) -> None:
        self._repo = UserRepository(db)

    def get_current_user(self, user_id: str) -> UserResponse:

        user = self._repo.find_by_id(user_id)

        if user is None:
            raise AppError("USER_NOT_FOUND")

        return UserResponse.model_validate(user)
