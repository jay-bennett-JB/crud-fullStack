# Imports
from sqlalchemy import Column, Integer, String, Boolean, Float, Date, DateTime
from FastAPI.database import Base


# Table Class
class Transaction(Base):
    # Table name
    __tablename__ = "transactions"

    # Column Set up
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    dueDate = Column(DateTime)
    priority = Column(Boolean, nullable=False, default=False)
