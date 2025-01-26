import pytest
from fastapi.testclient import TestClient
from main import app
from FastAPI.tests.test_utils import apply_test_dependencies, get_test_client, dbTest


# Create Transaction Test
def test_create_transaction(dbTest):
    # Apply test dependencies to override the DB dependency
    apply_test_dependencies()

    # Create a TestClient instance to interact with FastAPI
    client = get_test_client()
    transaction_data = {
        "name": "Test Transaction",
        "description": " A Test Transaction",
        "dueDate": "2025-12-21T12:00:00",
        "priority": True,
    }

    # Post request
    create_response = client.post("/transactions/", json=transaction_data)
    assert create_response.status_code == 200
    data = create_response.json()
    assert data["name"] == transaction_data["name"]
    assert data["description"] == transaction_data["description"]
    assert data["priority"] == transaction_data["priority"]


# Test Read Transaction
def test_read_transaction(dbTest):
    # Apply test dependencies to override the DB dependency
    apply_test_dependencies()

    # Create a TestClient instance to interact with FastAPI
    client = get_test_client()
    # Creating Transaction
    transaction_data = {
        "name": "Read Test Transaction",
        "description": " A Test Transaction",
        "dueDate": "2025-12-21T12:00:00",
        "priority": True,
    }
    client.post("/transactions/", json=transaction_data)

    # Get Request and assert response is successful
    response = client.get("/transactions/")
    assert response.status_code == 200

    # Check if transaction is returned in list
    data = response.json()
    assert len(data) > 0
    assert any(t["name"] == "Read Test Transaction" for t in data)


# Single Transaction test
def test_read_single_transaction(dbTest):
    # Apply test dependencies to override the DB dependency
    apply_test_dependencies()

    # Create a TestClient instance to interact with FastAPI
    client = get_test_client()
    # First, create a transaction to retrieve later
    transaction_data = {
        "name": "Single Transaction Test",
        "description": "Transaction to test GET by ID",
        "dueDate": "2025-11-01T10:00:00",
        "priority": True,
    }
    create_response = client.post("/transactions/", json=transaction_data)
    transaction_id = create_response.json()["id"]

    # Get Request and assert response ==200
    response = client.get(f"/transactions/{transaction_id}")
    assert response.status_code == 200

    # Verify the returned data matches the created transaction
    data = response.json()
    assert data["name"] == transaction_data["name"]
    assert data["description"] == transaction_data["description"]


# Test Update Transaction
def test_update_transaction(dbTest):
    # Apply test dependencies to override the DB dependency
    apply_test_dependencies()

    # Create a TestClient instance to interact with FastAPI
    client = get_test_client()
    # Create a transaction first to update later
    transaction_data = {
        "name": "Update Test Transaction",
        "description": "This transaction will be updated",
        "dueDate": "2025-10-20T15:00:00",
        "priority": True,
    }
    create_response = client.post("/transactions/", json=transaction_data)
    transaction_id = create_response.json()["id"]

    # Define the updated transaction data
    updated_data = {
        "name": "Updated Transaction Name",
        "description": "Updated transaction description",
        "dueDate": "2025-10-21T16:00:00",
        "priority": False,
    }

    # Put request and assert response == 200
    update_response = client.put(f"/transactions/{transaction_id}", json=updated_data)
    assert update_response.status_code == 200

    # Verify the returned data has been updated
    data = update_response.json()
    assert data["name"] == updated_data["name"]
    assert data["description"] == updated_data["description"]
    assert data["priority"] == updated_data["priority"]


# Test Delete Transaction
def test_delete_transaction(dbTest):
    # Apply test dependencies to override the DB dependency
    apply_test_dependencies()

    # Create a TestClient instance to interact with FastAPI
    client = get_test_client()
    # Create a transaction first to delete later
    transaction_data = {
        "name": "Delete Test Transaction",
        "description": "This transaction will be deleted",
        "dueDate": "2025-09-20T14:00:00",
        "priority": False,
    }
    create_response = client.post("/transactions/", json=transaction_data)
    transaction_id = create_response.json()["id"]

    # Delete request and assert response == 200
    delete_response = client.delete(f"/transactions/{transaction_id}")
    assert delete_response.status_code == 200

    # Verify that the transaction is no longer in the database
    get_response = client.get(f"/transactions/{transaction_id}")
    assert get_response.status_code == 404  # Should return 404 as it is deleted
