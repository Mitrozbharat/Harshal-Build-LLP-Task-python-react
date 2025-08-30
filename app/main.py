# app/main.py
from fastapi import FastAPI
from . import models
from .database import engine
from .routes import students, subjects,enrollments

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Include routers
app.include_router(students.router)
app.include_router(subjects.router)
app.include_router(enrollments.router)