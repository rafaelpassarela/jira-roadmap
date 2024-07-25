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
import { ObservableAuthApi } from './ObservableAPI';

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class PromiseAuthApi {
    private api: ObservableAuthApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Performs user login based on the code sent by email. Returns authentication data in case of success
     * @param codeLoginParam 
     */
    public codeLoginWithHttpInfo(codeLoginParam: CodeLoginParam, _options?: Configuration): Promise<HttpInfo<CodeLogin200Response>> {
        const result = this.api.codeLoginWithHttpInfo(codeLoginParam, _options);
        return result.toPromise();
    }

    /**
     * Performs user login based on the code sent by email. Returns authentication data in case of success
     * @param codeLoginParam 
     */
    public codeLogin(codeLoginParam: CodeLoginParam, _options?: Configuration): Promise<CodeLogin200Response> {
        const result = this.api.codeLogin(codeLoginParam, _options);
        return result.toPromise();
    }

    /**
     * Returns 200 for a valid token, otherwise 401.
     */
    public validateTokenWithHttpInfo(_options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.validateTokenWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Returns 200 for a valid token, otherwise 401.
     */
    public validateToken(_options?: Configuration): Promise<void> {
        const result = this.api.validateToken(_options);
        return result.toPromise();
    }

    /**
     * Returns the data of the user identified by the bearerAuth token.
     */
    public whoAmIWithHttpInfo(_options?: Configuration): Promise<HttpInfo<WhoAmI200Response>> {
        const result = this.api.whoAmIWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Returns the data of the user identified by the bearerAuth token.
     */
    public whoAmI(_options?: Configuration): Promise<WhoAmI200Response> {
        const result = this.api.whoAmI(_options);
        return result.toPromise();
    }


}



import { ObservableConfigApi } from './ObservableAPI';

import { ConfigApiRequestFactory, ConfigApiResponseProcessor} from "../apis/ConfigApi";
export class PromiseConfigApi {
    private api: ObservableConfigApi

    public constructor(
        configuration: Configuration,
        requestFactory?: ConfigApiRequestFactory,
        responseProcessor?: ConfigApiResponseProcessor
    ) {
        this.api = new ObservableConfigApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Returns the requested configuration values. Note that if the ID field returns 0 (zero), it indicates that the configuration <b>was not found</b>.
     * @param id Parameter referring to the configuration ID
     */
    public getConfigWithHttpInfo(id: number, _options?: Configuration): Promise<HttpInfo<GetConfig200Response>> {
        const result = this.api.getConfigWithHttpInfo(id, _options);
        return result.toPromise();
    }

    /**
     * Returns the requested configuration values. Note that if the ID field returns 0 (zero), it indicates that the configuration <b>was not found</b>.
     * @param id Parameter referring to the configuration ID
     */
    public getConfig(id: number, _options?: Configuration): Promise<GetConfig200Response> {
        const result = this.api.getConfig(id, _options);
        return result.toPromise();
    }

    /**
     * Returns a list with the requested configuration values.
     * @param getConfigParam 
     */
    public getConfigListWithHttpInfo(getConfigParam: GetConfigParam, _options?: Configuration): Promise<HttpInfo<GetConfigList200Response>> {
        const result = this.api.getConfigListWithHttpInfo(getConfigParam, _options);
        return result.toPromise();
    }

    /**
     * Returns a list with the requested configuration values.
     * @param getConfigParam 
     */
    public getConfigList(getConfigParam: GetConfigParam, _options?: Configuration): Promise<GetConfigList200Response> {
        const result = this.api.getConfigList(getConfigParam, _options);
        return result.toPromise();
    }


}



import { ObservableIssueApi } from './ObservableAPI';

import { IssueApiRequestFactory, IssueApiResponseProcessor} from "../apis/IssueApi";
export class PromiseIssueApi {
    private api: ObservableIssueApi

    public constructor(
        configuration: Configuration,
        requestFactory?: IssueApiRequestFactory,
        responseProcessor?: IssueApiResponseProcessor
    ) {
        this.api = new ObservableIssueApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Add an Issue to a Roadmap.
     * @param guid GUID of the Roadmap
     * @param issueModel 
     */
    public addIssueWithHttpInfo(guid: string, issueModel: IssueModel, _options?: Configuration): Promise<HttpInfo<AddIssue200Response>> {
        const result = this.api.addIssueWithHttpInfo(guid, issueModel, _options);
        return result.toPromise();
    }

    /**
     * Add an Issue to a Roadmap.
     * @param guid GUID of the Roadmap
     * @param issueModel 
     */
    public addIssue(guid: string, issueModel: IssueModel, _options?: Configuration): Promise<AddIssue200Response> {
        const result = this.api.addIssue(guid, issueModel, _options);
        return result.toPromise();
    }

    /**
     * Load a List of Issues objects for current user.
     * @param findIssueModel 
     */
    public findIssuesWithHttpInfo(findIssueModel: FindIssueModel, _options?: Configuration): Promise<HttpInfo<FindIssues200Response>> {
        const result = this.api.findIssuesWithHttpInfo(findIssueModel, _options);
        return result.toPromise();
    }

    /**
     * Load a List of Issues objects for current user.
     * @param findIssueModel 
     */
    public findIssues(findIssueModel: FindIssueModel, _options?: Configuration): Promise<FindIssues200Response> {
        const result = this.api.findIssues(findIssueModel, _options);
        return result.toPromise();
    }

    /**
     * Remove an Issue from Roadmap.
     * @param guid GUID of the Roadmap
     * @param body Issue Key
     */
    public removeIssueWithHttpInfo(guid: string, body: string, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.removeIssueWithHttpInfo(guid, body, _options);
        return result.toPromise();
    }

    /**
     * Remove an Issue from Roadmap.
     * @param guid GUID of the Roadmap
     * @param body Issue Key
     */
    public removeIssue(guid: string, body: string, _options?: Configuration): Promise<void> {
        const result = this.api.removeIssue(guid, body, _options);
        return result.toPromise();
    }

    /**
     * Update the Start and End date of a Roadmap Issue, and vertical pos.
     * @param guid GUID of the Roadmap
     * @param updateIssueModel 
     */
    public updateIssueWithHttpInfo(guid: string, updateIssueModel: UpdateIssueModel, _options?: Configuration): Promise<HttpInfo<AddIssue200Response>> {
        const result = this.api.updateIssueWithHttpInfo(guid, updateIssueModel, _options);
        return result.toPromise();
    }

    /**
     * Update the Start and End date of a Roadmap Issue, and vertical pos.
     * @param guid GUID of the Roadmap
     * @param updateIssueModel 
     */
    public updateIssue(guid: string, updateIssueModel: UpdateIssueModel, _options?: Configuration): Promise<AddIssue200Response> {
        const result = this.api.updateIssue(guid, updateIssueModel, _options);
        return result.toPromise();
    }


}



import { ObservableProjectApi } from './ObservableAPI';

import { ProjectApiRequestFactory, ProjectApiResponseProcessor} from "../apis/ProjectApi";
export class PromiseProjectApi {
    private api: ObservableProjectApi

    public constructor(
        configuration: Configuration,
        requestFactory?: ProjectApiRequestFactory,
        responseProcessor?: ProjectApiResponseProcessor
    ) {
        this.api = new ObservableProjectApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Load a List of Projcts config objects.
     */
    public getProjectsWithHttpInfo(_options?: Configuration): Promise<HttpInfo<GetProjects200Response>> {
        const result = this.api.getProjectsWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Load a List of Projcts config objects.
     */
    public getProjects(_options?: Configuration): Promise<GetProjects200Response> {
        const result = this.api.getProjects(_options);
        return result.toPromise();
    }

    /**
     * Remove the project param.
     * @param body Project Key
     */
    public removeProjectWithHttpInfo(body: string, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.removeProjectWithHttpInfo(body, _options);
        return result.toPromise();
    }

    /**
     * Remove the project param.
     * @param body Project Key
     */
    public removeProject(body: string, _options?: Configuration): Promise<void> {
        const result = this.api.removeProject(body, _options);
        return result.toPromise();
    }

    /**
     * Save the project param.
     * @param projectConfigModel 
     */
    public saveProjectWithHttpInfo(projectConfigModel: ProjectConfigModel, _options?: Configuration): Promise<HttpInfo<SaveProject200Response>> {
        const result = this.api.saveProjectWithHttpInfo(projectConfigModel, _options);
        return result.toPromise();
    }

    /**
     * Save the project param.
     * @param projectConfigModel 
     */
    public saveProject(projectConfigModel: ProjectConfigModel, _options?: Configuration): Promise<SaveProject200Response> {
        const result = this.api.saveProject(projectConfigModel, _options);
        return result.toPromise();
    }


}



import { ObservableRoadmapApi } from './ObservableAPI';

import { RoadmapApiRequestFactory, RoadmapApiResponseProcessor} from "../apis/RoadmapApi";
export class PromiseRoadmapApi {
    private api: ObservableRoadmapApi

    public constructor(
        configuration: Configuration,
        requestFactory?: RoadmapApiRequestFactory,
        responseProcessor?: RoadmapApiResponseProcessor
    ) {
        this.api = new ObservableRoadmapApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Load a List of Roadmaps objects for current user.
     * @param dashParamsModel 
     */
    public getDashWithHttpInfo(dashParamsModel: DashParamsModel, _options?: Configuration): Promise<HttpInfo<GetDash200Response>> {
        const result = this.api.getDashWithHttpInfo(dashParamsModel, _options);
        return result.toPromise();
    }

    /**
     * Load a List of Roadmaps objects for current user.
     * @param dashParamsModel 
     */
    public getDash(dashParamsModel: DashParamsModel, _options?: Configuration): Promise<GetDash200Response> {
        const result = this.api.getDash(dashParamsModel, _options);
        return result.toPromise();
    }

    /**
     * Load a Roadmap object by GUID.
     * @param guid GUID of the Roadmap
     * @param itens Load the Roadmap with the list of Issues (0-false/1-true).
     */
    public loadRoadmapWithHttpInfo(guid: string, itens: number, _options?: Configuration): Promise<HttpInfo<LoadRoadmap200Response>> {
        const result = this.api.loadRoadmapWithHttpInfo(guid, itens, _options);
        return result.toPromise();
    }

    /**
     * Load a Roadmap object by GUID.
     * @param guid GUID of the Roadmap
     * @param itens Load the Roadmap with the list of Issues (0-false/1-true).
     */
    public loadRoadmap(guid: string, itens: number, _options?: Configuration): Promise<LoadRoadmap200Response> {
        const result = this.api.loadRoadmap(guid, itens, _options);
        return result.toPromise();
    }

    /**
     * Remove the shared user from current roadmap by user email.
     * @param removeShareParam 
     */
    public removeShareWithHttpInfo(removeShareParam: RemoveShareParam, _options?: Configuration): Promise<HttpInfo<Share200Response>> {
        const result = this.api.removeShareWithHttpInfo(removeShareParam, _options);
        return result.toPromise();
    }

    /**
     * Remove the shared user from current roadmap by user email.
     * @param removeShareParam 
     */
    public removeShare(removeShareParam: RemoveShareParam, _options?: Configuration): Promise<Share200Response> {
        const result = this.api.removeShare(removeShareParam, _options);
        return result.toPromise();
    }

    /**
     * Create or update a Roadmap object.
     * @param roadmapModel 
     */
    public saveRoadmapWithHttpInfo(roadmapModel: RoadmapModel, _options?: Configuration): Promise<HttpInfo<SaveRoadmap200Response>> {
        const result = this.api.saveRoadmapWithHttpInfo(roadmapModel, _options);
        return result.toPromise();
    }

    /**
     * Create or update a Roadmap object.
     * @param roadmapModel 
     */
    public saveRoadmap(roadmapModel: RoadmapModel, _options?: Configuration): Promise<SaveRoadmap200Response> {
        const result = this.api.saveRoadmap(roadmapModel, _options);
        return result.toPromise();
    }

    /**
     * Share the current roadmap with a new user by email.
     * @param addShareParam 
     */
    public shareWithHttpInfo(addShareParam: AddShareParam, _options?: Configuration): Promise<HttpInfo<Share200Response>> {
        const result = this.api.shareWithHttpInfo(addShareParam, _options);
        return result.toPromise();
    }

    /**
     * Share the current roadmap with a new user by email.
     * @param addShareParam 
     */
    public share(addShareParam: AddShareParam, _options?: Configuration): Promise<Share200Response> {
        const result = this.api.share(addShareParam, _options);
        return result.toPromise();
    }

    /**
     * Synchronize Roadmap Issues with Jira (send Start/End date, get Issue details).
     * @param guid GUID of the Roadmap
     */
    public syncRoadmapIssuesWithHttpInfo(guid: string, _options?: Configuration): Promise<HttpInfo<LoadRoadmap200Response>> {
        const result = this.api.syncRoadmapIssuesWithHttpInfo(guid, _options);
        return result.toPromise();
    }

    /**
     * Synchronize Roadmap Issues with Jira (send Start/End date, get Issue details).
     * @param guid GUID of the Roadmap
     */
    public syncRoadmapIssues(guid: string, _options?: Configuration): Promise<LoadRoadmap200Response> {
        const result = this.api.syncRoadmapIssues(guid, _options);
        return result.toPromise();
    }


}



import { ObservableTestApi } from './ObservableAPI';

import { TestApiRequestFactory, TestApiResponseProcessor} from "../apis/TestApi";
export class PromiseTestApi {
    private api: ObservableTestApi

    public constructor(
        configuration: Configuration,
        requestFactory?: TestApiRequestFactory,
        responseProcessor?: TestApiResponseProcessor
    ) {
        this.api = new ObservableTestApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Returns a simple Ok message for API Connectivity test.
     * API Communication Test, should return a JSON
     */
    public testApiWithHttpInfo(_options?: Configuration): Promise<HttpInfo<TestApi200Response>> {
        const result = this.api.testApiWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Returns a simple Ok message for API Connectivity test.
     * API Communication Test, should return a JSON
     */
    public testApi(_options?: Configuration): Promise<TestApi200Response> {
        const result = this.api.testApi(_options);
        return result.toPromise();
    }


}



import { ObservableUserApi } from './ObservableAPI';

import { UserApiRequestFactory, UserApiResponseProcessor} from "../apis/UserApi";
export class PromiseUserApi {
    private api: ObservableUserApi

    public constructor(
        configuration: Configuration,
        requestFactory?: UserApiRequestFactory,
        responseProcessor?: UserApiResponseProcessor
    ) {
        this.api = new ObservableUserApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Configures a new Jira token for the logged-in user. v4
     * @param body 
     */
    public configTokenJiraWithHttpInfo(body: string, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.configTokenJiraWithHttpInfo(body, _options);
        return result.toPromise();
    }

    /**
     * Configures a new Jira token for the logged-in user. v4
     * @param body 
     */
    public configTokenJira(body: string, _options?: Configuration): Promise<void> {
        const result = this.api.configTokenJira(body, _options);
        return result.toPromise();
    }

    /**
     * Remove o token Jira cadastrado para o usuário logado.
     */
    public removeTokenJiraWithHttpInfo(_options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.removeTokenJiraWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Remove o token Jira cadastrado para o usuário logado.
     */
    public removeTokenJira(_options?: Configuration): Promise<void> {
        const result = this.api.removeTokenJira(_options);
        return result.toPromise();
    }

    /**
     * Generates an authentication code for the specified user.
     * @param sendCodeParam 
     */
    public sendCodeWithHttpInfo(sendCodeParam: SendCodeParam, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.sendCodeWithHttpInfo(sendCodeParam, _options);
        return result.toPromise();
    }

    /**
     * Generates an authentication code for the specified user.
     * @param sendCodeParam 
     */
    public sendCode(sendCodeParam: SendCodeParam, _options?: Configuration): Promise<void> {
        const result = this.api.sendCode(sendCodeParam, _options);
        return result.toPromise();
    }

    /**
     * If found, returns the username associated with the provided username.
     * @param userValidationParam 
     */
    public validateWithHttpInfo(userValidationParam: UserValidationParam, _options?: Configuration): Promise<HttpInfo<Validate200Response>> {
        const result = this.api.validateWithHttpInfo(userValidationParam, _options);
        return result.toPromise();
    }

    /**
     * If found, returns the username associated with the provided username.
     * @param userValidationParam 
     */
    public validate(userValidationParam: UserValidationParam, _options?: Configuration): Promise<Validate200Response> {
        const result = this.api.validate(userValidationParam, _options);
        return result.toPromise();
    }


}



