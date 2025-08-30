from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import database, models
from ..database import get_db


router = APIRouter(
    prefix="/enrollments",
      tags=["Enrollments"]
      )

@router.post("/")
def create_enrollment(student_id: int, subject_id: int, db: Session = Depends(get_db)):
    # check student
    student = db.query(models.Student).filter(models.Student.id == student_id).first()



    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # check subject
    subject = db.query(models.Subject).filter(models.Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    # create enrollment
    enrollment = models.Enrollment(student_id=student_id, subject_id=subject_id)
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)
    return enrollment

@router.get("/")
def get_enrollments(db: Session = Depends(get_db)):
    return db.query(models.Enrollment).all()




