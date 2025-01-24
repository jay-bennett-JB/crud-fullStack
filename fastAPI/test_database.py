# Imports
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import Base
import models


# URL for Database
SQLACLCEMY_URL_DATABASE = "sqlite:///./memory:"

engine = create_engine(SQLACLCEMY_URL_DATABASE, connect_args={"check_same_thread": False})

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Creating tables for testing
Base.metadata.create_all(bind=engine)
