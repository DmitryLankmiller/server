import pytest

from utils.api_utils import Endpoint, send_request

noname_user = {"email": "noname@mail.ru", "password": "noname"}


@pytest.fixture(scope="session")
def auth_header():
    response = send_request(Endpoint.login, method="POST", body=noname_user)

    token = response.json()["token"]
    return {"Authorization": f"Bearer {token}"}
