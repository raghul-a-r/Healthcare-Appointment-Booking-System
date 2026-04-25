# openapi_client.DoctorsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**add_doctor_doctors_post**](DoctorsApi.md#add_doctor_doctors_post) | **POST** /doctors/ | Add Doctor
[**list_doctors_doctors_get**](DoctorsApi.md#list_doctors_doctors_get) | **GET** /doctors/ | List Doctors


# **add_doctor_doctors_post**
> DoctorResponse add_doctor_doctors_post(doctor_create)

Add Doctor

### Example


```python
import openapi_client
from openapi_client.models.doctor_create import DoctorCreate
from openapi_client.models.doctor_response import DoctorResponse
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DoctorsApi(api_client)
    doctor_create = openapi_client.DoctorCreate() # DoctorCreate | 

    try:
        # Add Doctor
        api_response = api_instance.add_doctor_doctors_post(doctor_create)
        print("The response of DoctorsApi->add_doctor_doctors_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DoctorsApi->add_doctor_doctors_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **doctor_create** | [**DoctorCreate**](DoctorCreate.md)|  | 

### Return type

[**DoctorResponse**](DoctorResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_doctors_doctors_get**
> List[DoctorResponse] list_doctors_doctors_get(specialization=specialization)

List Doctors

### Example


```python
import openapi_client
from openapi_client.models.doctor_response import DoctorResponse
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DoctorsApi(api_client)
    specialization = 'specialization_example' # str |  (optional)

    try:
        # List Doctors
        api_response = api_instance.list_doctors_doctors_get(specialization=specialization)
        print("The response of DoctorsApi->list_doctors_doctors_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DoctorsApi->list_doctors_doctors_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **specialization** | **str**|  | [optional] 

### Return type

[**List[DoctorResponse]**](DoctorResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

