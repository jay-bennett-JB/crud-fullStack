# Imports
from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from typing import List
import logging

logging.basicConfig(level=logging.DEBUG)
# Api Setup
app = FastAPI()

# Origin Declaration
origins = ["http://localhost:8000", "https://localhost:3000"]

# Middleware declaration
# this allows for a request from only origin declared values, in addition to restricting request types
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


# TransactionBase Class - Using pydantic BaseModel inheritance to valid data received from React frontend
class TransactionBase(BaseModel):
    taskID: int
    name: str
    description: str
    dueDate: datetime
    priority: bool


# Transaction model - this declares the ID field and orm_mode to True
class TransactionModel(TransactionBase):
    id: int

    class Config:
        from_attributes = True


# Database Connection function, this will try the database with a request
# if request is invalid the database will be closed, in addition to when request is completed
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.rollback()
        db.close()


# Database dependency
db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)


# Post function - maps all values into  transaction table created in sqlite
@app.post("/transactions/", response_model=TransactionModel)
async def create_transaction(transaction: TransactionBase, db: db_dependency):
    logging.debug(f"DB Dependency : {type(db)}")
    db_transaction = models.Transaction(**transaction.model_dump())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


# Get Function for all transaction
@app.get("/transactions/", response_model=List[TransactionModel])
async def read_transactions(db: db_dependency, skip: int = 0, limit: int = 100):
    transactions = db.query(models.Transaction).offset(skip).limit(limit).all()
    return transactions


# 2nd GET Function for SINGLE Transaction
@app.get("/transactions/{transaction_id}", response_model=TransactionModel)
async def read_single_transaction(transaction_id: int, db: db_dependency):
    db_transaction = (
        db.query(models.Transaction)
        .filter(models.Transaction.id == transaction_id)
        .first()
    )
    if db_transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return db_transaction


# Put Function
@app.put("/transactions/{transaction_id}", response_model=TransactionModel)
async def update_transactions(
    transaction_id: int, transaction: TransactionBase, db: db_dependency
):
    db_transaction = (
        db.query(models.Transaction)
        .filter(models.Transaction.id == transaction_id)
        .first()
    )
    if not db_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    db_transaction.taskID = transaction.taskID
    db_transaction.name = transaction.name
    db_transaction.description = transaction.description
    db_transaction.dueDate = transaction.dueDate
    db_transaction.priority = transaction.priority

    db.commit()
    db.refresh(db_transaction)
    return db_transaction


# Delete Function
@app.delete("/transactions/{transaction_id}")
async def delete_transaction(transaction_id: int, db: db_dependency):
    db_transaction = (
        db.query(models.Transaction)
        .filter(models.Transaction.id == transaction_id)
        .first()
    )
    if not db_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    db.delete(db_transaction)
    db.commit()
    return {"message": f"Transaction{transaction_id} deleted successfully"}
