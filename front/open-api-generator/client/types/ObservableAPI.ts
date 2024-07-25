import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
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

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class ObservableAuthApi {
    private requestFactory: AuthApiRequestFactory;
    private responseProcessor: AuthApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new AuthApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new AuthApiResponseProcessor();
    }

    /**
     * Performs user login based on the code sent by email. Returns authentication data in case of success
     * @param codeLoginParam 
     */
    public codeLoginWithHttpInfo(codeLoginParam: CodeLoginParam, _options?: Configuration): Observable<HttpInfo<CodeLogin200Response>> {
        const requestContextPromise = this.requestFactory.codeLogin(codeLoginParam, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.codeLoginWithHttpInfo(rsp)));
            }));
    }

    /**
     * Performs user login based on the code sent by email. Returns authentication data in case of success
     * @param codeLoginParam 
     */
    public codeLogin(codeLoginParam: CodeLoginParam, _options?: Configuration): Observable<CodeLogin200Response> {
        return this.codeLoginWithHttpInfo(codeLoginParam, _options).pipe(map((apiResponse: HttpInfo<CodeLogin200Response>) => apiResponse.data));
    }

    /**
     * Returns 200 for a valid token, otherwise 401.
     */
    public validateTokenWithHttpInfo(_options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.validateToken(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.validateTokenWithHttpInfo(rsp)));
            }));
    }

    /**
     * Returns 200 for a valid token, otherwise 401.
     */
    public validateToken(_options?: Configuration): Observable<void> {
        return this.validateTokenWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * Returns the data of the user identified by the bearerAuth token.
     */
    public whoAmIWithHttpInfo(_options?: Configuration): Observable<HttpInfo<WhoAmI200Response>> {
        const requestContextPromise = this.requestFactory.whoAmI(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.whoAmIWithHttpInfo(rsp)));
            }));
    }

    /**
     * Returns the data of the user identified by the bearerAuth token.
     */
    public whoAmI(_options?: Configuration): Observable<WhoAmI200Response> {
        return this.whoAmIWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<WhoAmI200Response>) => apiResponse.data));
    }

}

import { ConfigApiRequestFactory, ConfigApiResponseProcessor} from "../apis/ConfigApi";
export class ObservableConfigApi {
    private requestFactory: ConfigApiRequestFactory;
    private responseProcessor: ConfigApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: ConfigApiRequestFactory,
        responseProcessor?: ConfigApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new ConfigApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new ConfigApiResponseProcessor();
    }

    /**
     * Returns the requested configuration values. Note that if the ID field returns 0 (zero), it indicates that the configuration <b>was not found</b>.
     * @param id Parameter referring to the configuration ID
     */
    public getConfigWithHttpInfo(id: number, _options?: Configuration): Observable<HttpInfo<GetConfig200Response>> {
        const requestContextPromise = this.requestFactory.getConfig(id, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getConfigWithHttpInfo(rsp)));
            }));
    }

    /**
     * Returns the requested configuration values. Note that if the ID field returns 0 (zero), it indicates that the configuration <b>was not found</b>.
     * @param id Parameter referring to the configuration ID
     */
    public getConfig(id: number, _options?: Configuration): Observable<GetConfig200Response> {
        return this.getConfigWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<GetConfig200Response>) => apiResponse.data));
    }

    /**
     * Returns a list with the requested configuration values.
     * @param getConfigParam 
     */
    public getConfigListWithHttpInfo(getConfigParam: GetConfigParam, _options?: Configuration): Observable<HttpInfo<GetConfigList200Response>> {
        const requestContextPromise = this.requestFactory.getConfigList(getConfigParam, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getConfigListWithHttpInfo(rsp)));
            }));
    }

    /**
     * Returns a list with the requested configuration values.
     * @param getConfigParam 
     */
    public getConfigList(getConfigParam: GetConfigParam, _options?: Configuration): Observable<GetConfigList200Response> {
        return this.getConfigListWithHttpInfo(getConfigParam, _options).pipe(map((apiResponse: HttpInfo<GetConfigList200Response>) => apiResponse.data));
    }

}

