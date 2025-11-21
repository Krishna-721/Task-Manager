from pydantic import BaseModel
from typing import Optional, List

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    tags: Optional[List[str]] = []
    completed: bool = False
    status: str = "todo"  # NEW: todo | in_progress | done

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[List[str]] = None
    completed: Optional[bool] = None
    status: Optional[str] = None

class TaskOut(TaskBase):
    id: str
    user_id: str
