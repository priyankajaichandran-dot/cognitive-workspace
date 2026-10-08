import pytest
from fastapi.testclient import TestClient
from .main import app

client = TestClient(app)

def test_protected_route_without_token():
    response = client.get("/")
    assert response.status_code in [401, 403, 404]

def test_protected_route_with_invalid_token():
    response = client.get(
        "/",
        headers={"Authorization": "Bearer invalid_token_123"}
    )
    assert response.status_code in [401, 403, 404]