# Imports
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Transaction
from fastapi.testclient import TestClient


# Configure in-memory SQLite database for testing
SQLALCHEMY_URL_TEST_DATABASE = "sqlite:///:memory:"
# Create a new engine and session for testing
test_engine = create_engine(
    SQLALCHEMY_URL_TEST_DATABASE, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture(scope="session", autouse=True)
def test_db_creation():
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)


# Override dependency to use test database


def override_get_db():
    print("Using Test DB")
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        print("Rolling Back")
        db.rollback()
        db.close()


def apply_test_dependencies():
    from main import app

    app.dependency_overrides = {override_get_db}
    print(f"Using test database: {SQLALCHEMY_URL_TEST_DATABASE}")


def get_test_client():
    from main import app

    return TestClient(app)
