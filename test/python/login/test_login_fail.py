from utils.api_utils import send_request, Endpoint
from utils.random_utils import random_string
import pytest


@pytest.mark.parametrize(
    "user",
    [
        {"email": "user1@mail.ru", "password": "123"},
        {"email": "user2@mail.ru", "password": random_string()},
        {"email": "user3@mail.ru", "password": random_string()},
    ],
)
def test_login_with_wrong_password(user):
    response = send_request(Endpoint.login, method="POST", body=user)

    assert response.status_code == 422

    data = response.json()
    assert "fields" in data
    assert "password" in data["fields"]
    assert data["fields"]["password"] == "Неправильный логин или пароль"


@pytest.mark.parametrize(
    "user",
    [
        {"email": random_string(), "password": "string"},
        {"email": random_string(), "password": "123"},
        {"email": random_string(), "password": random_string()},
        {"email": "admin", "password": "123"},
    ],
)
def test_login_with_wrong_password(user):
    response = send_request(Endpoint.login, method="POST", body=user)

    assert response.status_code == 422
