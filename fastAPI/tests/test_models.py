# Imports
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from FastAPI.tests.test_utils import apply_test_dependencies, get_test_client, dbTest


# Example Unit Test - Create a Transaction and verify if it's added
def test_create_transaction(dbTest):
    # Apply test dependencies to override the DB dependency
    apply_test_dependencies()

    # Create a TestClient instance to interact with FastAPI
    client = get_test_client()
    # Define the data you want to send in your POST request
    transaction_data = {
        "taskID": 1,
        "name": "Test Transaction",
        "description": "A transaction to test the create operation",
        "dueDate": "2025-12-31T12:00:00",
        "priority": True,
    }

    # Make a POST request to create a transaction
    response = client.post("/transactions/", json=transaction_data)

    # Check if the response status code is 200
    assert response.status_code == 200

    # Verify the returned data matches what was sent
    data = response.json()
    assert data["taskID"] == transaction_data["taskID"]
    assert data["name"] == transaction_data["name"]
    assert data["description"] == transaction_data["description"]
    assert data["priority"] == transaction_data["priority"]


# Example Unit Test - Read all transactions
def test_read_transactions(dbTest):
    # Apply test dependencies to override the DB dependency
    apply_test_dependencies()

    # Create a TestClient instance to interact with FastAPI
    client = get_test_client()
    # First, create a transaction to read later
    transaction_data = {
        "taskID": 1,
        "name": "Read Test Transaction",
        "description": "Transaction for reading",
        "dueDate": "2025-11-30T10:00:00",
        "priority": False,
    }
    client.post("/transactions/", json=transaction_data)

    # Make a GET request to retrieve transactions
    response = client.get("/transactions/")

    # Assert the response is successful (status code 200)
    assert response.status_code == 200

    # Check if the created transaction is returned in the list
    data = response.json()
    assert len(data) > 0
    assert any(t["name"] == "Read Test Transaction" for t in data)


# Example Unit Test - Read a single transaction by ID
def test_read_single_transaction(dbTest):
    # Apply test dependencies to override the DB dependency
    apply_test_dependencies()

    # Create a TestClient instance to interact with FastAPI
    client = get_test_client()
    # First, create a transaction to retrieve later
    transaction_data = {
        "taskID": 1,
        "name": "Single Transaction Test",
        "description": "Transaction to test GET by ID",
        "dueDate": "2025-11-01T10:00:00",
        "priority": True,
    }
    create_response = client.post("/transactions/", json=transaction_data)
    transaction_id = create_response.json()["id"]

    # Make a GET request to retrieve this specific transaction
    response = client.get(f"/transactions/{transaction_id}")

    # Assert the response is successful
    assert response.status_code == 200

    # Verify the returned data matches the created transaction
    data = response.json()
    assert data["name"] == transaction_data["name"]
    assert data["description"] == transaction_data["description"]


# Example Integration Test - Update a transaction
def test_update_transaction(dbTest):
    # Apply test dependencies to override the DB dependency
    apply_test_dependencies()

    # Create a TestClient instance to interact with FastAPI
    client = get_test_client()
    # Create a transaction first to update later
    transaction_data = {
        "taskID": 1,
        "name": "Update Test Transaction",
        "description": "This transaction will be updated",
        "dueDate": "2025-10-20T15:00:00",
        "priority": True,
    }
    create_response = client.post("/transactions/", json=transaction_data)
    transaction_id = create_response.json()["id"]

    # Define the updated transaction data
    updated_data = {
        "taskID": 2,
        "name": "Updated Transaction Name",
        "description": "Updated transaction description",
        "dueDate": "2025-10-21T16:00:00",
        "priority": False,
    }

    # Make a PUT request to update the transaction
    update_response = client.put(f"/transactions/{transaction_id}", json=updated_data)

    # Assert the response is successful
    assert update_response.status_code == 200

    # Verify the returned data has been updated
    data = update_response.json()
    assert data["taskID"] == updated_data["taskID"]
    assert data["name"] == updated_data["name"]
    assert data["description"] == updated_data["description"]
    assert data["priority"] == updated_data["priority"]


# Example Integration Test - Delete a transaction
def test_delete_transaction(dbTest):
    # Apply test dependencies to override the DB dependency
    apply_test_dependencies()

    # Create a TestClient instance to interact with FastAPI
    client = get_test_client()
    # Create a transaction first to delete later
    transaction_data = {
        "taskID": 1,
        "name": "Delete Test Transaction",
        "description": "This transaction will be deleted",
        "dueDate": "2025-09-20T14:00:00",
        "priority": False,
    }
    create_response = client.post("/transactions/", json=transaction_data)
    transaction_id = create_response.json()["id"]

    # Make a DELETE request to delete the transaction
    delete_response = client.delete(f"/transactions/{transaction_id}")

    # Assert the response is successful
    assert delete_response.status_code == 200

    # Verify that the transaction is no longer in the database
    get_response = client.get(f"/transactions/{transaction_id}")
    assert get_response.status_code == 404  # Should return 404 as it is deleted
