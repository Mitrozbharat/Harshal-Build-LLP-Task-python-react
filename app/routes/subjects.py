# app/routes/subjects.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db


router = APIRouter(
    prefix="/subjects",
    tags=["Subjects"]
)



@router.get("/", response_model=list[schemas.Subject])
def get_subjects(db: Session = Depends(get_db)):
    return db.query(models.Subject).all()


@router.get("/{subject_id}", response_model=schemas.Subject)
def get_subject(subject_id: int, db: Session = Depends(get_db)):
    subject = db.query(models.Subject).filter(models.Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    return subject

@router.put("/{subject_id}", response_model=schemas.Subject)
def update_subject(subject_id: int, subject: schemas.SubjectCreate, db: Session = Depends(get_db)):

    existing_subject = db.query(models.Subject).filter(models.Subject.title == subject.title).first()
    if existing_subject:
        raise HTTPException(status_code=400, detail="Title is already Added")


    db_subject = db.query(models.Subject).filter(models.Subject.id == subject_id).first()
    if not db_subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    db_subject.title = subject.title
    db_subject.description = subject.description
    db.commit()
    db.refresh(db_subject)
    return db_subject

@router.post("/", response_model=schemas.Subject)
def create_subject(subject: schemas.SubjectCreate, db: Session = Depends(get_db)):

    existing_subject = db.query(models.Subject).filter(models.Subject.title == subject.title).first()
    if existing_subject:
        raise HTTPException(status_code=400, detail="Title is already Added")   

    db_subject = models.Subject(title=subject.title, description=subject.description)
    db.add(db_subject)
    db.commit()
    db.refresh(db_subject)
    return db_subject

@router.delete("/{subject_id}")
def delete_subject(subject_id: int, db: Session = Depends(get_db)):
    subject = db.query(models.Subject).filter(models.Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    db.delete(subject)
    db.commit()
    return {"message": "Subject deleted successfully"}
