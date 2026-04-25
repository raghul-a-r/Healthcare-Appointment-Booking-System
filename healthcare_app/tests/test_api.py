import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(__file__)))


import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


# ------------------------
# 1. TEST DOCTORS
# ------------------------

def test_get_doctors():
    response = client.get("/doctors/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


# ------------------------
# 2. TEST VALID BOOKING
# ------------------------

def test_valid_booking():
    payload = {
        "doctor_id": 1,
        "patient_name": "John Doe",
        "slot": "2026-04-28T10:00:00"
    }

    response = client.post("/appointments/", json=payload)

    assert response.status_code == 200
    assert response.json()["doctor_id"] == 1


# ------------------------
# 3. TEST DOUBLE BOOKING
# ------------------------

def test_double_booking():
    payload = {
        "doctor_id": 1,
        "patient_name": "Alice",
        "slot": "2026-04-28T11:00:00"
    }

    # First booking
    client.post("/appointments/", json=payload)

    # Second booking (same slot)
    response = client.post("/appointments/", json=payload)

    assert response.status_code == 400
    assert "already booked" in response.json()["detail"].lower()


# ------------------------
# 4. TEST INVALID NAME
# ------------------------

def test_invalid_patient_name():
    payload = {
        "doctor_id": 1,
        "patient_name": "12345",   # invalid
        "slot": "2026-04-28T12:00:00"
    }

    response = client.post("/appointments/", json=payload)

    assert response.status_code == 422


# ------------------------
# 5. TEST SLOT API
# ------------------------

def test_get_slots():
    response = client.get("/appointments/slots/1?date=2026-04-28")

    assert response.status_code == 200
    assert isinstance(response.json(), list)