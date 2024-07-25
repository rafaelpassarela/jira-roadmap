import {
    ApiException,
    AuthApi,
    ConfigApi,
    ErrorModel,
    IssueApi,
    ProjectApi,
    RoadmapApi,
    TestApi,
    UserApi,
} from 'roadmap-client-api';
import ApiBase from './ApiBase';
import Cookies from 'js-cookie';
import { toastAddMessage } from '../components/toastMessage/ToastControllerComponent';

// importar os grupos de API (definidos pelas TAGS no Swagger),
// definir propriedade e inicializar no constructor

class ApiHelper extends ApiBase {
    // grupos de API
    auth: AuthApi | null;

    config: ConfigApi | null;

    issue: IssueApi | null;

    project: ProjectApi | null;

    roadmap: RoadmapApi | null;

    test: TestApi | null;

    user: UserApi | null;

    constructor() {
        super();

        // proxyes
        this.auth = null;
        this.config = null;
        this.issue = null;
        this.project = null;
        this.roadmap = null;
        this.test = null;
        this.user = null;
    }

    private reditectToLogin(message: string) {
        console.info(message);
        Cookies.remove('Bearer');
        toastAddMessage({
            title: 'Você foi desconectado',
            message: 'Sua sessão expirou, por favor, faça login novamente. ' + message,
            variant: 'warning',
            timeInfo: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        window.location.href = '/login';
    }

    private getJsonObject(reason: ApiException<ErrorModel>) {
        try {
            return JSON.parse(reason.body as unknown as string);
        } catch (e) {
            return null;
        }
    }

    public getErrorMessage(reason: ApiException<ErrorModel>) {
        // let errMsg: string = (reason.code === undefined ? reason.message : reason.body.error);
        if (reason.code === undefined) return reason.message;

        if (reason.body.message !== undefined) return reason.body.message;

        if (reason.code === 401) {
            const json = this.getJsonObject(reason);
            const err = (json !== null && json.message !== undefined) ? json.message : '';
            this.reditectToLogin(reason.code + ' - ' + err);
            return '401 - Unauthorized';
        }

        if (reason.body.error !== undefined) return reason.body.error;

        const json = this.getJsonObject(reason);
        if (json !== null) {
            JSON.parse(reason.body as unknown as string);
            if (json.message !== undefined) return json.message;
            if (json.error !== undefined) return json.error;
        }

        // Lastly, return the body of the message
        return reason.body;
    }

    public Auth(): AuthApi {
        if (this.auth === null) {
            this.auth = new AuthApi(this.getDefaultConfiguration());
        }
        return this.auth;
    }

    public Config(): ConfigApi {
        if (this.config === null) {
            this.config = new ConfigApi(this.getDefaultConfiguration());
        }
        return this.config;
    }

    public Issue(): IssueApi {
        if (this.issue === null) {
            this.issue = new IssueApi(this.getDefaultConfiguration());
        }
        return this.issue;
    }

    public Project(): ProjectApi {
        if (this.project === null) {
            this.project = new ProjectApi(this.getDefaultConfiguration());
        }
        return this.project;
    }

    public Roadmap(): RoadmapApi {
        if (this.roadmap === null) {
            this.roadmap = new RoadmapApi(this.getDefaultConfiguration());
        }
        return this.roadmap;
    }

    public Test(): TestApi {
        if (this.test === null) {
            this.test = new TestApi(this.getDefaultConfiguration());
        }
        return this.test;
    }

    public User(): UserApi {
        if (this.user === null) {
            this.user = new UserApi(this.getDefaultConfiguration());
        }
        return this.user;
    }
}

const Api = new ApiHelper();

export default Api;
