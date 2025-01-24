# Imports
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


# URL for Database
URL_DATABASE = "sqlite:///./taskDatabase.db"

engine = create_engine(URL_DATABASE, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base Model
Base = declarative_base()
