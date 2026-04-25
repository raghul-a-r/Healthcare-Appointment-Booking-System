# openapi_client.AppointmentsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**book_appointment_appointments_post**](AppointmentsApi.md#book_appointment_appointments_post) | **POST** /appointments/ | Book Appointment
[**cancel_appointment_appointments_appointment_id_delete**](AppointmentsApi.md#cancel_appointment_appointments_appointment_id_delete) | **DELETE** /appointments/{appointment_id} | Cancel Appointment
[**get_slots_appointments_slots_doctor_id_get**](AppointmentsApi.md#get_slots_appointments_slots_doctor_id_get) | **GET** /appointments/slots/{doctor_id} | Get Slots


# **book_appointment_appointments_post**
> AppointmentResponse book_appointment_appointments_post(appointment_create)

Book Appointment

### Example


```python
import openapi_client
from openapi_client.models.appointment_create import AppointmentCreate
from openapi_client.models.appointment_response import AppointmentResponse
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
    api_instance = openapi_client.AppointmentsApi(api_client)
    appointment_create = openapi_client.AppointmentCreate() # AppointmentCreate | 

    try:
        # Book Appointment
        api_response = api_instance.book_appointment_appointments_post(appointment_create)
        print("The response of AppointmentsApi->book_appointment_appointments_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AppointmentsApi->book_appointment_appointments_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **appointment_create** | [**AppointmentCreate**](AppointmentCreate.md)|  | 

### Return type

[**AppointmentResponse**](AppointmentResponse.md)

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

# **cancel_appointment_appointments_appointment_id_delete**
> object cancel_appointment_appointments_appointment_id_delete(appointment_id)

Cancel Appointment

### Example


```python
import openapi_client
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
    api_instance = openapi_client.AppointmentsApi(api_client)
    appointment_id = 56 # int | 

    try:
        # Cancel Appointment
        api_response = api_instance.cancel_appointment_appointments_appointment_id_delete(appointment_id)
        print("The response of AppointmentsApi->cancel_appointment_appointments_appointment_id_delete:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AppointmentsApi->cancel_appointment_appointments_appointment_id_delete: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **appointment_id** | **int**|  | 

### Return type

**object**

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

# **get_slots_appointments_slots_doctor_id_get**
> List[SlotResponse] get_slots_appointments_slots_doctor_id_get(doctor_id, var_date)

Get Slots

### Example


```python
import openapi_client
from openapi_client.models.slot_response import SlotResponse
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
    api_instance = openapi_client.AppointmentsApi(api_client)
    doctor_id = 56 # int | 
    var_date = 'var_date_example' # str | 

    try:
        # Get Slots
        api_response = api_instance.get_slots_appointments_slots_doctor_id_get(doctor_id, var_date)
        print("The response of AppointmentsApi->get_slots_appointments_slots_doctor_id_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AppointmentsApi->get_slots_appointments_slots_doctor_id_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **doctor_id** | **int**|  | 
 **var_date** | **str**|  | 

### Return type

[**List[SlotResponse]**](SlotResponse.md)

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

