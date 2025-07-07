from utils.api_utils import send_request, Endpoint
from utils.random_utils import random_list_of_strings
import pytest


@pytest.mark.parametrize(
    "email",
    ["non-existing-mail@mail.ru", "😀", "", "-3.14", "$#!@%^&*()[]}{\\/?"]
    + random_list_of_strings(),
)
def test_user_not_exist(email):
    body = {"email": email}
    response = send_request(Endpoint.exist, method="POST", body=body)

    assert response.status_code == 200

    data = response.json()
    assert data["exist"] == False
