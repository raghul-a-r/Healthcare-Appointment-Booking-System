from openapi_client import ApiClient, Configuration
from openapi_client.api.doctors_api import DoctorsApi

# Set API base URL
config = Configuration(
    host="http://127.0.0.1:8000"
)

client = ApiClient(config)
api = DoctorsApi(client)

doctors = api.list_doctors_doctors_get()

print(doctors)