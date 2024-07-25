# .TestApi

All URIs are relative to *http://localhost:3030*

Method | HTTP request | Description
------------- | ------------- | -------------
[**testApi**](TestApi.md#testApi) | **GET** /api/v1/test | API Communication Test, should return a JSON


# **testApi**
> TestApi200Response testApi()

Returns a simple Ok message for API Connectivity test.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .TestApi(configuration);

let body:any = {};

apiInstance.testApi(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**TestApi200Response**

### Authorization

[bearerAuth](README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |
**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


