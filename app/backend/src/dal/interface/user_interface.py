from abc import ABC, abstractmethod

from src.core.models.user_model import UserModel


class IUserRepository(ABC):

    @abstractmethod
    def find_by_id(self, user_id: str) -> UserModel | None: ...

    @abstractmethod
    def find_by_username(self, username: str) -> UserModel | None: ...

    @abstractmethod
    def find_by_email(self, email: str) -> UserModel | None: ...

    @abstractmethod
    def create(self, user: UserModel) -> UserModel: ...