import { IssueApiRequestFactory, IssueApiResponseProcessor} from "../apis/IssueApi";
export class ObservableIssueApi {
    private requestFactory: IssueApiRequestFactory;
    private responseProcessor: IssueApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: IssueApiRequestFactory,
        responseProcessor?: IssueApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new IssueApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new IssueApiResponseProcessor();
    }

    /**
     * Add an Issue to a Roadmap.
     * @param guid GUID of the Roadmap
     * @param issueModel 
     */
    public addIssueWithHttpInfo(guid: string, issueModel: IssueModel, _options?: Configuration): Observable<HttpInfo<AddIssue200Response>> {
        const requestContextPromise = this.requestFactory.addIssue(guid, issueModel, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.addIssueWithHttpInfo(rsp)));
            }));
    }

    /**
     * Add an Issue to a Roadmap.
     * @param guid GUID of the Roadmap
     * @param issueModel 
     */
    public addIssue(guid: string, issueModel: IssueModel, _options?: Configuration): Observable<AddIssue200Response> {
        return this.addIssueWithHttpInfo(guid, issueModel, _options).pipe(map((apiResponse: HttpInfo<AddIssue200Response>) => apiResponse.data));
    }

    /**
     * Load a List of Issues objects for current user.
     * @param findIssueModel 
     */
    public findIssuesWithHttpInfo(findIssueModel: FindIssueModel, _options?: Configuration): Observable<HttpInfo<FindIssues200Response>> {
        const requestContextPromise = this.requestFactory.findIssues(findIssueModel, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.findIssuesWithHttpInfo(rsp)));
            }));
    }

    /**
     * Load a List of Issues objects for current user.
     * @param findIssueModel 
     */
    public findIssues(findIssueModel: FindIssueModel, _options?: Configuration): Observable<FindIssues200Response> {
        return this.findIssuesWithHttpInfo(findIssueModel, _options).pipe(map((apiResponse: HttpInfo<FindIssues200Response>) => apiResponse.data));
    }

    /**
     * Remove an Issue from Roadmap.
     * @param guid GUID of the Roadmap
     * @param body Issue Key
     */
    public removeIssueWithHttpInfo(guid: string, body: string, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.removeIssue(guid, body, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.removeIssueWithHttpInfo(rsp)));
            }));
    }

    /**
     * Remove an Issue from Roadmap.
     * @param guid GUID of the Roadmap
     * @param body Issue Key
     */
    public removeIssue(guid: string, body: string, _options?: Configuration): Observable<void> {
        return this.removeIssueWithHttpInfo(guid, body, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * Update the Start and End date of a Roadmap Issue, and vertical pos.
     * @param guid GUID of the Roadmap
     * @param updateIssueModel 
     */
    public updateIssueWithHttpInfo(guid: string, updateIssueModel: UpdateIssueModel, _options?: Configuration): Observable<HttpInfo<AddIssue200Response>> {
        const requestContextPromise = this.requestFactory.updateIssue(guid, updateIssueModel, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.updateIssueWithHttpInfo(rsp)));
            }));
    }

    /**
     * Update the Start and End date of a Roadmap Issue, and vertical pos.
     * @param guid GUID of the Roadmap
     * @param updateIssueModel 
     */
    public updateIssue(guid: string, updateIssueModel: UpdateIssueModel, _options?: Configuration): Observable<AddIssue200Response> {
        return this.updateIssueWithHttpInfo(guid, updateIssueModel, _options).pipe(map((apiResponse: HttpInfo<AddIssue200Response>) => apiResponse.data));
    }

}

import { ProjectApiRequestFactory, ProjectApiResponseProcessor} from "../apis/ProjectApi";
export class ObservableProjectApi {
    private requestFactory: ProjectApiRequestFactory;
    private responseProcessor: ProjectApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: ProjectApiRequestFactory,
        responseProcessor?: ProjectApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new ProjectApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new ProjectApiResponseProcessor();
    }

    /**
     * Load a List of Projcts config objects.
     */
    public getProjectsWithHttpInfo(_options?: Configuration): Observable<HttpInfo<GetProjects200Response>> {
        const requestContextPromise = this.requestFactory.getProjects(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getProjectsWithHttpInfo(rsp)));
            }));
    }

    /**
     * Load a List of Projcts config objects.
     */
    public getProjects(_options?: Configuration): Observable<GetProjects200Response> {
        return this.getProjectsWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<GetProjects200Response>) => apiResponse.data));
    }

    /**
     * Remove the project param.
     * @param body Project Key
     */
    public removeProjectWithHttpInfo(body: string, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.removeProject(body, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.removeProjectWithHttpInfo(rsp)));
            }));
    }

    /**
     * Remove the project param.
     * @param body Project Key
     */
    public removeProject(body: string, _options?: Configuration): Observable<void> {
        return this.removeProjectWithHttpInfo(body, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * Save the project param.
     * @param projectConfigModel 
     */
    public saveProjectWithHttpInfo(projectConfigModel: ProjectConfigModel, _options?: Configuration): Observable<HttpInfo<SaveProject200Response>> {
        const requestContextPromise = this.requestFactory.saveProject(projectConfigModel, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.saveProjectWithHttpInfo(rsp)));
            }));
    }

    /**
     * Save the project param.
     * @param projectConfigModel 
     */
    public saveProject(projectConfigModel: ProjectConfigModel, _options?: Configuration): Observable<SaveProject200Response> {
        return this.saveProjectWithHttpInfo(projectConfigModel, _options).pipe(map((apiResponse: HttpInfo<SaveProject200Response>) => apiResponse.data));
    }

}

