# .IssueApi

All URIs are relative to *http://localhost:3030*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addIssue**](IssueApi.md#addIssue) | **POST** /api/v1/issue/{guid}/add | 
[**findIssues**](IssueApi.md#findIssues) | **PUT** /api/v1/issue/find | 
[**removeIssue**](IssueApi.md#removeIssue) | **DELETE** /api/v1/issue/{guid}/remove | 
[**updateIssue**](IssueApi.md#updateIssue) | **PUT** /api/v1/issue/{guid}/update | 


# **addIssue**
> AddIssue200Response addIssue(issueModel)

Add an Issue to a Roadmap.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .IssueApi(configuration);

let body:.IssueApiAddIssueRequest = {
  // string | GUID of the Roadmap
  guid: "6c71d92e-1af3-4597-a51c-e7689334b7ab",
  // IssueModel
  issueModel: {
    keyJira: "ABC-123",
    summary: "Check the new feature",
    status: "To Do",
    assignee: "John Wick",
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    issueType: "Task",
    icoUrl: "https://jira.com/ico.png",
    issueUrl: "https://jira.com/ABC-123",
    left: 175,
    top: 250,
    width: 145,
    css: "done",
    exists: true,
  },
};

apiInstance.addIssue(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **issueModel** | **IssueModel**|  |
 **guid** | [**string**] | GUID of the Roadmap | defaults to undefined


### Return type

**AddIssue200Response**

### Authorization

[bearerAuth](README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Issue added successfully. |  -  |
**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **findIssues**
> FindIssues200Response findIssues(findIssueModel)

Load a List of Issues objects for current user.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .IssueApi(configuration);

let body:.IssueApiFindIssuesRequest = {
  // FindIssueModel
  findIssueModel: {
    guid: "455bbfd4-abcd-1234-8345-2d29d164699b",
    filter: "project in (TES, ABC) or Key = XYZ-123",
    subTasks: true,
  },
};

apiInstance.findIssues(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **findIssueModel** | **FindIssueModel**|  |


### Return type

**FindIssues200Response**

### Authorization

[bearerAuth](README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Issue list loaded successfully. |  -  |
**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **removeIssue**
> void removeIssue(body)

Remove an Issue from Roadmap.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .IssueApi(configuration);

let body:.IssueApiRemoveIssueRequest = {
  // string | GUID of the Roadmap
  guid: "6c71d92e-1af3-4597-a51c-e7689334b7ab",
  // string | Issue Key
  body: "ABC-1234",
};

apiInstance.removeIssue(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **string**| Issue Key |
 **guid** | [**string**] | GUID of the Roadmap | defaults to undefined


### Return type

**void**

### Authorization

[bearerAuth](README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: text/plain
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateIssue**
> AddIssue200Response updateIssue(updateIssueModel)

Update the Start and End date of a Roadmap Issue, and vertical pos.

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .IssueApi(configuration);

let body:.IssueApiUpdateIssueRequest = {
  // string | GUID of the Roadmap
  guid: "6c71d92e-1af3-4597-a51c-e7689334b7ab",
  // UpdateIssueModel
  updateIssueModel: {
    key: "ABC-1234",
    top: 250,
    left: 10,
    width: 150,
  },
};

apiInstance.updateIssue(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateIssueModel** | **UpdateIssueModel**|  |
 **guid** | [**string**] | GUID of the Roadmap | defaults to undefined


### Return type

**AddIssue200Response**

### Authorization

[bearerAuth](README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Issue added successfully. |  -  |
**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


