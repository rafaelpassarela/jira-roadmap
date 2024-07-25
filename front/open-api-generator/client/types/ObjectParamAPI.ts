import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

import { AddIssue200Response } from '../models/AddIssue200Response';
import { AddShareParam } from '../models/AddShareParam';
import { CodeLogin200Response } from '../models/CodeLogin200Response';
import { CodeLogin401Response } from '../models/CodeLogin401Response';
import { CodeLoginParam } from '../models/CodeLoginParam';
import { ConfigItem } from '../models/ConfigItem';
import { ConfigList } from '../models/ConfigList';
import { ConfigListListInner } from '../models/ConfigListListInner';
import { DashParamsModel } from '../models/DashParamsModel';
import { DashParamsModelFilter } from '../models/DashParamsModelFilter';
import { ErrorMessageModel } from '../models/ErrorMessageModel';
import { ErrorModel } from '../models/ErrorModel';
import { FindIssueModel } from '../models/FindIssueModel';
import { FindIssues200Response } from '../models/FindIssues200Response';
import { GetConfig200Response } from '../models/GetConfig200Response';
import { GetConfigList200Response } from '../models/GetConfigList200Response';
import { GetConfigParam } from '../models/GetConfigParam';
import { GetDash200Response } from '../models/GetDash200Response';
import { GetProjects200Response } from '../models/GetProjects200Response';
import { IssueModel } from '../models/IssueModel';
import { IssueModelList } from '../models/IssueModelList';
import { IssueModelListListInner } from '../models/IssueModelListListInner';
import { LoadRoadmap200Response } from '../models/LoadRoadmap200Response';
import { ProjectConfigModel } from '../models/ProjectConfigModel';
import { ProjectConfigModelList } from '../models/ProjectConfigModelList';
import { ProjectConfigModelListListInner } from '../models/ProjectConfigModelListListInner';
import { RemoveShareParam } from '../models/RemoveShareParam';
import { RemoveTokenJira401Response } from '../models/RemoveTokenJira401Response';
import { RemoveTokenJira404Response } from '../models/RemoveTokenJira404Response';
import { RoadmapModel } from '../models/RoadmapModel';
import { RoadmapModelList } from '../models/RoadmapModelList';
import { RoadmapModelListListInner } from '../models/RoadmapModelListListInner';
import { RoadmapModelSharesInner } from '../models/RoadmapModelSharesInner';
import { SaveProject200Response } from '../models/SaveProject200Response';
import { SaveRoadmap200Response } from '../models/SaveRoadmap200Response';
import { SendCodeParam } from '../models/SendCodeParam';
import { Share200Response } from '../models/Share200Response';
import { ShareModel } from '../models/ShareModel';
import { ShareModelList } from '../models/ShareModelList';
import { TestApi200Response } from '../models/TestApi200Response';
import { TestModel } from '../models/TestModel';
import { TokenResult } from '../models/TokenResult';
import { TokenResultUser } from '../models/TokenResultUser';
import { UpdateIssueModel } from '../models/UpdateIssueModel';
import { UserModel } from '../models/UserModel';
import { UserValidationParam } from '../models/UserValidationParam';
import { UserValidationResult } from '../models/UserValidationResult';
import { Validate200Response } from '../models/Validate200Response';
import { WhoAmI200Response } from '../models/WhoAmI200Response';
import { WhoAmI401Response } from '../models/WhoAmI401Response';

import { ObservableAuthApi } from "./ObservableAPI";
import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";

export interface AuthApiCodeLoginRequest {
    /**
     * 
     * @type CodeLoginParam
     * @memberof AuthApicodeLogin
     */
    codeLoginParam: CodeLoginParam
}

export interface AuthApiValidateTokenRequest {
}

export interface AuthApiWhoAmIRequest {
}

export class ObjectAuthApi {
    private api: ObservableAuthApi

    public constructor(configuration: Configuration, requestFactory?: AuthApiRequestFactory, responseProcessor?: AuthApiResponseProcessor) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Performs user login based on the code sent by email. Returns authentication data in case of success
     * @param param the request object
     */
    public codeLoginWithHttpInfo(param: AuthApiCodeLoginRequest, options?: Configuration): Promise<HttpInfo<CodeLogin200Response>> {
        return this.api.codeLoginWithHttpInfo(param.codeLoginParam,  options).toPromise();
    }

