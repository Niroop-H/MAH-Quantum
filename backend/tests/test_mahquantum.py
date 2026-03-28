"""MAH Quantum API Tests - backend endpoints"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealth:
    def test_api_root(self):
        r = requests.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data

class TestContact:
    def test_post_contact(self):
        payload = {
            "name": "TEST_User",
            "email": "test@example.com",
            "company": "TEST_Corp",
            "industry": "Technology",
            "message": "This is a test message"
        }
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["name"] == "TEST_User"
        assert data["email"] == "test@example.com"
        assert data["company"] == "TEST_Corp"
        assert "id" in data
        assert "timestamp" in data

    def test_get_contacts(self):
        r = requests.get(f"{BASE_URL}/api/contact")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)

    def test_contact_missing_fields(self):
        r = requests.post(f"{BASE_URL}/api/contact", json={"name": "Only Name"})
        assert r.status_code == 422

    def test_status_post_and_get(self):
        r = requests.post(f"{BASE_URL}/api/status", json={"client_name": "TEST_client"})
        assert r.status_code == 200
        data = r.json()
        assert data["client_name"] == "TEST_client"

        r2 = requests.get(f"{BASE_URL}/api/status")
        assert r2.status_code == 200
        assert isinstance(r2.json(), list)
