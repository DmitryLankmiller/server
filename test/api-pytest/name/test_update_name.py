from utils.api_utils import send_request, Endpoint
from utils.random_utils import random_list_of_strings
import pytest


@pytest.mark.parametrize(
    "new_name",
    [
        "Cat",
        "The Big Cat",
        "123",
        "-3.14" "!@#$%^&*()}{[/\\]",
    ]
    + random_list_of_strings(),
)
def test_update_name(new_name, auth_header):
    body = {"name": new_name}
    response = send_request(
        Endpoint.name, method="PATCH", body=body, headers=auth_header
    )

    assert response.status_code == 200

    data = response.json()
    assert "user" in data
    assert data["user"]["name"] == new_name

