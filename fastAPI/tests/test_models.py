import pytest
from datetime import datetime
from tests.testing_db import TestingSessionLocal, engine
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


# Testing create_transaction
def test_create_transaction(db_session):
    transaction_data = {
        "name": "Test Transaction",
        "description": "Test description",
        "dueDate": datetime(2023, 12, 31, 12, 0),
        "priority": True,
    }
    # Arrange
    transaction = Transaction(**transaction_data)
    # Act
    db_session.add(transaction)
    db_session.commit()
    db_session.refresh(transaction)

    # Assert
    assert transaction.name == "Test Transaction"
    assert transaction.description == "Test description"
    assert transaction.dueDate == datetime(2023, 12, 31, 12, 0)
    assert transaction.priority is True


# Testing read_transaction
def test_read_transaction(db_session):
    # Arrange
    transaction_data = {
        "name": "Test Read",
        "description": "Test read operation",
        "dueDate": datetime(2023, 12, 31, 12, 0),
        "priority": False,
    }

    transaction = Transaction(**transaction_data)
    db_session.add(transaction)
    db_session.commit()
    db_session.refresh(transaction)

    # Act
    fetched_transaction = (
        db_session.query(Transaction).filter(Transaction.name == "Test Read").first()
    )

    # Assert
    assert fetched_transaction.name == "Test Read"
    assert fetched_transaction.description == "Test read operation"


# Testing update_transaction
def test_update_transaction(db_session):

    # Arrange: Create a new transaction
    transaction = Transaction(
        name="Test Update",
        description="Initial description",
        dueDate=datetime(2023, 12, 31, 12, 0),
        priority=True,
    )
    db_session.add(transaction)
    db_session.commit()
    db_session.refresh(transaction)
    # Act
    transaction.description = "Updated description"
    db_session.commit()
    db_session.refresh(transaction)
    # Anssert
    assert transaction.description == "Updated description"


# Testing delete_transaction
def test_delete_transaction(db_session):
    # Arrange
    transaction = Transaction(
        name="Test Delete",
        description="Delete this transaction",
        dueDate=datetime(2023, 12, 31, 12, 0),
        priority=False,
    )
    db_session.add(transaction)
    db_session.commit()
    db_session.refresh(transaction)

    # Act
    db_session.delete(transaction)
    db_session.commit()

    # Assert
    deleted_transaction = (
        db_session.query(Transaction).filter(Transaction.name == "Test Delete").first()
    )
    assert deleted_transaction is None
