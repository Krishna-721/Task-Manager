from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr

class UserUpdate(BaseModel):
    name: Optional[str]=Field(None, min_length=1)
    email: Optional[EmailStr]=None
    password: Optional[str]=Field(None, min_length=6)
    bio: Optional[str] = None
