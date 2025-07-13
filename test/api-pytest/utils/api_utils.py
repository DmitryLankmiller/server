import requests
from enum import Enum

BASE_URL = "http://localhost:3000/"


class Endpoint(Enum):
    exist = "exist"
    name = "user/name"
    login = "auth/login"


def send_request(
    endpoint: Endpoint, method: str = "GET", headers: dict = None, body=None
):
    return requests.request(
        method=method, url=BASE_URL + endpoint.value, headers=headers, data=body,json=body
    )
