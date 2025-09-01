from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, models
from ..database import get_db


router = APIRouter(
    prefix="/enrollments",
      tags=["Enrollments"]
      )

@router.post("/")
def create_enrollment(student_id: int, subject_id: int, db: Session = Depends(get_db)):
    print("DEBUG → student_id:", student_id, "subject_id:", subject_id)

    # check student
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # check subject
    subject = db.query(models.Subject).filter(models.Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    # check if already enrolled
    existing_enrollment = (
        db.query(models.Enrollment)
        .filter(
            models.Enrollment.student_id == student_id,
            models.Enrollment.subject_id == subject_id
        )
        .first()
    )

    if existing_enrollment:
        raise HTTPException(status_code=400, detail="Student is already enrolled in this subject")

    # create enrollment
    try:
        enrollment = models.Enrollment(student_id=student_id, subject_id=subject_id)
        db.add(enrollment)
        db.commit()
        db.refresh(enrollment)
        print("DEBUG → enrollment created:", enrollment.id)
        return enrollment
    except Exception as e:
        db.rollback()
        print("ERROR →", e)
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
def get_enrollments(db: Session = Depends(get_db)):
    return db.query(models.Enrollment).all()




@router.delete("/{enrollment_id}")
def delete_enrollment(enrollment_id: int, db: Session = Depends(get_db)):
    Enrollment = db.query(models.Enrollment).filter(models.Enrollment.id == enrollment_id).first()
    if not Enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")
    db.delete(Enrollment)
    db.commit()
    return {"message": "Enrollment deleted successfully"}



@router.put("/{enrollment_id}", response_model=schemas.Enrollment)
def update_enrollment(enrollment_id: int, enrollment: schemas.EnrollmentCreate, db: Session = Depends(get_db)):
    db_enrollment = db.query(models.Enrollment).filter(models.Enrollment.id == enrollment_id).first()
    if not db_enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")
    db_enrollment.student_id = enrollment.student_id
    db_enrollment.subject_id = enrollment.subject_id
    db.commit()
    db.refresh(db_enrollment)
    return db_enrollment


@router.get("/unenrolled", response_model=list[schemas.Student])
def get_unenrolled_students(db: Session = Depends(get_db)):
    students = (
        db.query(models.Student)
        .filter(~models.Student.enrollments.any())  # students with NO enrollments
        .all()
    )
    return students
