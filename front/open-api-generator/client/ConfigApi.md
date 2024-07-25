# .ConfigApi

All URIs are relative to *http://localhost:3030*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getConfig**](ConfigApi.md#getConfig) | **POST** /api/v1/config/get/{id} | 
[**getConfigList**](ConfigApi.md#getConfigList) | **POST** /api/v1/config/get | 


# **getConfig**
> GetConfig200Response getConfig()

Returns the requested configuration values. Note that if the ID field returns 0 (zero), it indicates that the configuration <b>was not found</b>.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .ConfigApi(configuration);

let body:.ConfigApiGetConfigRequest = {
  // number | Parameter referring to the configuration ID
  id: 1,
};

apiInstance.getConfig(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Parameter referring to the configuration ID | defaults to undefined


### Return type

**GetConfig200Response**

### Authorization

[bearerAuth](README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**400** | Bad Request |  -  |
**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getConfigList**
> GetConfigList200Response getConfigList(getConfigParam)

Returns a list with the requested configuration values.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .ConfigApi(configuration);

let body:.ConfigApiGetConfigListRequest = {
  // GetConfigParam
  getConfigParam: {
    idList: [1,2,3],
  },
};

apiInstance.getConfigList(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **getConfigParam** | **GetConfigParam**|  |


### Return type

**GetConfigList200Response**

### Authorization

[bearerAuth](README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**400** | Bad Request |  -  |
**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