import { RoadmapApiRequestFactory, RoadmapApiResponseProcessor} from "../apis/RoadmapApi";
export class ObservableRoadmapApi {
    private requestFactory: RoadmapApiRequestFactory;
    private responseProcessor: RoadmapApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: RoadmapApiRequestFactory,
        responseProcessor?: RoadmapApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new RoadmapApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new RoadmapApiResponseProcessor();
    }

    /**
     * Load a List of Roadmaps objects for current user.
     * @param dashParamsModel 
     */
    public getDashWithHttpInfo(dashParamsModel: DashParamsModel, _options?: Configuration): Observable<HttpInfo<GetDash200Response>> {
        const requestContextPromise = this.requestFactory.getDash(dashParamsModel, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getDashWithHttpInfo(rsp)));
            }));
    }

    /**
     * Load a List of Roadmaps objects for current user.
     * @param dashParamsModel 
     */
    public getDash(dashParamsModel: DashParamsModel, _options?: Configuration): Observable<GetDash200Response> {
        return this.getDashWithHttpInfo(dashParamsModel, _options).pipe(map((apiResponse: HttpInfo<GetDash200Response>) => apiResponse.data));
    }

    /**
     * Load a Roadmap object by GUID.
     * @param guid GUID of the Roadmap
     * @param itens Load the Roadmap with the list of Issues (0-false/1-true).
     */
    public loadRoadmapWithHttpInfo(guid: string, itens: number, _options?: Configuration): Observable<HttpInfo<LoadRoadmap200Response>> {
        const requestContextPromise = this.requestFactory.loadRoadmap(guid, itens, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.loadRoadmapWithHttpInfo(rsp)));
            }));
    }

    /**
     * Load a Roadmap object by GUID.
     * @param guid GUID of the Roadmap
     * @param itens Load the Roadmap with the list of Issues (0-false/1-true).
     */
    public loadRoadmap(guid: string, itens: number, _options?: Configuration): Observable<LoadRoadmap200Response> {
        return this.loadRoadmapWithHttpInfo(guid, itens, _options).pipe(map((apiResponse: HttpInfo<LoadRoadmap200Response>) => apiResponse.data));
    }

    /**
     * Remove the shared user from current roadmap by user email.
     * @param removeShareParam 
     */
    public removeShareWithHttpInfo(removeShareParam: RemoveShareParam, _options?: Configuration): Observable<HttpInfo<Share200Response>> {
        const requestContextPromise = this.requestFactory.removeShare(removeShareParam, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.removeShareWithHttpInfo(rsp)));
            }));
    }

    /**
     * Remove the shared user from current roadmap by user email.
     * @param removeShareParam 
     */
    public removeShare(removeShareParam: RemoveShareParam, _options?: Configuration): Observable<Share200Response> {
        return this.removeShareWithHttpInfo(removeShareParam, _options).pipe(map((apiResponse: HttpInfo<Share200Response>) => apiResponse.data));
    }

    /**
     * Create or update a Roadmap object.
     * @param roadmapModel 
     */
    public saveRoadmapWithHttpInfo(roadmapModel: RoadmapModel, _options?: Configuration): Observable<HttpInfo<SaveRoadmap200Response>> {
        const requestContextPromise = this.requestFactory.saveRoadmap(roadmapModel, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.saveRoadmapWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create or update a Roadmap object.
     * @param roadmapModel 
     */
    public saveRoadmap(roadmapModel: RoadmapModel, _options?: Configuration): Observable<SaveRoadmap200Response> {
        return this.saveRoadmapWithHttpInfo(roadmapModel, _options).pipe(map((apiResponse: HttpInfo<SaveRoadmap200Response>) => apiResponse.data));
    }

    /**
     * Share the current roadmap with a new user by email.
     * @param addShareParam 
     */
    public shareWithHttpInfo(addShareParam: AddShareParam, _options?: Configuration): Observable<HttpInfo<Share200Response>> {
        const requestContextPromise = this.requestFactory.share(addShareParam, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.shareWithHttpInfo(rsp)));
            }));
    }

    /**
     * Share the current roadmap with a new user by email.
     * @param addShareParam 
     */
    public share(addShareParam: AddShareParam, _options?: Configuration): Observable<Share200Response> {
        return this.shareWithHttpInfo(addShareParam, _options).pipe(map((apiResponse: HttpInfo<Share200Response>) => apiResponse.data));
    }

    /**
     * Synchronize Roadmap Issues with Jira (send Start/End date, get Issue details).
     * @param guid GUID of the Roadmap
     */
    public syncRoadmapIssuesWithHttpInfo(guid: string, _options?: Configuration): Observable<HttpInfo<LoadRoadmap200Response>> {
        const requestContextPromise = this.requestFactory.syncRoadmapIssues(guid, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.syncRoadmapIssuesWithHttpInfo(rsp)));
            }));
    }

    /**
     * Synchronize Roadmap Issues with Jira (send Start/End date, get Issue details).
     * @param guid GUID of the Roadmap
     */
    public syncRoadmapIssues(guid: string, _options?: Configuration): Observable<LoadRoadmap200Response> {
        return this.syncRoadmapIssuesWithHttpInfo(guid, _options).pipe(map((apiResponse: HttpInfo<LoadRoadmap200Response>) => apiResponse.data));
    }

}

