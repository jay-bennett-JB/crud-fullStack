# Imports
from sqlalchemy import Column, Integer, String, Boolean, Float, Date
from database import Base


# Table Class
class Transaction(Base):
    # Table name
    __tablename__ = "transactions"

    # Column Set up
    id = Column(Integer, primary_key=True)
    taskID = Column(Integer, unique=True)
    name = Column(String)
    description = Column(String)
    dueDate = Column(Date)
    priority = Column(String)
