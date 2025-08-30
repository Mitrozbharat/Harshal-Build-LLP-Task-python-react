from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Replace with your MySQL username, password, host, and database
DATABASE_URL = "mysql+mysqlconnector://root:root@localhost/university_db"

# Create database engine
engine = create_engine(DATABASE_URL, echo=True)

# Session for transactions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for ORM models
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
