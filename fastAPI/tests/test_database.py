import pytest
from sqlalchemy.exc import OperationalError
from database import engine, URL_DATABASE

# Test URL_DATABASE is valid
def test_datbase_url():
  assert "sqlite:///" in URL_DATABASE, "Databse URL must be SQLite"

# Test engine can connect to database
def test_engine_connection():
  try:
    #Connect to database
    with engine.connect() as connection:
      assert connection.closed == False, "Connection should be open."
  except OperationalError:
    pytest.fail("Engine failed to connect to database")

# Test that engine can be disposed without errors
def test_engine_dispose():
  try: 
    engine.dispose()
    assert True # no exception means test has passed
  except Exception as e:
    pytest.fail("Engine disposal failed: {e}")
