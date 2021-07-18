from typing import Optional
from pydantic import BaseModel


class Todo(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    deleted: Optional[bool] = False
