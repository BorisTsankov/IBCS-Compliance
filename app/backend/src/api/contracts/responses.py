from datetime import datetime
from typing import Generic, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    created_at: datetime

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ApiResponse(BaseModel, Generic[T]):
    status_code: int
    message: str
    data: T | None = None
