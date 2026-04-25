# SlotResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**slot** | **datetime** |  | 
**is_booked** | **bool** |  | 
**patient_name** | **str** |  | [optional] 

## Example

```python
from openapi_client.models.slot_response import SlotResponse

# TODO update the JSON string below
json = "{}"
# create an instance of SlotResponse from a JSON string
slot_response_instance = SlotResponse.from_json(json)
# print the JSON string representation of the object
print(SlotResponse.to_json())

# convert the object into a dict
slot_response_dict = slot_response_instance.to_dict()
# create an instance of SlotResponse from a dict
slot_response_from_dict = SlotResponse.from_dict(slot_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