    /**
     * Performs user login based on the code sent by email. Returns authentication data in case of success
     * @param param the request object
     */
    public codeLogin(param: AuthApiCodeLoginRequest, options?: Configuration): Promise<CodeLogin200Response> {
        return this.api.codeLogin(param.codeLoginParam,  options).toPromise();
    }

    /**
     * Returns 200 for a valid token, otherwise 401.
     * @param param the request object
     */
    public validateTokenWithHttpInfo(param: AuthApiValidateTokenRequest = {}, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.validateTokenWithHttpInfo( options).toPromise();
    }

    /**
     * Returns 200 for a valid token, otherwise 401.
     * @param param the request object
     */
    public validateToken(param: AuthApiValidateTokenRequest = {}, options?: Configuration): Promise<void> {
        return this.api.validateToken( options).toPromise();
    }

    /**
     * Returns the data of the user identified by the bearerAuth token.
     * @param param the request object
     */
    public whoAmIWithHttpInfo(param: AuthApiWhoAmIRequest = {}, options?: Configuration): Promise<HttpInfo<WhoAmI200Response>> {
        return this.api.whoAmIWithHttpInfo( options).toPromise();
    }

    /**
     * Returns the data of the user identified by the bearerAuth token.
     * @param param the request object
     */
    public whoAmI(param: AuthApiWhoAmIRequest = {}, options?: Configuration): Promise<WhoAmI200Response> {
        return this.api.whoAmI( options).toPromise();
    }

}

import { ObservableConfigApi } from "./ObservableAPI";
import { ConfigApiRequestFactory, ConfigApiResponseProcessor} from "../apis/ConfigApi";

export interface ConfigApiGetConfigRequest {
    /**
     * Parameter referring to the configuration ID
     * @type number
     * @memberof ConfigApigetConfig
     */
    id: number
}

export interface ConfigApiGetConfigListRequest {
    /**
     * 
     * @type GetConfigParam
     * @memberof ConfigApigetConfigList
     */
    getConfigParam: GetConfigParam
}

export class ObjectConfigApi {
    private api: ObservableConfigApi

