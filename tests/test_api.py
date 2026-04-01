import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_generate_questions():
    payload = {
        "text": "Software testing is a process.",
        "question_type": "mcq",
        "count": 1
    }
    response = client.post("/generate", json=payload)
    assert response.status_code == 200
    assert "questions" in response.json()
    assert isinstance(response.json()["questions"], list)

def test_study_plan():
    payload = {
        "text": "Software testing syllabus.",
        "weeks": 2,
        "weak_topics": ["unit testing"]
    }
    response = client.post("/study-plan", json=payload)
    assert response.status_code == 200
    assert "plan" in response.json()
    assert isinstance(response.json()["plan"], str)
