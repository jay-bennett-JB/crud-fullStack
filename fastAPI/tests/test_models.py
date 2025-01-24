import pytest
from sqlalchemy.orm import Session
from testing_db import TestingSessionLocal, engine
from models import Transaction

# Fixture to provide a fresh database session for each test
@pytest.fixture(scope="function")
def db_session():
  # Create new Session
  session = TestingSessionLocal()
  yield session
  # Rollback changes after each test
  session.rollback()
  session.close()

#Testing create_transaction
def test_create_transaction(db_session: Session):
  #Arrange
  transaction = Transaction( 
    name="Test Task", 
    description="A test Transaction", 
    dueDate="2025-01-30 12:00:00", 
    priority=True,
    )
  
  #Act
  db_session.add(transaction)
  db_session.commit
  db_session.refresh(transaction)
  
  #Assert
  assert transaction.id is not None
  assert transaction.name =="Test Task"
  assert transaction.priority is True

#Testing read_transaction
def test_read_transaction(db_session: Session):
  #Arrange
  transaction = Transaction( 
    name="Read Task", 
    description="A test read operation", 
    dueDate="2025-01-30 12:00:00", 
    priority=False,
    )
  db_session.add(transaction)
  db_session.commit()
  db_session.refresh(transaction)

  #Act
  fetched_transaction = db_session.query(Transaction).filter(Transaction.name =="Read Task").first()

  #Assert
  assert fetched_transaction is not None
  assert fetched_transaction.description == "Test read operation"

#Testing update_transaction
def test_update_transaction(db_session: Session):
  #Arrange
  transaction = Transaction( 
    name="Update Task", 
    description="A test update operation", 
    dueDate="2025-01-30 12:00:00", 
    priority=False,
    )
  db_session.add(transaction)
  db_session.commit()
  db_session.refresh(transaction)

  #Act
  transaction.description ="Updated description"
  db_session.commit()
  db_session.refresh(transaction)

  #Assert
  assert transaction.description == "Updated description"

#Testing delete_transaction
def test_delete_transaction(db_session: Session):
  #Arrange
  transaction = Transaction( 
    name="Delete Task", 
    description="A test delete operation", 
    dueDate="2025-01-30 12:00:00", 
    priority=False,
    )

  db_session.add(transaction)
  db_session.commit
  db_session.refresh(transaction)

  #Act
  db_session.delete(transaction)
  db_session.commit()

  #Assert
  deleted_transaction =db_session.query(Transaction).filter(Transaction.name == "Delete Task").first()
  assert deleted_transaction is None
  