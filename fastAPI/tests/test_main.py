import pytest
from fastapi.testclient import TestClient
from main import app
from database import Base
from tests.testing_db import TestingSessionLocal, engine
from main import get_db
from sqlalchemy import inspect


# Creating tables for testing
@pytest.fixture(scope="module", autouse=True)
def setup_test_db():
    print("Database URL:", engine.url)
    Base.metadata.create_all(bind=engine)
    print("Table in Database: ", inspect(engine).get_table_names())
    yield
    Base.metadata.drop_all(bind=engine)


# Override dependency to use test database
def override_get_db():
    print("Using Test DB")
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


# Fixture for FASTAPI test client
@pytest.fixture(scope="module")
def client():
    return TestClient(app)


# Create Transaction Test
def test_create_transaction(client):
    response = client.post(
        "/transactions/",
        json={
            "name": "Test Transaction",
            "description": " A Test Transaction",
            "dueDate": "2025-12-21T12:00:00",
            "priority": True,
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Transaction"
    assert data["priority"] is True


# Test Read Transaction
def test_read_transaction(client):
    # Creating Transaction
    client.post(
        "/transactions/",
        json={
            "name": "Test Read Transaction",
            "description": "To be read",
            "dueDate": "2025-12-21T12:00:00",
            "priority": False,
        },
    )
    # Read operation test
    response = client.get("/transactions/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert data[0]["name"] == "Test Read Transaction"


# Test Update Transaction
def test_update_transaction(client):
    # Create a Transaction
    response = client.post(
        "/transactions/",
        json={
            "name": "Inital Name Transaction",
            "description": "To be updated",
            "dueDate": "2025-12-21T12:00:00",
            "priority": True,
        },
    )
    transaction_id = response.json()["id"]
    update_response = client.put(
        f"/transactions/{transaction_id}",
        json={
            "name": "Updated Transaction",
            "description": "Updated Descirption",
            "dueDate": "2024-12-21T12:00:00",
            "priority": False,
        },
    )
    assert update_response.status_code == 200
    data = update_response.json()
    assert data["name"] == "Updated Transaction"
    assert data["priority"] is False


# Test Delete Transaction
def test_delete_transaction(client):
    # Create a Transaction
    response = client.post(
        "/transactions/",
        json={
            "name": "Transaction to Delete",
            "description": "To be deleted",
            "dueDate": "2025-12-31T12:00:00",
            "priority": True,
        },
    )
    transaction_id = response.json()["id"]

    # Delete Operation
    delete_response = client.delete(f"/transactions/{transaction_id}/")
    assert delete_response.status_code == 200

    # Verification that the above no longer exists
    get_response = client.get("/transactions/")
    data = get_response.json()
    assert all(t["id"] != transaction_id for t in data)
