from pydantic import BaseModel

# ---------------- STUDENT ----------------
class StudentBase(BaseModel):
    name: str
    email: str

class StudentCreate(StudentBase):
    pass

class Student(StudentBase):
    id: int

    class Config:
        from_attributes = True   # updated for Pydantic v2


# ---------------- SUBJECT ----------------
class SubjectBase(BaseModel):
    title: str
    description: str

class SubjectCreate(SubjectBase):
    pass

class Subject(SubjectBase):
    id: int

    class Config:
        from_attributes = True


# ---------------- ENROLLMENT ----------------
class EnrollmentBase(BaseModel):
    student_id: int
    subject_id: int

class EnrollmentCreate(EnrollmentBase):
    pass

class Enrollment(EnrollmentBase):
    id: int

    class Config:
        from_attributes = True
