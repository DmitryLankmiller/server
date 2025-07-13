from utils.api_utils import send_request, Endpoint
import pytest


@pytest.mark.parametrize("email", ["user1@mail.ru", "user2@mail.ru", "user3@mail.ru"])
def test_user_exist(email):
    body = {"email": email}
    response = send_request(Endpoint.exist, method="POST", body=body)

    assert response.status_code == 200

    data = response.json()
    assert data["exist"] == True
