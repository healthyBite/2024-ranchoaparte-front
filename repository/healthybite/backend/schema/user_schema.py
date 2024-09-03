from pydantic import BaseModel
from typing import Optional


class UserSchema(BaseModel):
    id: Optional[int] = None
    name: str
    surname: str
    email: str
    password: str
    birthdate: str
    weight: float
    height: float
