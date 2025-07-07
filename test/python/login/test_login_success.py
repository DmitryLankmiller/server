from utils.api_utils import send_request, Endpoint
import pytest


@pytest.mark.parametrize(
    "user",
    [
        {"email": "user1@mail.ru", "password": "string"},
        {"email": "user2@mail.ru", "password": "string"},
        {"email": "user3@mail.ru", "password": "string"},
    ],
)
def test_login_success(user):
    response = send_request(Endpoint.login, method="POST", body=user)

    assert response.status_code == 200

    data = response.json()
    assert "token" in data
    assert "user" in data
    assert data["user"]["email"] == user["email"]
