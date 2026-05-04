from pydantic import BaseModel, EmailStr
from datetime import datetime


class SnippetCreate(BaseModel):
    title: str
    description: str
    category: str
    css_code: str
    html_code: str
    author: str


class SnippetResponse(SnippetCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str


class UserUpdate(BaseModel):
    email: EmailStr
    username: str
    password: str | None = None


class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    role: str
    created_at: datetime

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
