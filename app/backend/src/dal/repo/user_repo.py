from sqlalchemy.orm import Session

from src.dal.interface.user_interface import IUserRepository
from src.core.models.user_model import UserModel


class UserRepository(IUserRepository):
    def __init__(self, db: Session) -> None:
        self._db = db

    def find_by_id(self, user_id: str) -> UserModel | None:
        return self._db.query(UserModel).filter(UserModel.id == user_id).first()

    def find_by_username(self, username: str) -> UserModel | None:
        return self._db.query(UserModel).filter(UserModel.username == username).first()

    def find_by_email(self, email: str) -> UserModel | None:
        return self._db.query(UserModel).filter(UserModel.email == email).first()

    def create(self, user: UserModel) -> UserModel:
        self._db.add(user)
        self._db.commit()
        self._db.refresh(user)
        return user