import { TestApiRequestFactory, TestApiResponseProcessor} from "../apis/TestApi";
export class ObservableTestApi {
    private requestFactory: TestApiRequestFactory;
    private responseProcessor: TestApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: TestApiRequestFactory,
        responseProcessor?: TestApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new TestApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new TestApiResponseProcessor();
    }

    /**
     * Returns a simple Ok message for API Connectivity test.
     * API Communication Test, should return a JSON
     */
    public testApiWithHttpInfo(_options?: Configuration): Observable<HttpInfo<TestApi200Response>> {
        const requestContextPromise = this.requestFactory.testApi(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.testApiWithHttpInfo(rsp)));
            }));
    }

    /**
     * Returns a simple Ok message for API Connectivity test.
     * API Communication Test, should return a JSON
     */
    public testApi(_options?: Configuration): Observable<TestApi200Response> {
        return this.testApiWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<TestApi200Response>) => apiResponse.data));
    }

}

import { UserApiRequestFactory, UserApiResponseProcessor} from "../apis/UserApi";
export class ObservableUserApi {
    private requestFactory: UserApiRequestFactory;
    private responseProcessor: UserApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: UserApiRequestFactory,
        responseProcessor?: UserApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new UserApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new UserApiResponseProcessor();
    }

    /**
     * Configures a new Jira token for the logged-in user. v4
     * @param body 
     */
    public configTokenJiraWithHttpInfo(body: string, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.configTokenJira(body, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.configTokenJiraWithHttpInfo(rsp)));
            }));
    }

    /**
     * Configures a new Jira token for the logged-in user. v4
     * @param body 
     */
    public configTokenJira(body: string, _options?: Configuration): Observable<void> {
        return this.configTokenJiraWithHttpInfo(body, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * Remove o token Jira cadastrado para o usuário logado.
     */
    public removeTokenJiraWithHttpInfo(_options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.removeTokenJira(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.removeTokenJiraWithHttpInfo(rsp)));
            }));
    }

    /**
     * Remove o token Jira cadastrado para o usuário logado.
     */
    public removeTokenJira(_options?: Configuration): Observable<void> {
        return this.removeTokenJiraWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * Generates an authentication code for the specified user.
     * @param sendCodeParam 
     */
    public sendCodeWithHttpInfo(sendCodeParam: SendCodeParam, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.sendCode(sendCodeParam, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.sendCodeWithHttpInfo(rsp)));
            }));
    }

    /**
     * Generates an authentication code for the specified user.
     * @param sendCodeParam 
     */
    public sendCode(sendCodeParam: SendCodeParam, _options?: Configuration): Observable<void> {
        return this.sendCodeWithHttpInfo(sendCodeParam, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * If found, returns the username associated with the provided username.
     * @param userValidationParam 
     */
    public validateWithHttpInfo(userValidationParam: UserValidationParam, _options?: Configuration): Observable<HttpInfo<Validate200Response>> {
        const requestContextPromise = this.requestFactory.validate(userValidationParam, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.validateWithHttpInfo(rsp)));
            }));
    }

    /**
     * If found, returns the username associated with the provided username.
     * @param userValidationParam 
     */
    public validate(userValidationParam: UserValidationParam, _options?: Configuration): Observable<Validate200Response> {
        return this.validateWithHttpInfo(userValidationParam, _options).pipe(map((apiResponse: HttpInfo<Validate200Response>) => apiResponse.data));
    }

}
