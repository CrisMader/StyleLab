from sqlalchemy import String, Text, ForeignKey, UniqueConstraint
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


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    username: Mapped[str] = mapped_column(String(80), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    role: Mapped[str] = mapped_column(String(20), nullable=False, default="user")
    created_at: Mapped[datetime] = mapped_column(default=lambda: datetime.now(timezone.utc))


class Favorite(Base):
    __tablename__ = "favorite"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    snippet_id: Mapped[int] = mapped_column(ForeignKey("snippet.id"), nullable=False)

    __table_args__ = (UniqueConstraint("user_id", "snippet_id"),)