    public constructor(configuration: Configuration, requestFactory?: ConfigApiRequestFactory, responseProcessor?: ConfigApiResponseProcessor) {
        this.api = new ObservableConfigApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Returns the requested configuration values. Note that if the ID field returns 0 (zero), it indicates that the configuration <b>was not found</b>.
     * @param param the request object
     */
    public getConfigWithHttpInfo(param: ConfigApiGetConfigRequest, options?: Configuration): Promise<HttpInfo<GetConfig200Response>> {
        return this.api.getConfigWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Returns the requested configuration values. Note that if the ID field returns 0 (zero), it indicates that the configuration <b>was not found</b>.
     * @param param the request object
     */
    public getConfig(param: ConfigApiGetConfigRequest, options?: Configuration): Promise<GetConfig200Response> {
        return this.api.getConfig(param.id,  options).toPromise();
    }

    /**
     * Returns a list with the requested configuration values.
     * @param param the request object
     */
    public getConfigListWithHttpInfo(param: ConfigApiGetConfigListRequest, options?: Configuration): Promise<HttpInfo<GetConfigList200Response>> {
        return this.api.getConfigListWithHttpInfo(param.getConfigParam,  options).toPromise();
    }

    /**
     * Returns a list with the requested configuration values.
     * @param param the request object
     */
    public getConfigList(param: ConfigApiGetConfigListRequest, options?: Configuration): Promise<GetConfigList200Response> {
        return this.api.getConfigList(param.getConfigParam,  options).toPromise();
    }

}

import { ObservableIssueApi } from "./ObservableAPI";
import { IssueApiRequestFactory, IssueApiResponseProcessor} from "../apis/IssueApi";

export interface IssueApiAddIssueRequest {
    /**
     * GUID of the Roadmap
     * @type string
     * @memberof IssueApiaddIssue
     */
    guid: string
    /**
     * 
     * @type IssueModel
     * @memberof IssueApiaddIssue
     */
    issueModel: IssueModel
}

export interface IssueApiFindIssuesRequest {
    /**
     * 
     * @type FindIssueModel
     * @memberof IssueApifindIssues
     */
    findIssueModel: FindIssueModel
}

export interface IssueApiRemoveIssueRequest {
    /**
     * GUID of the Roadmap
     * @type string
     * @memberof IssueApiremoveIssue
     */
    guid: string
    /**
     * Issue Key
     * @type string
     * @memberof IssueApiremoveIssue
     */
    body: string
}

export interface IssueApiUpdateIssueRequest {
    /**
     * GUID of the Roadmap
     * @type string
     * @memberof IssueApiupdateIssue
     */
    guid: string
    /**
     * 
     * @type UpdateIssueModel
     * @memberof IssueApiupdateIssue
     */
    updateIssueModel: UpdateIssueModel
}

export class ObjectIssueApi {
    private api: ObservableIssueApi

    public constructor(configuration: Configuration, requestFactory?: IssueApiRequestFactory, responseProcessor?: IssueApiResponseProcessor) {
        this.api = new ObservableIssueApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Add an Issue to a Roadmap.
     * @param param the request object
     */
    public addIssueWithHttpInfo(param: IssueApiAddIssueRequest, options?: Configuration): Promise<HttpInfo<AddIssue200Response>> {
        return this.api.addIssueWithHttpInfo(param.guid, param.issueModel,  options).toPromise();
    }

    /**
     * Add an Issue to a Roadmap.
     * @param param the request object
     */
    public addIssue(param: IssueApiAddIssueRequest, options?: Configuration): Promise<AddIssue200Response> {
        return this.api.addIssue(param.guid, param.issueModel,  options).toPromise();
    }

    /**
     * Load a List of Issues objects for current user.
     * @param param the request object
     */
    public findIssuesWithHttpInfo(param: IssueApiFindIssuesRequest, options?: Configuration): Promise<HttpInfo<FindIssues200Response>> {
        return this.api.findIssuesWithHttpInfo(param.findIssueModel,  options).toPromise();
    }

    /**
     * Load a List of Issues objects for current user.
     * @param param the request object
     */
    public findIssues(param: IssueApiFindIssuesRequest, options?: Configuration): Promise<FindIssues200Response> {
        return this.api.findIssues(param.findIssueModel,  options).toPromise();
    }

    /**
     * Remove an Issue from Roadmap.
     * @param param the request object
     */
    public removeIssueWithHttpInfo(param: IssueApiRemoveIssueRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.removeIssueWithHttpInfo(param.guid, param.body,  options).toPromise();
    }

    /**
     * Remove an Issue from Roadmap.
     * @param param the request object
     */
    public removeIssue(param: IssueApiRemoveIssueRequest, options?: Configuration): Promise<void> {
        return this.api.removeIssue(param.guid, param.body,  options).toPromise();
    }

    /**
     * Update the Start and End date of a Roadmap Issue, and vertical pos.
     * @param param the request object
     */
    public updateIssueWithHttpInfo(param: IssueApiUpdateIssueRequest, options?: Configuration): Promise<HttpInfo<AddIssue200Response>> {
        return this.api.updateIssueWithHttpInfo(param.guid, param.updateIssueModel,  options).toPromise();
    }

    /**
     * Update the Start and End date of a Roadmap Issue, and vertical pos.
     * @param param the request object
     */
    public updateIssue(param: IssueApiUpdateIssueRequest, options?: Configuration): Promise<AddIssue200Response> {
        return this.api.updateIssue(param.guid, param.updateIssueModel,  options).toPromise();
    }

}

import { ObservableProjectApi } from "./ObservableAPI";
import { ProjectApiRequestFactory, ProjectApiResponseProcessor} from "../apis/ProjectApi";

export interface ProjectApiGetProjectsRequest {
}

export interface ProjectApiRemoveProjectRequest {
    /**
     * Project Key
     * @type string
     * @memberof ProjectApiremoveProject
     */
    body: string
}

export interface ProjectApiSaveProjectRequest {
    /**
     * 
     * @type ProjectConfigModel
     * @memberof ProjectApisaveProject
     */
    projectConfigModel: ProjectConfigModel
}

export class ObjectProjectApi {
    private api: ObservableProjectApi

    public constructor(configuration: Configuration, requestFactory?: ProjectApiRequestFactory, responseProcessor?: ProjectApiResponseProcessor) {
        this.api = new ObservableProjectApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Load a List of Projcts config objects.
     * @param param the request object
     */
    public getProjectsWithHttpInfo(param: ProjectApiGetProjectsRequest = {}, options?: Configuration): Promise<HttpInfo<GetProjects200Response>> {
        return this.api.getProjectsWithHttpInfo( options).toPromise();
    }

    /**
     * Load a List of Projcts config objects.
     * @param param the request object
     */
    public getProjects(param: ProjectApiGetProjectsRequest = {}, options?: Configuration): Promise<GetProjects200Response> {
        return this.api.getProjects( options).toPromise();
    }

    /**
     * Remove the project param.
     * @param param the request object
     */
    public removeProjectWithHttpInfo(param: ProjectApiRemoveProjectRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.removeProjectWithHttpInfo(param.body,  options).toPromise();
    }

    /**
     * Remove the project param.
     * @param param the request object
     */
    public removeProject(param: ProjectApiRemoveProjectRequest, options?: Configuration): Promise<void> {
        return this.api.removeProject(param.body,  options).toPromise();
    }

    /**
     * Save the project param.
     * @param param the request object
     */
    public saveProjectWithHttpInfo(param: ProjectApiSaveProjectRequest, options?: Configuration): Promise<HttpInfo<SaveProject200Response>> {
        return this.api.saveProjectWithHttpInfo(param.projectConfigModel,  options).toPromise();
    }

    /**
     * Save the project param.
     * @param param the request object
     */
    public saveProject(param: ProjectApiSaveProjectRequest, options?: Configuration): Promise<SaveProject200Response> {
        return this.api.saveProject(param.projectConfigModel,  options).toPromise();
    }

}

import { ObservableRoadmapApi } from "./ObservableAPI";
import { RoadmapApiRequestFactory, RoadmapApiResponseProcessor} from "../apis/RoadmapApi";

export interface RoadmapApiGetDashRequest {
    /**
     * 
     * @type DashParamsModel
     * @memberof RoadmapApigetDash
     */
    dashParamsModel: DashParamsModel
}

export interface RoadmapApiLoadRoadmapRequest {
    /**
     * GUID of the Roadmap
     * @type string
     * @memberof RoadmapApiloadRoadmap
     */
    guid: string
    /**
     * Load the Roadmap with the list of Issues (0-false/1-true).
     * @type number
     * @memberof RoadmapApiloadRoadmap
     */
    itens: number
}

export interface RoadmapApiRemoveShareRequest {
    /**
     * 
     * @type RemoveShareParam
     * @memberof RoadmapApiremoveShare
     */
    removeShareParam: RemoveShareParam
}

export interface RoadmapApiSaveRoadmapRequest {
    /**
     * 
     * @type RoadmapModel
     * @memberof RoadmapApisaveRoadmap
     */
    roadmapModel: RoadmapModel
}

export interface RoadmapApiShareRequest {
    /**
     * 
     * @type AddShareParam
     * @memberof RoadmapApishare
     */
    addShareParam: AddShareParam
}

export interface RoadmapApiSyncRoadmapIssuesRequest {
    /**
     * GUID of the Roadmap
     * @type string
     * @memberof RoadmapApisyncRoadmapIssues
     */
    guid: string
}

export class ObjectRoadmapApi {
    private api: ObservableRoadmapApi

    public constructor(configuration: Configuration, requestFactory?: RoadmapApiRequestFactory, responseProcessor?: RoadmapApiResponseProcessor) {
        this.api = new ObservableRoadmapApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Load a List of Roadmaps objects for current user.
     * @param param the request object
     */
    public getDashWithHttpInfo(param: RoadmapApiGetDashRequest, options?: Configuration): Promise<HttpInfo<GetDash200Response>> {
        return this.api.getDashWithHttpInfo(param.dashParamsModel,  options).toPromise();
    }

    /**
     * Load a List of Roadmaps objects for current user.
     * @param param the request object
     */
    public getDash(param: RoadmapApiGetDashRequest, options?: Configuration): Promise<GetDash200Response> {
        return this.api.getDash(param.dashParamsModel,  options).toPromise();
    }

    /**
     * Load a Roadmap object by GUID.
     * @param param the request object
     */
    public loadRoadmapWithHttpInfo(param: RoadmapApiLoadRoadmapRequest, options?: Configuration): Promise<HttpInfo<LoadRoadmap200Response>> {
        return this.api.loadRoadmapWithHttpInfo(param.guid, param.itens,  options).toPromise();
    }

    /**
     * Load a Roadmap object by GUID.
     * @param param the request object
     */
    public loadRoadmap(param: RoadmapApiLoadRoadmapRequest, options?: Configuration): Promise<LoadRoadmap200Response> {
        return this.api.loadRoadmap(param.guid, param.itens,  options).toPromise();
    }

    /**
     * Remove the shared user from current roadmap by user email.
     * @param param the request object
     */
    public removeShareWithHttpInfo(param: RoadmapApiRemoveShareRequest, options?: Configuration): Promise<HttpInfo<Share200Response>> {
        return this.api.removeShareWithHttpInfo(param.removeShareParam,  options).toPromise();
    }

    /**
     * Remove the shared user from current roadmap by user email.
     * @param param the request object
     */
    public removeShare(param: RoadmapApiRemoveShareRequest, options?: Configuration): Promise<Share200Response> {
        return this.api.removeShare(param.removeShareParam,  options).toPromise();
    }

    /**
     * Create or update a Roadmap object.
     * @param param the request object
     */
    public saveRoadmapWithHttpInfo(param: RoadmapApiSaveRoadmapRequest, options?: Configuration): Promise<HttpInfo<SaveRoadmap200Response>> {
        return this.api.saveRoadmapWithHttpInfo(param.roadmapModel,  options).toPromise();
    }

    /**
     * Create or update a Roadmap object.
     * @param param the request object
     */
    public saveRoadmap(param: RoadmapApiSaveRoadmapRequest, options?: Configuration): Promise<SaveRoadmap200Response> {
        return this.api.saveRoadmap(param.roadmapModel,  options).toPromise();
    }

    /**
     * Share the current roadmap with a new user by email.
     * @param param the request object
     */
    public shareWithHttpInfo(param: RoadmapApiShareRequest, options?: Configuration): Promise<HttpInfo<Share200Response>> {
        return this.api.shareWithHttpInfo(param.addShareParam,  options).toPromise();
    }

    /**
     * Share the current roadmap with a new user by email.
     * @param param the request object
     */
    public share(param: RoadmapApiShareRequest, options?: Configuration): Promise<Share200Response> {
        return this.api.share(param.addShareParam,  options).toPromise();
    }

    /**
     * Synchronize Roadmap Issues with Jira (send Start/End date, get Issue details).
     * @param param the request object
     */
    public syncRoadmapIssuesWithHttpInfo(param: RoadmapApiSyncRoadmapIssuesRequest, options?: Configuration): Promise<HttpInfo<LoadRoadmap200Response>> {
        return this.api.syncRoadmapIssuesWithHttpInfo(param.guid,  options).toPromise();
    }

    /**
     * Synchronize Roadmap Issues with Jira (send Start/End date, get Issue details).
     * @param param the request object
     */
    public syncRoadmapIssues(param: RoadmapApiSyncRoadmapIssuesRequest, options?: Configuration): Promise<LoadRoadmap200Response> {
        return this.api.syncRoadmapIssues(param.guid,  options).toPromise();
    }

}

import { ObservableTestApi } from "./ObservableAPI";
import { TestApiRequestFactory, TestApiResponseProcessor} from "../apis/TestApi";

export interface TestApiTestApiRequest {
}

export class ObjectTestApi {
    private api: ObservableTestApi

    public constructor(configuration: Configuration, requestFactory?: TestApiRequestFactory, responseProcessor?: TestApiResponseProcessor) {
        this.api = new ObservableTestApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Returns a simple Ok message for API Connectivity test.
     * API Communication Test, should return a JSON
     * @param param the request object
     */
    public testApiWithHttpInfo(param: TestApiTestApiRequest = {}, options?: Configuration): Promise<HttpInfo<TestApi200Response>> {
        return this.api.testApiWithHttpInfo( options).toPromise();
    }

    /**
     * Returns a simple Ok message for API Connectivity test.
     * API Communication Test, should return a JSON
     * @param param the request object
     */
    public testApi(param: TestApiTestApiRequest = {}, options?: Configuration): Promise<TestApi200Response> {
        return this.api.testApi( options).toPromise();
    }

}

import { ObservableUserApi } from "./ObservableAPI";
import { UserApiRequestFactory, UserApiResponseProcessor} from "../apis/UserApi";

export interface UserApiConfigTokenJiraRequest {
    /**
     * 
     * @type string
     * @memberof UserApiconfigTokenJira
     */
    body: string
}

export interface UserApiRemoveTokenJiraRequest {
}

export interface UserApiSendCodeRequest {
    /**
     * 
     * @type SendCodeParam
     * @memberof UserApisendCode
     */
    sendCodeParam: SendCodeParam
}

export interface UserApiValidateRequest {
    /**
     * 
     * @type UserValidationParam
     * @memberof UserApivalidate
     */
    userValidationParam: UserValidationParam
}

export class ObjectUserApi {
    private api: ObservableUserApi

    public constructor(configuration: Configuration, requestFactory?: UserApiRequestFactory, responseProcessor?: UserApiResponseProcessor) {
        this.api = new ObservableUserApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Configures a new Jira token for the logged-in user. v4
     * @param param the request object
     */
    public configTokenJiraWithHttpInfo(param: UserApiConfigTokenJiraRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.configTokenJiraWithHttpInfo(param.body,  options).toPromise();
    }

    /**
     * Configures a new Jira token for the logged-in user. v4
     * @param param the request object
     */
    public configTokenJira(param: UserApiConfigTokenJiraRequest, options?: Configuration): Promise<void> {
        return this.api.configTokenJira(param.body,  options).toPromise();
    }

    /**
     * Remove o token Jira cadastrado para o usuário logado.
     * @param param the request object
     */
    public removeTokenJiraWithHttpInfo(param: UserApiRemoveTokenJiraRequest = {}, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.removeTokenJiraWithHttpInfo( options).toPromise();
    }

    /**
     * Remove o token Jira cadastrado para o usuário logado.
     * @param param the request object
     */
    public removeTokenJira(param: UserApiRemoveTokenJiraRequest = {}, options?: Configuration): Promise<void> {
        return this.api.removeTokenJira( options).toPromise();
    }

    /**
     * Generates an authentication code for the specified user.
     * @param param the request object
     */
    public sendCodeWithHttpInfo(param: UserApiSendCodeRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.sendCodeWithHttpInfo(param.sendCodeParam,  options).toPromise();
    }

    /**
     * Generates an authentication code for the specified user.
     * @param param the request object
     */
    public sendCode(param: UserApiSendCodeRequest, options?: Configuration): Promise<void> {
        return this.api.sendCode(param.sendCodeParam,  options).toPromise();
    }

    /**
     * If found, returns the username associated with the provided username.
     * @param param the request object
     */
    public validateWithHttpInfo(param: UserApiValidateRequest, options?: Configuration): Promise<HttpInfo<Validate200Response>> {
        return this.api.validateWithHttpInfo(param.userValidationParam,  options).toPromise();
    }

    /**
     * If found, returns the username associated with the provided username.
     * @param param the request object
     */
    public validate(param: UserApiValidateRequest, options?: Configuration): Promise<Validate200Response> {
        return this.api.validate(param.userValidationParam,  options).toPromise();
    }

}
