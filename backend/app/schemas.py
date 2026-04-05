from pydantic import BaseModel
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