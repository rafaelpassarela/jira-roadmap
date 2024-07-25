import {
    createConfiguration, Configuration, ServerConfiguration,
} from 'roadmap-client-api';
import RoadmapServerConfiguration from './RoadmapServerConfiguration';
import { RoadmapAuthMethodsConfiguration, RoadmapHttpBearerConfiguration, RoadmapTokenProvider } from './RoadmapAuthConfiguration';

class ApiBase {
    urlLocal = 'http://localhost:3030';
    urlProd  = 'http://mydomain.com:8081';

    // objetos de configuração
    apiconfig: Configuration | null = null;
    server: RoadmapServerConfiguration<{}> | null = null;
    authConf: RoadmapAuthMethodsConfiguration | null = null;

    isLocal: boolean;

    constructor() {
        this.isLocal = window.location.href.includes('localhost');
    }

    public getUrl(): string {
        return (this.isLocal ? this.urlLocal : this.urlProd);
    }

    getServer(): ServerConfiguration<{}> {
        if (this.server === null) {
            this.server = new RoadmapServerConfiguration<{}>(this.getUrl(), {});
        }
        return this.server;
    }

    getAuth(): RoadmapAuthMethodsConfiguration{
        if (this.authConf === null) {
            this.authConf = {
                bearerAuth: {
                    tokenProvider: new RoadmapTokenProvider()
                } as RoadmapHttpBearerConfiguration
            };
        }

        return this.authConf;
    }

    getDefaultConfiguration(): Configuration {
        if (this.apiconfig === null) {
            this.apiconfig = createConfiguration({
                baseServer: this.getServer(),
                authMethods: this.getAuth()
            });
        }
        return this.apiconfig;
    }
}

export default ApiBase;
