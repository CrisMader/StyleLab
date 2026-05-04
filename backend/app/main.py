from .database import SessionLocal, Base, engine
from sqlalchemy.orm import Session
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import Snippet, User
from .schemas import (
    SnippetCreate, SnippetResponse,
    LoginRequest, TokenResponse,
    UserCreate, UserUpdate, UserResponse,
)
from .auth import hash_password, verify_password, create_access_token


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


# ── Snippets ──────────────────────────────────────────────

@app.get("/snippets", response_model=list[SnippetResponse])
def get_snippets(db: Session = Depends(get_db)):
    return db.query(Snippet).all()


@app.get("/snippets/{id}", response_model=SnippetResponse)
def get_snippet(id: int, db: Session = Depends(get_db)):
    snippet = db.query(Snippet).filter(Snippet.id == id).first()
    if snippet is None:
        raise HTTPException(status_code=404, detail="Snippet not found")
    return snippet


@app.post("/snippets", status_code=201, response_model=SnippetResponse)
def create_snippet(snippet: SnippetCreate, db: Session = Depends(get_db)):
    new_snippet = Snippet(**snippet.model_dump())
    db.add(new_snippet)
    db.commit()
    db.refresh(new_snippet)
    return new_snippet


# ── Auth ──────────────────────────────────────────────────

@app.post("/auth/register", status_code=201, response_model=TokenResponse)
def register(body: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == body.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    if db.query(User).filter(User.username == body.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")

    new_user = User(
        email=body.email,
        username=body.username,
        hashed_password=hash_password(body.password),
        role="user",
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({"sub": str(new_user.id), "role": new_user.role})
    return {"access_token": token, "token_type": "bearer", "user": new_user}


@app.post("/auth/login", response_model=TokenResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not verify_password(body.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": str(user.id), "role": user.role})
    return {"access_token": token, "token_type": "bearer", "user": user}


# ── Users ─────────────────────────────────────────────────

@app.put("/users/{id}", response_model=UserResponse)
def update_user(id: int, body: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if body.email != user.email and db.query(User).filter(User.email == body.email).first():
        raise HTTPException(status_code=400, detail="Email already in use")
    if body.username != user.username and db.query(User).filter(User.username == body.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")

    user.email = body.email
    user.username = body.username
    if body.password:
        user.hashed_password = hash_password(body.password)

    db.commit()
    db.refresh(user)
    return user
