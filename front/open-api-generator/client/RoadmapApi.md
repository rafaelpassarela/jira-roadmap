# .RoadmapApi

All URIs are relative to *http://localhost:3030*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getDash**](RoadmapApi.md#getDash) | **PUT** /api/v1/dash | 
[**loadRoadmap**](RoadmapApi.md#loadRoadmap) | **GET** /api/v1/roadmap/{guid}/{itens} | 
[**removeShare**](RoadmapApi.md#removeShare) | **DELETE** /api/v1/roadmap/share | 
[**saveRoadmap**](RoadmapApi.md#saveRoadmap) | **POST** /api/v1/roadmap/ | 
[**share**](RoadmapApi.md#share) | **PUT** /api/v1/roadmap/share | 
[**syncRoadmapIssues**](RoadmapApi.md#syncRoadmapIssues) | **PUT** /api/v1/roadmap/{guid}/sync | 


# **getDash**
> GetDash200Response getDash(dashParamsModel)

Load a List of Roadmaps objects for current user.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .RoadmapApi(configuration);

let body:.RoadmapApiGetDashRequest = {
  // DashParamsModel
  dashParamsModel: {
    filter: {
      active: 0,
    },
  },
};

apiInstance.getDash(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dashParamsModel** | **DashParamsModel**|  |


### Return type

**GetDash200Response**

### Authorization

[bearerAuth](README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Roadmap list loaded successfully. |  -  |
**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **loadRoadmap**
> LoadRoadmap200Response loadRoadmap()

Load a Roadmap object by GUID.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .RoadmapApi(configuration);

let body:.RoadmapApiLoadRoadmapRequest = {
  // string | GUID of the Roadmap
  guid: "6c71d92e-1af3-4597-a51c-e7689334b7ab",
  // number | Load the Roadmap with the list of Issues (0-false/1-true).
  itens: 1,
};

apiInstance.loadRoadmap(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**string**] | GUID of the Roadmap | defaults to undefined
 **itens** | [**number**] | Load the Roadmap with the list of Issues (0-false/1-true). | defaults to undefined


### Return type

**LoadRoadmap200Response**

### Authorization

[bearerAuth](README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Roadmap created successfully. |  -  |
**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **removeShare**
> Share200Response removeShare(removeShareParam)

Remove the shared user from current roadmap by user email.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .RoadmapApi(configuration);

let body:.RoadmapApiRemoveShareRequest = {
  // RemoveShareParam
  removeShareParam: {
    guid: "455bbfd4-abcd-1234-8345-2d29d164699b",
    email: "john@test.com",
  },
};

apiInstance.removeShare(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **removeShareParam** | **RemoveShareParam**|  |


### Return type

**Share200Response**

### Authorization

[bearerAuth](README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **saveRoadmap**
> SaveRoadmap200Response saveRoadmap(roadmapModel)

Create or update a Roadmap object.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .RoadmapApi(configuration);

let body:.RoadmapApiSaveRoadmapRequest = {
  // RoadmapModel
  roadmapModel: {
    guid: "6c71d92e-1af3-4597-a51c-e7689334b7ab",
    name: "July 2024 - Roadmap",
    description: "This is a test description",
    startDate: "2024-07-01",
    endDate: "2024-07-31",
    active: true,
    level: 0,
    issues: [
      null,
    ],
    shares: [
      null,
    ],
  },
};

apiInstance.saveRoadmap(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **roadmapModel** | **RoadmapModel**|  |


### Return type

**SaveRoadmap200Response**

### Authorization

[bearerAuth](README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Roadmap created successfully. |  -  |
**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **share**
> Share200Response share(addShareParam)

Share the current roadmap with a new user by email.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .RoadmapApi(configuration);

let body:.RoadmapApiShareRequest = {
  // AddShareParam
  addShareParam: {
    guid: "455bbfd4-abcd-1234-8345-2d29d164699b",
    email: "john@test.com",
    readOnly: true,
  },
};

apiInstance.share(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **addShareParam** | **AddShareParam**|  |


### Return type

**Share200Response**

### Authorization

[bearerAuth](README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**404** | Not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **syncRoadmapIssues**
> LoadRoadmap200Response syncRoadmapIssues()

Synchronize Roadmap Issues with Jira (send Start/End date, get Issue details).

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .RoadmapApi(configuration);

let body:.RoadmapApiSyncRoadmapIssuesRequest = {
  // string | GUID of the Roadmap
  guid: "6c71d92e-1af3-4597-a51c-e7689334b7ab",
};

apiInstance.syncRoadmapIssues(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **guid** | [**string**] | GUID of the Roadmap | defaults to undefined


### Return type

**LoadRoadmap200Response**

### Authorization

[bearerAuth](README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Roadmap created successfully. |  -  |
**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


