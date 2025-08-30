# app/routes/students.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)
@router.get("/", response_model=list[schemas.Student])
def get_students(db: Session = Depends(get_db)):
    return db.query(models.Student).all()


@router.get("/{student_id}", response_model=schemas.Student)
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student



@router.post("/", response_model=schemas.Student)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    db_student = models.Student(name=student.name, email=student.email)
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student


@router.put("/{student_id}", response_model=schemas.Student)
def update_student(student_id: int, student: schemas.StudentCreate, db: Session = Depends
(get_db)):
    db_student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    db_student.name = student.name
    db_student.email = student.email
    db.commit()
    db.refresh(db_student)
    return db_student



@router.delete("/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    db.delete(student)
    db.commit()
    return {"message": "Student deleted successfully"}



@router.get("/enrolledStudents/", response_model=list[schemas.Student])
def get_enrolled_students(db: Session = Depends(get_db)):
    # Get students who are enrolled in at least one subject
    enrolled_students = db.query(models.Student).join(models.Enrollment).distinct().all()
    return enrolled_students

@router.get("/notEnrolledStudents/", response_model=list[schemas.Student])
def get_not_enrolled_students(db: Session = Depends(get_db)):
    # Get students whose IDs are not present in the Enrollment table
    subquery = db.query(models.Enrollment.student_id)
    not_enrolled_students = db.query(models.Student).filter(~models.Student.id.in_(subquery)).all()
    return not_enrolled_students