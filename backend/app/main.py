from .database import SessionLocal, Base, engine
from sqlalchemy.orm import Session
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import Snippet
from .schemas import SnippetCreate, SnippetResponse


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

Base.metadata.create_all(bind=engine)

@app.get("/snippets", response_model=list[SnippetResponse])
def get_snippets(db: Session = Depends(get_db)):
    snippets = db.query(Snippet).all()
    return snippets

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
    
