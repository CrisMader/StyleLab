from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column
from .database import Base
from datetime import datetime, timezone

class Snippet(Base):
    __tablename__ = "snippet"

    id: Mapped[int]= mapped_column(primary_key=True)
    title: Mapped[str]= mapped_column(String(120), nullable=False)
    description: Mapped[str]= mapped_column(String(300), nullable=False)
    category: Mapped[str]= mapped_column(String, nullable=False)
    css_code: Mapped[str]= mapped_column(Text, nullable=False)
    html_code: Mapped[str]= mapped_column(Text, nullable=False)
    author: Mapped[str]= mapped_column(String, nullable=False)
    created_at: Mapped[datetime]= mapped_column(default=lambda: datetime.now(timezone.utc))