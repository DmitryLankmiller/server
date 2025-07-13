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
def test_update_name(new_name):
    body = {"name": new_name}
    response = send_request(Endpoint.name, method="PATCH", body=body)

    assert response.status_code == 401

    data = response.json()
    assert "message" in data
    assert data["message"] == "Authorization header required"
